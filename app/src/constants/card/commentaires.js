import React, { useContext, useEffect } from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";
import { useNavigate } from "react-router";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Commentaires = ({ commit,oneOffre,offreId,offreUserId ,token }) => {
  const { domaineURL, userId, me_User, defaultImage, users, admin ,setAdmin } = useContext(MyStore);
  const navigate = useNavigate();

  //recuperer les donnees de admin
  useEffect(()=>{
    axios.get(`${domaineURL}/profils/admin`,Headers)
    .then(res => setAdmin(res.data))
    .catch(err => console.log(err))
},[])

  // filtrer les prestataires dans la list users pour recuperer ses donnes
  const commentataires = users.filter((c) => c._id === commit.userId);
  const commentataire = commentataires[0];

  
 // configuration de lentete
const Headers = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 }

 // model de notification
 const notification ={
  senderId:userId,
  receiverId:commit.userId,
  type:"commitOffre",
  offreId:oneOffre._id,
  description:'a accepter votre offre',
}

const adm = admin[0]

// boutton pour envoyer la notification au prestataire
const sendNotifications =()=>{
  //envoie de notification aux prestataires
  axios
   .post(`${domaineURL}/notifications`, notification,Headers)
   .then((res) => res.data)
   .catch((err) => console.log(err));
  //envoie a admin
   axios
   .post(`${domaineURL}/notifications`,{
    adminId:adm?.userId,
    senderId:userId,
    description:'a accepter a une candidature',
    offreId:oneOffre._id,
    type:"commitOffre",
   })
   .then((res) => res.data)
   .catch((err) => console.log(err));
}

 //button pour accepter la candidature
const accepter = (e)=>{
  e.preventDefault()
  axios.put(`${domaineURL}/offres/status/${offreId}/proposition/${commit._id}`,
  {newStatus:true},
   Headers
  )
  .then((res) => res.data)
  .catch((err) => console.log(err));
  axios.put(`${domaineURL}/offres/newStatus/${offreId}`,{newStatus:true},Headers)
  .then((res) => res.data)
  .catch((err) => console.log(err));
  sendNotifications()
}
   //button pour supprimer son commentaire
   const handleDeleteCommit = (commit) => {
    axios
      .put(
        `${domaineURL}/offres/user/delete/${offreId}/commentaires/${commit._id}`,Headers
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  return (
    <div className="commentaire-o" key={commit._id}>
      {/*affichage de photo */}
      
        <img
          className="img-co"
          src={commentataire ? commentataire.profile.photo : defaultImage}
          alt=""
        /> 
      
      {/*container du nom de la proposition et du text */}
        <div className="n-mess">
          <p className="name-co">
          {commentataire.profile.prenom}
          </p>
          <p className="name-co">
            Proposition: {(commit.userId === userId || offreUserId===userId)? 
            <span>{commit.budgetOffre} Fcfa</span>:
            <span style={{color:'green'}}>Montant en privée</span>}
          </p>
          <p className='mess' >
            {commit.comments}
          </p> 
        </div>

        {/*container de la date des button action*/}
        <div className='date-bt'>
        <p>{format(commit.date)}</p>
          
        <div className="grp-btn">
          {/*action autoriser selon les condition*/}
          {
            (userId === commit.userId && oneOffre.prise === false) && (
            <p
              className="btn-card-offre-dele"
              onClick={() => handleDeleteCommit(commit)}>
              Supprimer
            </p>
          )
          }
          {/*les affichage sous conditions*/}
          {
            commit.accept === true && 
              <span style={{color:'green',fontFamily:'Roboto'}}>
                 Accepté <CheckCircleIcon className="ic"/>
              </span>
          }

          {/*button a afficher selon les condition*/}
          {
            !me_User?.isPrestataire && 
            <>
          {
            ((commit.accept === false && oneOffre.prise === false ) && oneOffre.userId === userId) && 
              <button className="btn-offre-contacter" onClick={accepter}>
               accepter
             </button>
          }
            <button
              className="btn-offre-contacter"
              onClick={() => navigate(`/profile/${commit.userId}`)}>
              contacter
            </button>
            </>
          }

        </div>

      </div>

    </div>
  );
};

export default Commentaires;
