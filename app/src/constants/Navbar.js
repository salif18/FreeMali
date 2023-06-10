import React, { useContext } from 'react';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyStore } from '../context/myStore';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ContactlessIcon from '@mui/icons-material/Contactless';
const Navbar = () => {
 const {myProfile,logout,isInLine, defaultImage ,newOffre} = useContext(MyStore)

    const navigate = useNavigate()



    return (
        <nav className='navbar'>

            <div className='navbar-left' >
             <h2 className='logo-title'>FreeMali</h2>
             <NavLink className={({isActive})=> isActive ? 'active':''} to='/'><HomeIcon style={{fontSize:29}}/>Accueil</NavLink> 
             <NavLink className={({isActive})=> isActive ? 'active':''} to='/blogs'><EngineeringIcon style={{fontSize:29}} />Prestataires</NavLink>
             <NavLink className={({isActive})=> isActive ? 'active':''} to='/offres'><BusinessCenterIcon style={{fontSize:29}} />Offres d'emploi</NavLink>
             <NavLink className={({isActive})=> isActive ? 'active':''} to='/contacts'><ContactlessIcon style={{fontSize:29}} />Contacts</NavLink>
            </div>
            
            <div className='navbar-rigth'>
              <button className='btn-search' onClick={()=>navigate('/search')}>
             <SearchSharpIcon style={{fontWeight:'bold',fontSize:30}} />
             </button>
            <p className='p-rech'>Rechercher</p>
            <div className='seconnecter-container'>
            {!isInLine && <NavLink to='/connecter' >Se connecter</NavLink>}
            </div>
            <div className='navbar-rigth-sociaux'>
            {isInLine && <NavLink className='lien-sociaux' to='/messagerie'><QuestionAnswerIcon/></NavLink>}
            {isInLine && <NavLink className='lien-sociaux' to='/notification'><NotificationsNoneIcon/></NavLink>}
            {isInLine && <div className='sedeconecter' onClick={logout} ><SettingsPowerIcon style={{color:"#1876f2"}}/></div>}
            {isInLine && <NavLink className='lien-sociaux' to='/parametre'>
               <img className='img-profi' src={myProfile ? myProfile.photo : defaultImage} alt='' />
            </NavLink>}
            </div>
            </div>

        </nav>
    );
}

export default Navbar;
// <NavLink ><FacebookSharpIcon style={{color:'rgba(0, 132, 255, 0.726)',fontSize:30,fontWeight:'bold'}} /></NavLink>
//  <NavLink><TwitterIcon style={{color:'rgba(0, 132, 255, 0.726)',fontSize:30,fontWeight:'bold'}} /></NavLink>
//  <NavLink><InstagramIcon style={{color:'#f3086280',fontSize:30,fontWeight:'bold'}} /></NavLink><span className='len-offre'>{offres.length}</span>
// <div className='badge'>{newOffre >0  && <span>{newOffre }</span>}</div>