import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { Navigate} from 'react-router-dom'
import { MyStore } from '../context/myStore';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { useParams } from 'react-router-dom';
import SharePosition from '../constants/maps/SharePosition';
import CardOffres from '../constants/cards/Offres';

const SingleClient = () => {
  
  const {isInLine, userId, token , } = useContext(MyStore)
  const {id} = useParams()
 const [user, setUser] = useState({});
 const [userLogin, setUserLogin] = useState({});
 const [offres, setOffres] = useState([]);
 const [messageValidation, setMessageValidation] = useState("");

 //configuration de lentete
const Headers = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 }

 useEffect(()=>{
      
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/auth/user/${id}`,Headers);
      if (res) {
        const data = await res.data;
        setUserLogin(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  getUser();
},[])


    useEffect(()=>{
     axios.get(`http://localhost:3002/profiles/prestaProfile/${id}`,Headers)
     .then(res => res.data)
     .then(data => setUser(data))
     .catch((err)=>console.log(err))
    },[])

    useEffect(()=>{
       axios.get(`http://localhost:3002/offres/user/${id}`,Headers)
       .then(res => res.data)
       .then(data => setOffres(data))
       .catch(err => console.log(err))
    },[]);

    const statuts = [
      { value: "", label: "Select-status" },
      { value: true, label: "True" },
      { value: false, label: "False" }
    ];
  
   
  const [newStatus ,setNewStatus] = useState('');
  
   //envoi de formulaire
   const handleSubmitPut = async (e) => {
    e.preventDefault();
  
    if (newStatus || newStatus.length > 0) {
      try {
        const res = await axios.put(`http://localhost:3002/auth/admin/isprestataire/status/${id}`, {newStatus});
        if (res) {
          await res.data;
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setMessageValidation("Aucun status choisie");
    }
  };

   
// model de notification
const notification = {
  senderId:userId,
  receiverId:id,
  description:'FreeMali a envoye un message',
  type:'message',
  offreId:id
}
    // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    axios
     .post(`http://localhost:3002/notifications`, notification )
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }
 
    
    const [messages ,setMessages ] = useState('')
    const [sujets , setSujets] = useState('');
    const [viewInput ,setviewInput] = useState(false);

    const handleSubmit = (contacts) => {
      contacts = {userId:user.userId ,names:'FreeMali', email:'freemali@gmail.com', sujet:sujets, messages:messages}
      axios
        .post(`http://localhost:3002/courriers`, {...contacts})
        .then((res) => res.data)
        .catch((err) => console.log(err));
        setMessages('');
        setSujets('');
        sendNotifications()
    
    };

    return (
        <div className='singleClient' >
        {!isInLine && <Navigate to='/login' replace={true} />}
        <h2>Informations du client</h2>
        <div className='identite-container'>
            <div className='indite'>
              <div className='imag-identite'>
                <img src={user.photo} alt='' />
              </div>
              <div className='info-identite'>
              <div>
            
                <div className='in'><h3>Prenom:</h3><span className='identite-span'>{user.prenom}</span></div>
                <div className='in'><h3>Nom:</h3><span className='identite-span'>{user.nom}</span></div>
                <div className='in'><h3>Numero:</h3><span className='identite-span'>{user.numero}</span></div>
                </div>
               
                <div>
                <div className='in'><h3>Email:</h3><span className='identite-span'>{user.email}</span></div>
                <div className='in'><h3>Address:</h3><span className='identite-span'>{user.address}</span></div>
                <div><SharePosition user={user}/></div>
              </div>
              </div>
              
              <div>
              <label htmlFor="category">Prestataire ?</label>
              <br />
              <select
                  value={newStatus}
                  onChange={(e)=>setNewStatus(e.target.value)}
                  className="inputForm">
                  {statuts.map((stats) => (
                  <option key={stats.value} value={stats.value}>
                     {stats.label}
                  </option>
                  ))}
              </select>
               <button className='btn-sa' onClick={handleSubmitPut}>Save</button>     
            </div>
              
            </div>
        </div>
         <button className='btn email'>
         <a href={`mailto:${user.email}`} >
         Envoyer email <MarkunreadIcon style={{marginLeft:10}}/>
         </a>
         </button>
         <button className='btn email' onClick={()=>setviewInput(!viewInput)}><span>Envoyer message</span></button>


         {viewInput && <div className='zone-de-reponse'>
         <input value={sujets} onChange={(e)=>setSujets(e.target.value)} placeholder='Sujet :'/>
         <textarea 
           className="textar"   
           name='messages' 
           cols='50' 
           rows='2.5' 
           value={messages} 
           placeholder='Message...'
           onChange={(e)=> setMessages(e.target.value)}></textarea>
         <button className='reponse-envoyer' onClick={handleSubmit} >
           Envoyer
          </button>
        </div>
       }

            <div className='achats'>
               <h2>Les demandes</h2>
               <div className='tableau'>
                  
                   {offres.map((item)=>( 
                    <CardOffres item={item} key={item._id} />
                   ))}
                   
                 
               </div>
            </div>
        </div>
    );
}

export default SingleClient;
