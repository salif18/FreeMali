import React, { useEffect } from "react";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ScrollReveal from 'scrollreveal';
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  
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
//  animate scroll
// useEffect(()=>{
//   ScrollReveal().reveal('.startleft',{
//    duration:1000,
//    origin:'top',
//    delay:0,
//    easing:'ease-in-out',
//    reset:true
//   })
//   ScrollReveal().reveal()
//   return (()=>{ScrollReveal().destroy()})
// },[])

  return (
    <footer className="footer">
      <div className="container-footer">

      <div className="reso startleft">
      <p >Suivez-nous sur</p>
      <FacebookSharpIcon className="icon "/>
      <WhatsAppIcon className="icon"/>
      <InstagramIcon className="icon"/>
      <TwitterIcon className="icon" />
     </div>

      <div className="contacts startleft">  
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

        <div className="copy startleft">
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
