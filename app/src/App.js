import React, { useContext, useEffect } from 'react'
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
import Entrepreneurs from './pages/Entrepreneurs';
import Dj from './pages/Dj';
import Animateur from './pages/Animateur';
import Profile from './pages/Profile';
import Connection from './pages/Connection';
import Search from './pages/Search';
import Parametres from './pages/Parametres';
import SingleOffre from './pages/SingleOffre';
import Notifications from './pages/Notifications';
import {Flip, Zoom, toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Messagerie from './pages/Messagerie';
import Contacter from './pages/Contacter';
import { MyStore } from './context/myStore';
import axios from 'axios';
import io from "socket.io-client";
import MyModal from './constants/windows/MyModal';
import Reinitialisation from './pages/Reinitialisation';
import Developpeurs from './pages/Developpeurs';
import Maçon from './pages/Maçon';
import Informatiques from './pages/Informatiques';
import Agronomme from './pages/Agronomme';



// url de socket
const socket = io("http://localhost:3002");

function App() {
  // url pour poster et recuperer tous les offres
const url = 'http://localhost:3002/offres'

const {getOffres, userId, notifications, setNotifications, isModalOpen, closeModal} = useContext(MyStore)

//a chaque entrer notification vrifier s'il y'a les non lues 
const new_Notification_No_read = notifications.some(notification => notification.status === 'non lue')
const notification_type_offre = notifications.some(notification => notification.description === 'a poster une nouvelle offre')
// recuperation les offres du cotes server
useEffect(()=>{
    axios.get(url)
    .then(res => {
        res && getOffres(res.data)
    }).catch((err)=>console.log(err))
},[getOffres])


// recuperer ses notification 
useEffect(()=>{
  axios
   .get(`http://localhost:3002/notifications/receiver/${userId}`)
   .then((res)=> {
    const notification = res.data
    setNotifications(notification)
  })
   .catch((err)=>console.log(err))
},[userId,setNotifications])

//recuperer ses notification avec socket
useEffect(()=>{
  socket.on('receive_notifications',(data)=>{
    setNotifications([...notifications,data])
  })
  return ()=>{
    socket.off('receive_notification')
  }
},[setNotifications,notifications])

// bouton declancheur de la bulle de notification de message 
const handleNewMessage =()=>{
  const newMessage ='Vous avez recu un nouveau message';
  toast.info(newMessage,{position:toast.POSITION.BOTTOM_RIGHT,})
}

//pour les nouveaux commentaires boutton declancheur la bulle de notification
const handleNewComment =()=>{
  const newComment ='Vous avez un nouveau commentaire';
  toast.success(newComment,{position:toast.POSITION.BOTTOM_RIGHT,theme:'colored'})
}

const handleNewOffre =()=>{
  const newComment =`Il y'a une nouvelle offre, allez-y voir dans Offres d'emploi`;
  toast.success(newComment,{position:toast.POSITION.BOTTOM_RIGHT,theme:'dark'})
}


// declanche la bule de notification lors des nouveau notification non lue
useEffect(()=>{
  if(new_Notification_No_read && !notification_type_offre){
   handleNewComment()
  }
  if(new_Notification_No_read && notification_type_offre){
    handleNewOffre()
  }
},[new_Notification_No_read,notification_type_offre])


// handleNewMessage()

  return (
    <>
    <div className="App">
    <ToastContainer limit={1} transition={Zoom} hideProgressBar={true} autoClose={5000}/>
    <MyModal isOpen={isModalOpen} onClose={closeModal} />
   
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
       <Route path='/informatique' element={<Informatiques/>}/>
       <Route path='/electricite' element={<Electriciens/>}/>
       <Route path='/profile/:id' element={<Profile/>} />
       <Route path='/mecanique' element={<Mecaniciens/>}/>
       <Route path='/menuiserie' element={<Menuisier/>}/>
       <Route path='/plomberie' element={<Plombiers/>} />
       <Route path='/enseignants' element={<Enseignants/>} />
       <Route path='/proffeseurs' element={<Proff/>} />
       <Route path='/docteur' element={<Docteurs/>}/>
       <Route path='/connecter' element={<Connection/>}/>
       <Route path='/reinitialisation' element={<Reinitialisation/>} />
       <Route path='/entrepreneur' element={<Entrepreneurs/>} />
       <Route path='/animateur' element={<Animateur/>} />
       <Route path='/agronome' element={<Agronomme/>} />
       <Route path='/dj' element={<Dj/>}/>
       <Route path='/messagerie' element={<Messagerie/>}/>
       <Route path='/developpeur' element={<Developpeurs/>}/>
       <Route path='/maçon' element={<Maçon/>} />
       </Routes>
    </div>

    </>
  );
}

export default App;
