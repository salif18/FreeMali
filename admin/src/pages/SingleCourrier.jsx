import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import { format } from 'timeago.js';
import { MyStore } from '../context/myStore';
import ReponseCourierCard from '../constants/cards/ReponseCourierCard';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import ArchiveIcon from '@mui/icons-material/Archive';

const SingleCourrier = () => {
  const { users, userId, profil,token,setClients,setUsers } = useContext(MyStore)
    const { id } = useParams();
    const [item , setItem] = useState({});

    const Headers = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    //recuperer les products
    useEffect(()=>{
      axios.get('http://localhost:3002/auth/users&Profile',Headers)
      .then((res)=>{
        res && setUsers(res.data);
        setClients(res.data.filter((x)=>x.isPrestataire === false))
      }).catch(err => console.log(err))
    },[]);
    
    useEffect(()=>{
      axios.get(`http://localhost:3002/courriers/one/${id}`,Headers)
      .then(res => setItem(res.data))
      .catch(err => console.log(err))
    },[])

    
 
// model de notification
const notification = {
  senderId:userId,
  receiverId:item.userId,
  description:'FreeMali a repondu à votre message',
  type:'reponse',
  offreId:id
}

  // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    axios
     .post(`http://localhost:3002/notifications`, notification )
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }
 
    const [viewInput ,setviewInput] = useState(false);

    const [reponse, setReponse] = useState('');

    const handleRepondre =(reponses)=>{
        if(reponse.length > 0){
          reponses = { userId:userId, reponse:reponse}
          axios.put(`http://localhost:3002/courriers/reponse/${item._id}`,{reponses})
          .then((res)=> res.data)
          .catch((err) => console.log(err));
          setReponse("");
          setviewInput(!viewInput);
          sendNotifications()
        }else{
            console.log('message vide')
        }
    }

    const { reponses } = item; 

    const expediteur = users.filter((ite) => ite._id === item.userId);
    const auteur = expediteur[0]

    const [afficherConfirmation, setAfficherConfirmation] = useState(false);

    const afficherMessageConfirmation = () => {
      setAfficherConfirmation(true);
    };
  
    const annulerSuppression = () => {
      setAfficherConfirmation(false);
    };
  
    const confirmerArchive = () => {
      setAfficherConfirmation(false);
      axios.post('http://localhost:3002/archives/couriers',item )
      .then(res => res.data)
      .catch(err => console.log(err))
    };
    
    return (
        <div className='singlecourier' >

        <div className='single-courier-header'>
        <h2>A propos <span>{item.sujet}</span></h2>
        <button className="btn-archive-courier" onClick={afficherMessageConfirmation}> <ArchiveIcon/> Archiver</button>
        {afficherConfirmation && (
          <div className='pops'>
            <p>Voulez-vous vraiment archiver ?</p>
            <div className='btn-confirm'>
            <button className='oui' onClick={confirmerArchive}>Oui</button>
            <button className='non' onClick={annulerSuppression}>Non</button>
          </div>
          </div>
        )}
        <div className='name-date'> 
          <div><img src={item.userId === userId ? profil.photo : auteur?.profile.photo } alt='' /><p>{item.names}</p></div>
          <p>{format(item.createdAt)}</p>
        </div>
        </div>

        <div className='contenu-courier'>
          <p>{item.messages}</p> 
        </div>
       
       {reponses?.map((re)=>( 
        <ReponseCourierCard re={re} key={re._id} />
        ))}

        <div>
        {!viewInput && <button className='reponse-btn' onClick={()=>setviewInput(!viewInput)}><ShortcutIcon />Repondre</button>}
        </div>

        {viewInput && <div className='zone-de-reponse'>
         <textarea 
           className="textar"   
           name='reponse' 
           cols='50' 
           rows='2.5' 
           value={reponse} 
           placeholder='Message...'
           onChange={(e)=> setReponse(e.target.value)}></textarea>
         <button className='reponse-envoyer' onClick={handleRepondre} >
           Envoyer
          </button>
        </div>
       }
        </div>
    );
}

export default SingleCourrier;
