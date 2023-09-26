import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import { format } from 'timeago.js';
import { MyStore } from '../context/myStore';
import ReponseCourierCard from '../constants/card/ReponseCourierCard';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import Navbar from '../constants/Navbar';

const SingleCourrier = () => {
  const { myProfile, userId, admin ,token, setAdmin,domaineURL } = useContext(MyStore)
    const { id } = useParams();
    const [item , setItem] = useState({});
    
    const Headers = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    useEffect(()=>{
      axios.get(`${domaineURL}/courriers/one/${id}`,Headers)
      .then(res => setItem(res.data))
      .catch(err => console.log(err))
    },[])


    useEffect(()=>{
      axios.get(`${domaineURL}/profils/admin`,Headers)
      .then(res => setAdmin(res.data))
      .catch(err => console.log(err))
  },[])
  
    const [viewInput ,setviewInput] = useState(false);

    const [reponse, setReponse] = useState('');


    const { reponses } = item; 
    const adm = admin[0]
    // model de notification
  const notification ={
    adminId:adm?.userId,
    senderId:userId,
    description:'a repondue a votre message',
    type:"reponse",
    offreId:id
  }

    // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    axios
     .post(`${domaineURL}/notifications`, notification,Headers)
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }

    const handleRepondre =(reponses)=>{
        if(reponse.length > 0){
          reponses = { userId:userId, reponse:reponse}
          axios.put(`${domaineURL}/courriers/reponse/${item._id}`,{reponses},Headers)
          .then((res)=> res.data)
          .catch((err) => console.log(err));
          setReponse("");
          setviewInput(!viewInput);
          sendNotifications()
        }else{
            console.log('message vide')
        }
    }

   

    return (
      
      <>
      <Navbar/>
        <div className='singlecourier'>
        <div className='single-courier-header'>
        <h2>Sujet <span>{item.sujet}</span></h2>
        <div className='name-date'> 
          <div><img src={item.userId === userId ?  myProfile.photo : admin.photo} alt='' /><p>{item.names}</p></div>
          <p>{format(item.createdAt)}</p>
        </div>
        <div className='contenu-courier'>
        <p>{item.messages}</p> 
       </div>
        </div>

       
       
       {reponses?.map((re)=>( 
        <ReponseCourierCard re={re} key={item._id} />
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
      </>
    );
    
}

export default SingleCourrier;
