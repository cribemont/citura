import React, { Component } from 'react';
import LogoFooter from "../assets/images/logo-transdev.svg";
import '../assets/css/base_citura.css';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <img className="img" src={LogoFooter} alt="Filiale Transdev" width="204" height="39" />
                </div>
            </footer>
        );
    }
}

export default Footer;