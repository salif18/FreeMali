import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router'

const CardNotification = ({notification}) => {
    const navigate = useNavigate()
    
    const [auteur , setAuteur ] = useState({})

    useEffect(() => {
       axios.get(`http://localhost:3002/profiles/prestaProfile/${notification.senderId}`,)
       .then((res)=>{
        setAuteur(res.data)
       }).catch((err) => console.log(err))
    },[])
    
    // boutton pour supprimer la notification
    const handleDelNotify=(id)=>{
        axios.delete(`http://localhost:3002/notifications/del/${id}`)
        .then((res)=>res.data)
        .catch((err)=>console.log(err))
    }

//fonction envoie de new status
const changeStatus=()=>{
    axios.put(`http://localhost:3002/notifications/status/${notification._id}`,{newStatus:'lue'})
    .then((res)=>res.data)
    .catch((err)=>console.log(err))
}



const handleNavigateRecom =()=>{
    navigate(`/recomandation`);
    changeStatus()
}

const handleNavigateMessa =()=>{
    navigate(`/courrier`);
    changeStatus()

}

const handleNavigateMessaReponse =()=>{
    navigate(`/courrier/${notification.offreId}`);
    changeStatus()

}

const handleNavigateCommitoffre =()=>{
    changeStatus();
    navigate(`/offres/${notification.offreId}`)
}


const handleNavigateNewoffre =()=>{
    changeStatus();
    navigate(`/offres`)
}

const handleNavigateCommitPresta =()=>{
    navigate(`/prestataires/${notification.offreId}`);
    changeStatus()
}
    return (
        <>

        {notification.type === 'newoffre' &&
        <div className={notification.status === 'non lue'? 'cardNonlue':'cardnotification'}   key={notification._id} >
         <img className='img' src={auteur.photo} alt='' />
         <div onClick={handleNavigateNewoffre}>
          <p className='auteur'> {auteur.prenom} {auteur.nom}</p>
          <p className='desc'>{notification.description}</p>
         </div>
         <p className='del' onClick={()=>handleDelNotify(notification._id)}>Supprimer</p>
        </div>}

        {notification.type === 'commitOffre' &&
        <div className={notification.status === 'non lue'? 'cardNonlue':'cardnotification'}  key={notification._id} >
         <img className='img' src={auteur.photo} alt='' />
         <div onClick={handleNavigateCommitoffre}>
          <p className='auteur'> {auteur.prenom} {auteur.nom}</p>
          <p className='desc'>{notification.description}</p>
         </div>
         <p className='del' onClick={()=>handleDelNotify(notification._id)}>Supprimer</p>
        </div>}

        {notification.type === 'commitPresta' &&
        <div className={notification.status === 'non lue'? 'cardNonlue':'cardnotification'}  key={notification._id} >
         <img className='img' src={auteur.photo} alt='' />
         <div onClick={handleNavigateCommitPresta}>
          <p className='auteur'> {auteur.prenom} {auteur.nom}</p>
          <p className='desc'>{notification.description}</p>
         </div>
         <p className='del' onClick={()=>handleDelNotify(notification._id)}>Supprimer</p>
        </div>}

        {notification.type === 'recommandation' &&
        <div className={notification.status === 'non lue'? 'cardNonlue':'cardnotification'} key={notification._id} >
         <img className='img' src={auteur.photo} alt='' />
         <div onClick={handleNavigateRecom}>
          <p className='auteur'> {auteur.prenom} {auteur.nom}</p>
          <p className='desc'>{notification.description}</p>
         </div>
         <p className='del' onClick={()=>handleDelNotify(notification._id)}>Supprimer</p>
        </div>}

        {notification.type === 'message' &&
        <div className={notification.status === 'non lue'? 'cardNonlue':'cardnotification'}  key={notification._id} >
         <img className='img' src={auteur.photo} alt='' />
         <div onClick={handleNavigateMessa}>
          <p className='auteur'> {auteur.prenom} {auteur.nom}</p>
          <p className='desc'>{notification.description}</p>
         </div>
         <p className='del' onClick={()=>handleDelNotify(notification._id)}>Supprimer</p>
        </div>}

        {notification.type === 'reponse' &&
        <div className={notification.status === 'non lue'? 'cardNonlue':'cardnotification'} key={notification._id} >
         <img className='img' src={auteur.photo} alt='' />
         <div onClick={handleNavigateMessaReponse}>
          <p className='auteur'> {auteur.prenom} {auteur.nom}</p>
          <p className='desc'>{notification.description}</p>
         </div>
         <p className='del' onClick={()=>handleDelNotify(notification._id)}>Supprimer</p>
        </div>}

        {notification.type === 'inscription' &&
        <div className={notification.status === 'non lue'? 'cardNonlue':'cardnotification'} key={notification._id} >
         <img className='img' src={auteur.photo} alt='' />
         <div onClick={changeStatus}>
          <p className='auteur'> {auteur.prenom} {auteur.nom}</p>
          <p className='desc'>{notification.description}</p>
         </div>
         <p className='del' onClick={()=>handleDelNotify(notification._id)}>Supprimer</p>
        </div>}

        </>
    );
}

export default CardNotification;
