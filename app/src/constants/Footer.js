import React from "react";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContactlessIcon from '@mui/icons-material/Contactless';
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">

      <div className="contacts">  
      <NavLink className='contact' to="/contacts">
        <ContactlessIcon/> Nous contacter
      </NavLink>
      </div>

      <div className="reso">
      <FacebookSharpIcon className="icon"/>
      <WhatsAppIcon className="icon"/>
      <InstagramIcon className="icon"/>
      <TwitterIcon className="icon" />
     </div>

        {/*<div className="service">
         
          <p>A propos de nous</p>
          <p>Comment ca marche ?</p>
  </div> */}

        <div className="copy">
           Copyright &copy; FreeMali 2023 - Tous droits réservés
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
