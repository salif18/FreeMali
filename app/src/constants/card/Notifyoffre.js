import React from 'react';
import { useContext } from 'react';
import { MyStore } from '../../context/myStore';
import axios from 'axios';
import { format } from 'timeago.js';
import {useNavigate} from 'react-router'

const Notifyoffre = ({notification}) => {
    const navigate = useNavigate()
    const {users,defaultImage,me_User} = useContext(MyStore)
    const auteurs = users.filter(c => c._Id === notification.senderId)
    const auteur = auteurs[0]

    // boutton pour supprimer la notification
    const handleDelNotify=(notification)=>{
        axios.delete(`http://localhost:3002/notifications/del/${notification._id}`)
        .then((res)=>res.data)
        .catch((err)=>console.log(err))
    }

    return (
        <div className='card-notification' onClick={()=>navigate(`/profile/${me_User?._id}`)}>
        <div className='notif-image'>
        <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
        <div className='notif-body'>
         <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
         <p className='desc'>{notification.description}</p>
         <p className='conte'>{notification.contenu}</p>
         <p className='not-date'>{format(notification.createdAt)}</p>
        </div>
        </div>
        <div className='container-del-notif'>
         <button className='btn-del-notif'
         onClick={()=>handleDelNotify(notification._id)}
         >
         x
         </button>
        </div>
    </div>
    );
}

export default Notifyoffre;
