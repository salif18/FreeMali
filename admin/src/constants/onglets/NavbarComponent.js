import React, { useContext,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MyStore } from '../../context/myStore';
import ContactlessIcon from '@mui/icons-material/Contactless';
import InboxIcon from '@mui/icons-material/Inbox';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
const NavbarComponent = () => {
    const {defaultImage, profil,token,setProfil,userId,setNotifications,notifications } = useContext(MyStore)

    const Headers = {
      headers: {
        "Content-type": "multipart/form-data",
        'Authorization': `Bearer ${token}`,
      },
    };
    
    const profiladmin = `http://localhost:3002/profils/admin/user/${userId}`
     //recuperation de profil
     useEffect(()=>{
      axios.get(profiladmin,Headers)
      .then((res)=> 
      setProfil(res.data))
      .catch((err)=>console.log(err))
   },[])  


      // recuperer ses notification 
      useEffect(()=>{
        axios
         .get(`http://localhost:3002/notifications/receiver/admin/${userId}`)
         .then((res)=> {
          setNotifications(res.data)
        })
         .catch((err)=>console.log(err))
      },[])

      

      
      const notifiNoRead = notifications.filter((x) => x.status === 'non lue')

    return (
        <div className='navbar'>
            <div className='navbar-Left'>
            <ContactlessIcon  style={{marginLeft:10, fontSize:40, color:'rgb(235, 201, 88)'}}/>
            <h1>FreeMali</h1>
            </div>
            <div className='navbar-Rigth'>
            <NavLink className='link' to='/courrier'><EmailIcon style={{marginRight:5}} /></NavLink>
            <NavLink className='link' to='/notifications'>
              <NotificationsIcon style={{marginRigth:'5px'}} />{(notifiNoRead && notifiNoRead.length > 0 ) && <span className='lengNotify'>{notifiNoRead.length}</span>} 
            </NavLink>
            <NavLink className='link' to='/profile'>
              <img className='profil-img' src={profil? profil.photo:defaultImage} alt='' />
            </NavLink>
            
            </div>
        </div>
    );
}

export default NavbarComponent;
