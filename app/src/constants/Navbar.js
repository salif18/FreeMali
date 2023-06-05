import React, { useContext } from 'react';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyStore } from '../context/myStore';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';

const Navbar = () => {
 const {myProfile,logout,isInLine,conversations,offres} = useContext(MyStore)
    const navigate = useNavigate()


    return (
        <nav className='navbar'>

            <div className='navbar-left' >
           
             <NavLink className={({isActive})=> isActive ? 'active':'navbar-left'} to='/'>Accueil</NavLink> 
             <NavLink className={({isActive})=> isActive ? 'active':''} to='/blogs'>Blogs prestataires</NavLink>
             {isInLine && <NavLink className={({isActive})=> isActive ? 'active':''} to='/offres'>Offres d'emploi</NavLink>}
             <NavLink className={({isActive})=> isActive ? 'active':''} to='/contacts'>Contacts</NavLink>
            </div>

            <div className='navbar-rigth'>
              <button className='btn-search' onClick={()=>navigate('/search')}>
             <SearchSharpIcon style={{fontWeight:'bold',fontSize:30}} />
             </button>
            <p className='p-rech'>Rechercher</p>
            <div className='navbar-rigth-sociaux'>
            {isInLine && <NavLink className='lien-sociaux' to='/messagerie'><ChatBubbleOutlineIcon/></NavLink>}
            {isInLine && <NavLink className='lien-sociaux' to='/notification'><NotificationsNoneIcon/></NavLink>}
            {isInLine && <div className='sedeconecter' onClick={logout} ><SettingsPowerIcon style={{color:'rgb(13, 179,221)'}}/></div>}
            {isInLine && <NavLink className='lien-sociaux' to='/parametre'>
               <img className='img-profi' src={myProfile ? myProfile.photo :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&usqp=CAU'} alt='' />
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