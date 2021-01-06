import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogoTop from "../assets/images/logo.png";
import '../assets/css/base_citura.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));
  
export default function Header() {
    const classes = useStyles();
  
    return (
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={LogoTop} alt="Citura" width="145" height="75" />
          </div>
        </div>
      </header>
    );
  }
