import React from 'react'
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarLeft() {
  return (
    <aside className='asidebar'>
      
      <div className="container-footer">

      <div className="reso ">
      <p >Suivez-nous sur</p>
      <FacebookSharpIcon className="icon "/>
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
      
      </div>

        <div className="copy ">
        <NavLink className='contact' to="/confidentialite">
         Politique de confidentialite
        </NavLink>
           <p className='contact'>Copyright &copy; FreeMali 2023 <br/> Tous droits réservés</p>
        </div>
        
      </div>
     
    </aside>
  )
}
