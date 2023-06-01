import React from 'react'
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
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Messagerie from './pages/Messagerie';
import Chat from './pages/Chat';
import Contacter from './pages/Contacter';

function App() {
  
  return (
    <>
    <div className="App">
    <ToastContainer/>
     <Routes>
       <Route path='/chat' element={<Chat/>}/>
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
       <Route path='/chat/:id' element={<Chat/>}/>
     </Routes>
    </div>

    </>
  );
}

export default App;
