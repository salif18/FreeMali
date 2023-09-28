import React, { useContext, useState} from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { NavLink, useNavigate } from "react-router-dom";
import { MyStore } from "../context/myStore";
import NotificationsIcon from "@mui/icons-material/Notifications";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EngineeringIcon from "@mui/icons-material/Engineering";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import { useEffect } from "react";
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { myProfile, domaineURL,getMyProfileData, isInLine, defaultImage,userId, notifications,openModal, setTouched } =
    useContext(MyStore);

    const PROFILGET = `${domaineURL}/profiles/myProfile/${userId}`;
    // recuperation du profile de user
  useEffect(() => {
    const getProfile = async () => {
      axios
        .get(PROFILGET,Headers)
        .then((res) => {
          res && getMyProfileData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isInLine && getProfile();
  }, []);

    const [viewBurger,setViewBurger] = useState(false)
    //filtrer chaque foi les notification non lues
  const notification_No_read= notifications.filter(c => c.status.includes('non lue'))

 
  const handleTouched=()=>{
    setTouched(true);
    openModal()
  }

  //scroll le nav bar fixe
  // const [isNavbarVisible, setNavbarVisible] = useState(true);

  // const handleScroll = () => {
  //   if (window.scrollY > 0) {
  //     setNavbarVisible(false);
  //   } else {
  //     setNavbarVisible(true);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  

  return (
      
    
    <nav className='navbar'>
    <h2 className="logo-title" onClick={()=>navigate('/')}>
           <span>free</span>
           <span>Ma</span>
           <span>li</span>
        </h2>
      <div className={viewBurger ? "nav-liens-mobile":"nav-liens"}>
      <div className="navbar-left">
       
        {
         (isInLine && myProfile ) && 
          <div className="liens-nav">
            <NavLink className={({ isActive }) => (isActive ? "active" : "links")} to="/">
                 <HomeIcon className="icon" /> Accueil
            </NavLink>
          
            <NavLink className={({ isActive }) => (isActive ? "active" : "links")} to="/blogs">
                <EngineeringIcon className="icon"  /> Repertoire des prestataires
            </NavLink>
        
            <NavLink className={({ isActive }) => (isActive ? "active" : "links")} to="/postes">
                <PublicIcon className="icon"  /> Travaux réalisés
            </NavLink>
        
            <NavLink className={({ isActive }) => (isActive ? "active" : "links")} to="/offres">
                <BusinessCenterIcon className="icon"  />Offres d'emploi
            </NavLink>
        
          </div>
        }

      </div>

     

      <div className="navbar-rigth">
       

        
        {
          (isInLine && myProfile ) && 
          <button className="btn-search" onClick={() => navigate("/search")}>
             <SearchSharpIcon style={{ fontWeight: "bold", fontSize: 30 }} />
          </button>
       }
  
          {!isInLine && <NavLink className='login' to="/connecter">Se connecter</NavLink>}
  
        {
          (isInLine && myProfile ) &&     
          <NavLink className={({ isActive }) => (isActive ? "activeR" : "lien-sociaux")} to="/courrier">
            <div className="rond">
              <EmailIcon className="icon" />
            </div>  
          </NavLink>  
        }

          {
           (isInLine && myProfile ) && 
            <NavLink className={({ isActive }) => (isActive ? "activeR" : "lien-sociaux")} to="/messagerie">
             
                <QuestionAnswerIcon className="icon"  />
              
            </NavLink>
          }
          {
            (isInLine && myProfile ) && 
            <NavLink className={({ isActive }) => (isActive ? "activeR" : "lien-sociaux")} onClick={()=>handleTouched()} > 
              <NotificationsIcon className="icon-noti" />  
               {
                notification_No_read.length > 0  && 
                 <span className="badge">
                  {notification_No_read.length}
                </span>
               }
            </NavLink>
          }
          
          {
            isInLine && 
            <NavLink className='profile' to="/parametre">
              <img
                className="img-profi"
                src={myProfile ? myProfile.photo : defaultImage}
                alt=""
              />
            </NavLink>
          }
        
       </div>  
      </div>
      {!viewBurger ?
      <MenuIcon className="menu" onClick={()=>setViewBurger(!viewBurger)} />
      :
      <CloseIcon className="menu" onClick={()=>setViewBurger(!viewBurger)} />
      }
    </nav>
    
  );
};

export default Navbar;