import React, { useContext, useEffect, useState } from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { MyStore } from '../context/myStore';
import Navbar from '../constants/Navbar';

const Contacter = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {isInLine,userId ,token, myProfile,domaineURL} = useContext(MyStore)
    const [client,setClient] = useState([])
    
    const Headers = {
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    useEffect(()=>{
        axios.get(`${domaineURL}/profiles/yourProfile/${id}`,Headers)
        .then((res)=>{
            res && setClient(res.data)
        }).catch((err)=>console.log(err))
    },[id])

    const [message,setMessage]=useState('')

    const sendConvers=(conversations)=>{
         conversations={
            userId:userId,
            senderId:client.userId,
            nom:myProfile.prenom,
            nomSender:client.prenom,
            image:myProfile.photo,//photo du client selectioner
            imageSender:client.photo,
            discussions:[{userId:userId, image:myProfile.photo, nom:myProfile.prenom, contenu:message}]
         };
         axios.post(`${domaineURL}/conversations`,conversations)
         .then((res)=>res.data)
         .catch((Err)=>console.log(Err));
        navigate(`/messagerie`)
         setMessage('')
         
    }

    return (
        <>
        <Navbar/>
        <div className='contacter-invite'>
        {!isInLine && <Navigate to='/connecter' replace={true} />}
            <div className='contacter-top'>
             <img className='mes-img' src={client.photo} alt='' />
             <h2>{client.nom} {client.prenom}</h2>
             <p>{client.proffession}</p>
            </div>
            <div className='contacter-bottom'>
              <input 
               className='contacter-input'
                type='text' 
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                placeholder='Ecris votre message...'/>
                <button 
                  className='contacter-invite-btn'
                  onClick={()=>sendConvers()}
                  >Envoyer</button>
            </div>

        </div>
        </>
    );
}

export default Contacter;
