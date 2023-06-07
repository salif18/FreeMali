import React, { useContext, useEffect, useState } from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { MyStore } from '../context/myStore';
import Navbar from '../constants/Navbar';

const Contacter = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {isInLine,userId ,me_User , myProfile} = useContext(MyStore)
    const [client,setClient] = useState([])
    

    useEffect(()=>{
        axios.get(`http://localhost:3002/profiles/yourProfile/${id}`)
        .then((res)=>{
            res && setClient(res.data)
        }).catch((err)=>console.log(err))
    },[id])
console.log(client)
    const [message,setMessage]=useState('')

    const sendConvers=(conversations)=>{
         conversations={
            userId:userId,
            senderId:client.userId,
            nom:myProfile.nom,
            image:myProfile.photo,//photo du client selectioner
            discussions:[{userId:userId, image:myProfile.photo, nom:myProfile.nom, contenu:message}]
         };
         axios.post('http://localhost:3002/conversations',conversations)
         .then((res)=>res.data)
         .catch((Err)=>console.log(Err));
        navigate(`/messagerie`)
         setMessage('')
         alert('Votre message a ete envoye')
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
