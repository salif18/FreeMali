import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { MyStore } from '../context/myStore';
import Navbar from '../constants/Navbar';

const Contacter = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {userId ,me_User , myProfile} = useContext(MyStore)
    const [client,setClient] = useState([])
    

    useEffect(()=>{
        axios.get(`http://localhost:3002/profiles/prestataire/${id}`)
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
            nom:me_User.nom,
            image:client.photo,//photo du client selectioner
            discussions:[{userId:userId, image:myProfile.photo, nom:me_User.nom, contenu:message}]
         };
         axios.post('http://localhost:3002/conversations',conversations)
         .then((res)=>res.data)
         .catch((Err)=>console.log(Err));
        navigate(`/profile/${client._id}`)
         setMessage('')
         alert('Votre message a ete envoye')
    }

    return (
        <>
        <Navbar/>
        <div className='contacter-invite'>
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
