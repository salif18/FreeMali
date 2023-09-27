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
import Messagerie from './pages/Messagerie';
import Contacter from './pages/Contacter';
import { MyStore } from './context/myStore';
import axios from 'axios';
import MyModal from './constants/windows/MyModal';
import Reinitialisation from './pages/Reinitialisation';
import Developpeurs from './pages/Developpeurs';
import Maçon from './pages/Maçon';
import Informatiques from './pages/Informatiques';
import Agronomme from './pages/Agronomme';
import Contacts from './pages/Contacts';
import Courriers from './pages/Courriers';
import SingleCourrier from './pages/SingleCourrier';
import Comfirmation from './pages/Comfirmation';
import Postes from './pages/Postes';
import SingleVideo from './pages/SingleVideo';
import SingleImage from './pages/SingleImage';
import About from './pages/About';
import Confidentialite from './pages/Confidentialite';







function App() {
  // url pour poster et recuperer tous les offres
const url = 'http://localhost:3002/offres'

const {getOffres, userId, setNotifications, isModalOpen, closeModal} = useContext(MyStore)



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


  return (
    <>
    <div className="App">
   
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
       <Route path='/reinitialisation/:token' element={<Comfirmation/>}/>
       <Route path='/entrepreneur' element={<Entrepreneurs/>} />
       <Route path='/animateur' element={<Animateur/>} />
       <Route path='/agronome' element={<Agronomme/>} />
       <Route path='/dj' element={<Dj/>}/>
       <Route path='/messagerie' element={<Messagerie/>}/>
       <Route path='/courrier' element={<Courriers/>}/>
       <Route path='/courrier/:id' element={<SingleCourrier/>}/>
       <Route path='/developpeur' element={<Developpeurs/>}/>
       <Route path='/maçon' element={<Maçon/>} />
       <Route path='/contacts' element={<Contacts/>} />
       <Route path='/abouts' element={<About/>} />
       <Route path='/confidentialite' element={<Confidentialite/>} />
       <Route path='/postes' element={<Postes/>} />
       <Route path='/postes/:id/video' element={<SingleVideo/>}/>
       <Route path='/postes/:id/image' element={<SingleImage/>}/>
       </Routes>
    </div>

    </>
  );
}

export default App;
