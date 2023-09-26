import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { MyStore } from '../../context/myStore';
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';

const Recomandation = () => {
  const { isInLine,admin,setAdmin,domaineURL, userId } = useContext(MyStore);
  const navigate = useNavigate()
    const [ contenue, setContenue] = useState('');

    useEffect(()=>{
      axios.get(`${domaineURL}/profils/admin`)
      .then(res => setAdmin(res.data))
      .catch(err => console.log(err))
  },[])

  const adm = admin[0]
  // model de notification
  const notification ={
    adminId:adm?.userId,
    senderId:userId,
    description:'a envoye une suggestion',
    type:'recommandation'
  }

  
    // boutton pour envoyer la notification au prestataire
    const sendNotifications =()=>{
      axios
       .post(`${domaineURL}/notifications`, notification,Headers)
       .then((res) => res.data)
       .catch((err) => console.log(err));
   }

    const handleSubmit =(recomandation)=>{
      if(isInLine){
      if(contenue.length > 0){
        recomandation = { userId , contenue }
        axios.post(`${domaineURL}/recomandations`, recomandation)
        .then((res) => res.data)
        .catch((err) => console.log(err));
        setContenue('');
        sendNotifications()
      }else{
        console.log('champs vide')
      }
    }else{
      navigate('/connecter')
    }

    }

    return (
        <div className='recomandation'>
        <h2>VOTRE-AVIS</h2>
        <p>Inscrivez-vous pour pouvoir donner votre suggestion</p>
        <div className='recom-container'>
        <input  className="form-recom"
          type='text'
          value={contenue}
          placeholder="Ecris votre message..."
          onChange={(e) => setContenue(e.target.value)}
          />
        <button className='btn-recom' onClick={()=>handleSubmit()} >Envoyer  <SendIcon /></button>
      </div>
      <div className='facebookLink'>
      <FacebookSharpIcon className='icons'/> 
      <LinkedInIcon className='icons' /> 
      <WhatsAppIcon className='icons' />
      <TwitterIcon className='icons' />
      <InstagramIcon className='icons' />
      </div>

        </div>
    );
}

export default Recomandation;
