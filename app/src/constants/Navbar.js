import React, { useContext} from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { NavLink, useNavigate } from "react-router-dom";
import { MyStore } from "../context/myStore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsPowerIcon from "@mui/icons-material/SettingsPower";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ContactlessIcon from "@mui/icons-material/Contactless";

const Navbar = () => {
  const navigate = useNavigate();
  const { myProfile, logout, isInLine, defaultImage,invite,chaters, message, notifications,openModal, setTouched } =
    useContext(MyStore);
    //filtrer chaque foi les notification non lues
  const notification_No_read= notifications.filter(c => c.status.includes('non lue'))

  //bouton contenant les actions change le statuts de toucher pour 
  // que les bulle de notification ne saffiche plus une foi appuyer sur icon notification
  // fermer la fenetre modal
  const handleTouched=()=>{
    setTouched(true);
    openModal()
  }

  //filtrer les message par non lue
  const message_No_read = message.filter( c => c.status.includes('non lue'))

  const handleTouchedIconMessage =()=>{
    setTouched(true);
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo-title">
        <span>Fr</span>
        <span>ee</span>
        <span>Mali</span></h2>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/">
          <HomeIcon style={{ fontSize: 29 }} />
          Accueil
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/blogs">
          <EngineeringIcon style={{ fontSize: 29 }} />
          Prestataires
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/offres">
          <BusinessCenterIcon style={{ fontSize: 29 }} />
          Offres d'emploi
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/contacts">
          <ContactlessIcon style={{ fontSize: 29 }} />
          Contacts
        </NavLink>
      </div>

      <div className="navbar-rigth">
        <button className="btn-search" onClick={() => navigate("/search")}>
          <SearchSharpIcon style={{ fontWeight: "bold", fontSize: 30 }} />
        </button>
        {/* <p className="p-rech">Rechercher</p>*/}
        <div className="seconnecter-container">
          {!isInLine && <NavLink to="/connecter">Se connecter</NavLink>}
        </div>
        <div className="navbar-rigth-sociaux">
          {isInLine && (
            <NavLink className="lien-sociaux" to="/messagerie">
              <div className="rond">
              <QuestionAnswerIcon />
              {/*
               message_No_read.length > 0  && 
              <div className="badge"><span>{message_No_read.length}</span></div>
          */ }
              </div>
               
            </NavLink>
          )}
          {isInLine && (
            <NavLink className="lien-sociaux" onClick={()=>handleTouched()} > 
              <div className="rond">
              <NotificationsIcon  /> 
              {
                notification_No_read.length > 0  && 
                <div className="badge"><span>{notification_No_read.length}</span></div>
              }
              </div>
           
            </NavLink>
          )}
          {isInLine && (
            <div className="sedeconecter" style={{marginRight:20}} onClick={logout}>
              <SettingsPowerIcon />
            </div>
          )}
          {isInLine && (
            <NavLink className="lien-sociaux" to="/parametre">
              <img
                className="img-profi"
                src={myProfile ? myProfile.photo : defaultImage}
                alt=""
              />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// <NavLink ><FacebookSharpIcon style={{color:'rgba(0, 132, 255, 0.726)',fontSize:30,fontWeight:'bold'}} /></NavLink>
//  <NavLink><TwitterIcon style={{color:'rgba(0, 132, 255, 0.726)',fontSize:30,fontWeight:'bold'}} /></NavLink>
//  <NavLink><InstagramIcon style={{color:'#f3086280',fontSize:30,fontWeight:'bold'}} /></NavLink><span className='len-offre'>{offres.length}</span>
// <div className='badge'>{newOffre >0  && <span>{newOffre }</span>}</div>
//