import React, { useContext, useEffect, useState } from 'react'
import { Routes,Route} from 'react-router';
import Home from './pages/Home';
import InscriptionPrestataire from './pages/InscriptionPrestataire';
import InsriptionClients from './pages/InsriptionClients';
import Offres from './pages/Offres';
import Blogs from './pages/Blogs';
import Electriciens from './pages/Electriciens';
import Mecaniciens from './pages/Mecaniciens';
import Menuisier from './pages/Menuisier';
import Plombiers from './pages/Plombiers';
import Enseignants from './pages/Enseignants';
import Proff from './pages/Proff';
import Docteurs from './pages/Docteurs';
import Medecins from './pages/Medecins';
import SageFemme from './pages/SageFemme';
import Entrepreneurs from './pages/Entrepreneurs';
import Avocats from './pages/Avocats';
import Dj from './pages/Dj';
import Animateur from './pages/Animateur';
import Profile from './pages/Profile';
import Connection from './pages/Connection';
import Search from './pages/Search';
import Parametres from './pages/Parametres';
import SingleOffre from './pages/SingleOffre';
import Notifications from './pages/Notifications';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Messagerie from './pages/Messagerie';
import Contacter from './pages/Contacter';
import { MyStore } from './context/myStore';
import axios from 'axios';
import io from "socket.io-client";
import MyModal from './constants/windows/MyModal';



// url de socket
const socket = io("http://localhost:3002");

function App() {
  // url pour poster et recuperer tous les offres
const url = 'http://localhost:3002/offres'

const {getOffres, userId, notifications, setNotifications, newNotification, setNewNotification, isModalOpen, closeModal} = useContext(MyStore)

// recuperation des offres du cotes server
useEffect(()=>{
    axios.get(url)
    .then(res => {
        res && getOffres(res.data)
    }).catch((err)=>console.log(err))
},[])


// recuperer la notification de user
useEffect(()=>{
  axios
   .get(`http://localhost:3002/notifications/receiver/${userId}`)
   .then((res)=> {
    const notification = res.data
    setNotifications(notification)
    setNewNotification(res.data)
  })
   .catch((err)=>console.log(err))
},[userId,setNewNotification,setNotifications])


// recuperer la notification de offre uniquement pour les prestattaires
//   const status ='prestataire'
// useEffect(()=>{
//   axios
//    .get(`http://localhost:3002/notifications/status`,status)
//    .then((res)=> {
//     const notification = res.data
//     setNotifications(notification)
//     setNewNotification(res.data)
//   })
//    .catch((err)=>console.log(err))
// },[setNotifications,setNewNotification])


useEffect(()=>{
  socket.on('receive_notifications',(data)=>{
    setNotifications(data)
  })
  return ()=>{
    socket.off('receive_notification')
  }
},[setNotifications])

// fonction alerte la bulle pour la notification de message et notification
const handleNewMessage =()=>{
  const newMessage ='Vous avez recu un nouveau message';
  toast.info(newMessage,{position:toast.POSITION.BOTTOM_RIGHT})
  
}
//pour les nouveaux commentaires
const handleNewComment =()=>{
  const newComment ='Vous avez un nouveau commentaire';
  toast.info(newComment,{position:toast.POSITION.BOTTOM_RIGHT})
}

const alerte =()=>{
  if(notifications.length > 0 && notifications[notifications.length -1] !== newNotification){
    handleNewComment()
  }
}
const [isNewItemAdd,setIsNewItemAdd] = useState(false)


useEffect(()=>{
  alerte()
  // if(notifications.length > 1){
  //   const lastNotifications = notifications[notifications.length - 1];
  //   const newNotif = notifications.slice(0,notifications.length - 1);

  //   if(newNotif.includes(lastNotifications)){
  //     setIsNewItemAdd(false)
  //   }else{
  //     setIsNewItemAdd(true)
  //   }
  // }
},[])


// handleNewMessage()

  return (
    <>
    <div className="App">
    <ToastContainer/>
    <MyModal isOpen={isModalOpen} onClose={closeModal} />
    {isNewItemAdd ? handleNewComment() : ''}

     <Routes> 
       <Route path='/' element={<Home/>}/>
       <Route path='/search' element={<Search/>} />
       <Route path='/blogs' element={<Blogs/>}/>
       <Route path='/notifications' element={<Notifications/>}/>
       <Route path='/contacter/:id' element={<Contacter/>}/>
       <Route path='/parametre' element={<Parametres/>}/>
       <Route path='/sign-presta' element={<InscriptionPrestataire/>} />
       <Route path='/sign-clients' element={<InsriptionClients/>} />
       <Route path='/offres' element={<Offres/>}/>
       <Route path='/offre/:id' element={<SingleOffre/>} />
       <Route path='/electricite' element={<Electriciens/>}/>
       <Route path='/profile/:id' element={<Profile/>} />
       <Route path='/mecanique' element={<Mecaniciens/>}/>
       <Route path='/menuiserie' element={<Menuisier/>}/>
       <Route path='/plomberie' element={<Plombiers/>} />
       <Route path='/enseignants' element={<Enseignants/>} />
       <Route path='/proffeseurs' element={<Proff/>} />
       <Route path='/docteur' element={<Docteurs/>}/>
       <Route path='/connecter' element={<Connection/>}/>
       <Route path='/medecin' element={<Medecins/>}/>
       <Route path='/sagefemme' element={<SageFemme/>}/>
       <Route path='/entrepreneur' element={<Entrepreneurs/>} />
       <Route path='/juriste' element={<Avocats/>} />
       <Route path='/animateur' element={<Animateur/>} />
       <Route path='/dj' element={<Dj/>}/>
       <Route path='/messagerie' element={<Messagerie/>}/>
     </Routes>
    </div>

    </>
  );
}

export default App;
