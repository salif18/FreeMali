import React from 'react';
import { useContext } from 'react';
import { MyStore } from '../../context/myStore';
import axios from 'axios';
import { format } from 'timeago.js';
import {useNavigate} from 'react-router'
import { useEffect } from 'react';
const Notify = ({notification}) => {
    const navigate = useNavigate()
    const {domaineURL,users,defaultImage,me_User,admin,setAdmin,closeModal} = useContext(MyStore)
    const auteurs = users.filter((c) => c._id === notification.senderId)
    const auteur = auteurs[0]
    
    useEffect(()=>{
        axios.get(`${domaineURL}/profils/admin`,Headers)
        .then(res => setAdmin(res.data))
        .catch(err => console.log(err))
    },[])
    // boutton pour supprimer la notification
    const handleDelNotify=()=>{
        axios.delete(`${domaineURL}/notifications/del/${notification._id}`)
        .then((res)=>res.data)
        .catch((err)=>console.log(err))
    }

//fonction envoie de new status
const changeStatus=()=>{
    axios.put(`${domaineURL}/notifications/status/${notification._id}`,{newStatus:'lue'})
    .then((res)=>res.data)
    .catch((err)=>console.log(err))
}

// deux actions fermer modale et naviguer
const handleClick =()=>{
    closeModal();
    navigate(`/profile/${me_User?._id}`);
    changeStatus()
}

const handleClick2 =()=>{
    closeModal();
    navigate(`/offres`);
    changeStatus()
}

const handleClick3 =()=>{
    closeModal();
    navigate(`/offre/${notification.offreId}`);
    changeStatus()
}

const handleClick4 =()=>{
    closeModal();
    navigate(`/courrier/${notification.offreId}`);
    changeStatus()
}

const handleClick5 =()=>{
    closeModal();
    navigate(`/courrier`);
    changeStatus()
}

const adm = admin[0]
    return (
        <div className={notification.status === 'non lue' ? 'nonLue':'card-notification'} >
            {notification.length <= 0 && <p>"Auncunes notifications"</p>}
            {notification.type === 'commitPresta' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body' onClick={()=>handleClick()} >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
             
            </div>
            
            </div>}

            {notification.type === 'newoffre' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body' onClick={()=>handleClick2()}>
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
            
           </div>
            </div>}

            {notification.type === 'commitOffre' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body' onClick={()=>handleClick3()} >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
            </div>
            
            </div>}

            {notification.type === 'reponse' && <div className='notif-image'>
            <img className='not-img' src={ adm ? adm?.photo : defaultImage} alt='' />
            <div className='notif-body' onClick={handleClick4} >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
            </div>
            
            </div>}

            {notification.type === 'message' && <div className='notif-image'>
            <img className='not-img' src={ adm ? adm?.photo : defaultImage} alt='' />
            <div className='notif-body' onClick={handleClick5} >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
            </div>
            
            </div>}

            {notification.type === 'commitVideo' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body'  >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
             </div>
             <p className='not-date'>{format(notification.createdAt)}</p>
            </div>
            
            </div>}
            {notification.type === 'commitImage' && <div className='notif-image'>
            <img className='not-img' src={ auteur ? auteur?.profile.photo : defaultImage} alt='' />
            <div className='notif-body'  >
            <div className='not-conta'>
            <h3>{auteur?.profile.prenom} {auteur?.profile.nom}</h3>
             <p className='desc'>{notification.description}</p>
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
