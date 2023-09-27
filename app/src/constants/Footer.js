import React from "react";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import ContactlessIcon from '@mui/icons-material/Contactless';
// import InfoIcon from '@mui/icons-material/Info';
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  //fonction pour scroller la page vers la partie cliquer dans le lien 
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {

        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

const handleNavigate =()=>{

  scrollToSection('marche')
  
  
}
  return (
    <footer className="footer">
      <div className="container-footer">

      <div className="reso">
      <p >Suivez-nous sur</p>
      <FacebookSharpIcon className="icon"/>
      <WhatsAppIcon className="icon"/>
      <InstagramIcon className="icon"/>
      <TwitterIcon className="icon" />
     </div>

      <div className="contacts">  
      <NavLink className='contact' to="/contacts">
         Nous contacter
      </NavLink>
      <NavLink className='contact' to="/abouts">
        A propos de FreeMali
      </NavLink>
      <NavLink className='contact' onClick={handleNavigate}>
        <a href="#marche">Comment ca marche ?</a>
      </NavLink>
      </div>

        <div className="copy">
        <NavLink className='contact' to="/confidentialite">
         Politique de confidentialite
        </NavLink>
           <p className='contact'>Copyright &copy; FreeMali 2023 - Tous droits réservés</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
