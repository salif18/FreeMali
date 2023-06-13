import React from 'react';
import { useContext } from 'react';
import { MyStore } from '../../context/myStore';
import axios from 'axios';
import { format } from 'timeago.js';
import {useNavigate} from 'react-router'
const Notify = ({notification}) => {
    const navigate = useNavigate()
    const {users,defaultImage,me_User,closeModal} = useContext(MyStore)
    const auteurs = users.filter((c) => c._id === notification.senderId)
    const auteur = auteurs[0]
    console.log(auteur)
    console.log(notification)
    // boutton pour supprimer la notification
    const handleDelNotify=()=>{
        axios.delete(`http://localhost:3002/notifications/del/${notification._id}`)
        .then((res)=>res.data)
        .catch((err)=>console.log(err))
    }


// deux actions fermer modale et naviguer
const handleClick =()=>{
    closeModal();
    navigate(`/profile/${me_User?._id}`)
}
    return (
        <div className='card-notification' >

            {notification.type === 'commitPresta' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body'  >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             <a href onClick={()=>handleClick()}><p>Lire...</p></a>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
             
            </div>
            
            </div>}

            {notification.type === 'newoffre' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body'  >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             <a href onClick={()=>navigate(`/offres`)}><p>Lire...</p></a>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
            
           </div>
            </div>}

            {notification.type === 'commitOffre' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body'  >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             <a href onClick={()=>navigate(`/offres`)} ><p>Lire...</p></a>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
            </div>
            
            </div>}

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

export default Notify;
