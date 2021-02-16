import React, {useEffect, useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { DropzoneDialog } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  formControl: {
    margin: theme.spacing(1),
    width:'100%',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const regexpIBAN = "^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$";
const regexpBIC = "^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$";

const Formulaire = (props) => {
    
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [listePJ, setListePJ] = useState([]);
    const listeAbonnements = props.listeAbonnements;
    const classes = useStyles();
    const [numPJ, setNumPJ] = useState(0);

    
  
  useEffect(() => {
      setHidden(false);
      setListePJ(props.listePJAjoutee);
      setNumPJ(props.numPJ);
      if( props.numPJ <= 3 )
      {
        setOpen(false);
      }
      if( props.numPJ === 3 )
      {        
        setHidden(true);
      }
  }, [props.numPJ, props.listePJAjoutee]);
    
    return (
        <form noValidate autoComplete="off" id="form-recomendation" onSubmit={props.handleSubmit}>
        <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>Nom du porteur</InputLabel>
              <Input
                name="nom_porteur"
                id="nom_porteur"
                value={props.values.nom_porteur}
                onChange={props.handleChange}
                onBlur={props.handleBlur}                    
              />
              {
                  props.touched.nom_porteur && props.errors.nom_porteur && 
                  <Alert severity="error">{props.errors.nom_porteur}</Alert>
              }
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>Prénom du porteur</InputLabel>
              <Input
                name="prenom_porteur"
                id="prenom_porteur"
                value={props.values.prenom_porteur}
                onChange={props.handleChange}
                onBlur={props.handleBlur}                    
              />
              {
                  props.touched.prenom_porteur && props.errors.prenom_porteur && 
                  <Alert severity="error">{props.errors.prenom_porteur}</Alert>
              }
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
                 <TextField
                        id="date_naissance"
                        label="Date de naissance"
                        type="date"
                        placeholder="AAAA-MM-JJ"
                        value={props.values.title}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}     
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
              {
                  props.touched.date_naissance && props.errors.date_naissance && 
                  <Alert severity="error">{props.errors.date_naissance}</Alert>
              }
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>Nom du payeur</InputLabel>
              <Input
                name="nom_payeur"
                id="nom_payeur"
                value={props.values.nom_payeur}
                onChange={props.handleChange}
                onBlur={props.handleBlur}                    
              />
              {
                  props.touched.nom_payeur && props.errors.nom_payeur && 
                  <Alert severity="error">{props.errors.nom_payeur}</Alert>
              }
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>Prénom du payeur</InputLabel>
              <Input
                name="prenom_payeur"
                id="prenom_payeur"
                value={props.values.prenom_payeur}
                onChange={props.handleChange}
                onBlur={props.handleBlur}                    
              />
              {
                  props.touched.prenom_payeur && props.errors.prenom_payeur && 
                  <Alert severity="error">{props.errors.prenom_payeur}</Alert>
              }
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Abonnement</InputLabel>
              <Select
                native
                name="abonnement"
                id="abonnement"
                value={props.values.abonnement}                
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              >
                <option aria-label="None" value="" />
                {
                    listeAbonnements && listeAbonnements.map(item => {
                      return <option value={item.id} key={`abonnement_${item.id}`}>{item.libelle} - {item.montant}</option>
                    })
                }
              </Select>
              {
                  props.touched.abonnement && props.errors.abonnement && 
                  <Alert severity="error">{props.errors.abonnement}</Alert>
              }
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>BIC</InputLabel>
              <Input
                name="bic"
                id="bic"
                value={props.values.bic}
                onChange={props.handleChange}
                onBlur={props.handleBlur}                    
              />
              {
                  props.touched.bic && props.errors.bic && 
                  <Alert severity="error">{props.errors.bic}</Alert>
              }
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>IBAN</InputLabel>
              <Input
                name="iban"
                id="iban"
                value={props.values.iban}
                onChange={props.handleChange}
                onBlur={props.handleBlur}                    
              />
              {
                  props.touched.iban && props.errors.iban && 
                  <Alert severity="error">{props.errors.iban}</Alert>
              }
            </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>Email</InputLabel>
              <Input
                name="email"
                id="email"
                value={props.values.email}
                onChange={props.handleChange}
                onBlur={props.handleBlur}                    
              />
              {
                  props.touched.email && props.errors.email && 
                  <Alert severity="error">{props.errors.email}</Alert>
              }
            </FormControl>
        </Grid>
              {
                !hidden
                ?
                <>
                <Grid item xs={12} sm={12}>
                  <FormControl className={classes.formControl}>
                    <Alert severity="warning">Maximum de 3 pièces jointes. (Images, PDF ou Word, poids max. 5mo par fichier)</Alert>
                  </FormControl>
                </Grid>
        
                <Grid item xs={12} sm={12}>
                    <FormControl className={classes.formControl}>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Pièce(s) jointe(s)
                    </Button>
                    <DropzoneDialog
                        acceptedFiles={['image/*', '.pdf', '.doc', '.docx', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                        filesLimit={3}
                        cancelButtonText={"annuler"}
                        dropzoneText={"Glisser / Déposer un fichier"}
                        submitButtonText={"envoyer"}
                        maxFileSize={5000000}
                        open={open}
                        onClose={() => setOpen(false)}
                        onSave={props.handleUploadFile.bind(this)}
                        showPreviews={true}
                        showFileNamesInPreview={true}
                        previewText={"Aperçu"}
                        dialogTitle={"Ajout de fichier"}
                    />
              </FormControl>
            
                  <Grid item xs={12} sm={12}>
                  <FormControl className={classes.formControl}>
                      {
                        listePJ && listePJ.map(pj => {
                          return (<Alert severity="success" key={pj[0].name}>{pj[0].name}</Alert>)
                        })                
                      }
                    </FormControl>
                  </Grid>
                  
          </Grid>
                  </>
                  :
                  <Grid item xs={12} sm={12}>
                  <FormControl className={classes.formControl}>
                    <Alert severity="error">Maximum de 3 pièces jointes atteint.</Alert>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                      {
                        listePJ && listePJ.map(pj => {
                          return( <Alert severity="success" key={pj[0].name}>{pj[0].name}</Alert> )
                        })              
                      }
                    </FormControl>
                </Grid>
              }
               

                <Grid item xs={12} sm={12}>
                <FormControl className={classes.formControl}>
                    <Button type="submit" variant="contained" color="secondary">
                            Envoyer
                    </Button>
                </FormControl>
                </Grid>
        </form>
    );
}

export default withFormik({
  mapPropsToValues: () => ({
      nom_porteur:"",
      prenom_porteur: "",
      date_naissance:"",
      nom_payeur:"",
      prenom_payeur:"",
      abonnement:"",
      bic:"",
      iban:"",
      email:"",
  }),
  validationSchema: Yup.object().shape({
    nom_porteur: Yup.string().required('Champ obligatoire'),
    prenom_porteur: Yup.string().required('Champ obligatoire'),
    date_naissance: Yup.date('Veuillez indiquer une date au format AAAA-MM-JJ').required('Champ obligatoire - Format AAAA-MM-JJ').typeError('Veuillez indiquer une date au format AAAA-MM-JJ ( 1990-01-31 )'),
    nom_payeur: Yup.string().required('Champ obligatoire'),
    prenom_payeur: Yup.string().required('Champ obligatoire'),
    abonnement: Yup.string().required('Champ obligatoire'),
    bic: Yup.string().matches(regexpBIC, 'Format BIC non valide').required('Champ obligatoire'),
    iban: Yup.string().matches(regexpIBAN, 'Format IBAN non valide').required('Champ obligatoire'),
    email: Yup.string().email('Email non valide').required('Champ obligatoire')
  }),
  handleSubmit: (values, {props}) => {
    props.validation(values.nom_porteur, values.prenom_porteur, values.date_naissance, values.nom_payeur, values.prenom_payeur, values.abonnement, values.bic, values.iban, values.email);
  }
})(Formulaire);