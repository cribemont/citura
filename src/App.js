import React, {useState, useEffect, Fragment} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Formulaire from './components/Formulaire';
import Alert from '@material-ui/lab/Alert';

import apiClient from './services/api';

import RemboursementDataService from "./services/remboursement";
import Footer from './containers/Footer';
import { Backdrop, Box, CircularProgress, Paper } from '@material-ui/core';

const { default: Header } = require("./containers/Header");

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

let titre_meta, titre_formulaire, texte_introduction, texte_rgpd = {};

function App() {

  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [listeAbonnements, setListeAbonnements] = useState(null);
  const [numPJ, setNumPJ] = useState(0);
  const [pj1, setPJ1] = useState('');
  const [pj2, setPJ2] = useState('');
  const [pj3, setPJ3] = useState('');
  const [listePJ, setListePJ] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [parametre, setParametre] = useState([]);


  const getListeAbonnements = () => {
    let url = '/remboursement_abonnement';
    apiClient.get(url).then(response => {
      setListeAbonnements(response.data);
    }).catch(error => {
        console.log(error);
    })
  }

  const getParametre = () => {
    let url = '/remboursement_parametre';
    apiClient.get(url).then(response => {
      setParametre(response.data);
      //console.log(response.data);
    }).catch(error => {
        console.log(error);
    })
  }

  const handleAjoutReclamation = (nom_porteur, prenom_porteur, date_naissance, nom_payeur, prenom_payeur, abonnement, bic, iban, email) => {
    setIsSubmit(true);
    const newReclamation = { 
      nom_porteur:nom_porteur, 
      prenom_porteur:prenom_porteur, 
      date_naissance:date_naissance,
      nom_payeur:nom_payeur,
      prenom_payeur: prenom_payeur,
      abonnement: abonnement,
      bic: bic,
      iban: iban,
      email: email,
      piece_jointe_1:pj1,
      piece_jointe_2:pj2,
      piece_jointe_3:pj3
    }
    RemboursementDataService.create(newReclamation).then( () => {
      setIsSubmit(false);
      setIsSuccess(true);
    });
  }

  const handleUploadFile = (file) => {
      const fileLength = file.length;
    if (file.length > 0 && file.length <= 3) {
      const formData = new FormData();
      for(let f=0; f < file.length; f++ )
      {
        formData.append('file', file[f]);
      }
      apiClient.post('/upload', formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
        }
      }).then(res => {
        let returnPJ = res.data;
        let numTmpPJ = numPJ + fileLength;
        for( let p = 0; p < returnPJ.length; p++ ){
          // returnPJ[p].name
          if( numPJ === 0 ){
            if( p === 0 ) setPJ1(returnPJ[p].name);
            if( p === 1 ) setPJ2(returnPJ[p].name);
            if( p === 2 ) setPJ3(returnPJ[p].name);
          }
          if( numPJ === 1 ){
            if( p === 0 ) setPJ2(returnPJ[p].name);
            if( p === 1 ) setPJ3(returnPJ[p].name);
          }
          if( numPJ === 2 ){
            if( p === 0 ) setPJ3(returnPJ[p].name);
          }
          
        }
        setNumPJ(numTmpPJ);
        setListePJ([...listePJ, res.data]);
      }).catch(err => console.log(err))
    }
    else {
      alert('error 3 files');
    }
  };

  useEffect(() => {
    getListeAbonnements();
    getParametre();
  }, []);
  

  useEffect( () => {
    if( parametre.length > 0 && listeAbonnements )
    {
      titre_meta = parametre.find(el => el.nom === 'titre_meta');
      titre_formulaire = parametre.find(element => element.nom === 'titre_formulaire');
      texte_introduction = parametre.find(element => element.nom === 'texte_introduction');
      texte_rgpd = parametre.find(element => element.nom === 'texte_rgpd');
      setLoaded(true);
    }
  }, [parametre, listeAbonnements])
  
  return (
    <div>
      <Header />
      {
          loaded ?
          <>
      <div className="header black">
        <div className="container align-item-center justify-content-center">
            <Typography variant="h5" component="h5">{titre_meta.valeur}</Typography>
        </div>
      </div>
      <Container maxWidth="md" >
        <Paper elevation={3}>
          <Box p={2} m={2}>
          <Typography variant="h5" component="h5">{titre_formulaire.valeur}</Typography>
          <div dangerouslySetInnerHTML={{ __html: texte_introduction.valeur }} />
          </Box>
          </Paper>
      </Container>
      {
        isSuccess ?
        <Container maxWidth="md">
            <Paper elevation={3}>
              <Box p={2} m={2}>
                <Alert severity="success">Demande effectuée avec succès.</Alert>
              </Box>
            </Paper>
        </Container>
        :
        <Container maxWidth="md">
            <Paper elevation={3}>
              <Box p={2} m={2}>
              {
                !isSubmit ?
                <Formulaire listeAbonnements={listeAbonnements} validation={handleAjoutReclamation} handleUploadFile={handleUploadFile} numPJ={numPJ} listePJAjoutee={listePJ} />
                :
                <>
                Envoi en cours...
                </>
              }
              </Box>
            </Paper>
      </Container>
      }
      
      
      <Container maxWidth="md" >
        <Paper elevation={3}>
          <Box p={2} m={2}>
          <Typography variant="h5" component="h5">RGPD</Typography>
          <div dangerouslySetInnerHTML={{ __html: texte_rgpd.valeur }} />
          </Box>
          </Paper>
      </Container>
      </>
            :
            <Backdrop className={classes.backdrop} open="true">
                  <CircularProgress color="primary"/>
            </Backdrop>
          }
      <Footer />
    </div>
  );
}

export default App;
