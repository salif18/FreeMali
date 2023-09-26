import React, { useContext, useEffect, useState } from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";
import axios from 'axios'
import PostCommentvideo from "./PostCommentvideo";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router";

const CardVideoPost = ({ video }) => {
  const navigate = useNavigate()
  const { description, filePath, createdAt ,commentaires, likes } = video;
  const { domaineURL,userId, defaultImage,admin,setAdmin, users } = useContext(MyStore);

  useEffect(()=>{
    axios.get(`${domaineURL}/profils/admin`,Headers)
    .then(res => setAdmin(res.data))
    .catch(err => console.log(err))
},[])


  // filtrer les prestataires dans la list users pour recuperer ses donnes
  const user = users.filter((c) => c._id === video.userId);
  const auteur = user[0];

 const { profile } = auteur;
 const { prenom } = profile

 //supprimer le poste
 const deletePost =()=>{
    axios.delete(`${domaineURL}/videos/${userId}/video/${video._id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
 }

 
  // model de notification
  const notification ={
    senderId:userId,
    receiverId:video.userId,
    type:"commitVideo",
    offreId:video._id,
    description:'a reagis à votre publication',
  }

  const adm = admin[0]

  // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    axios
     .post(`${domaineURL}/notifications`, notification,Headers)
     .then((res) => res.data)
     .catch((err) => console.log(err));

     axios
     .post(`${domaineURL}/notifications`,{
      adminId:adm?.userId,
      senderId:userId,
      description:'a reagis a une video',
      offreId:video._id,
      type:"commitVideo",
     })
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }

 // ajouter des commentaires
  const [newComents, setNewComents] = useState("");
 const commenter = (commentaires) => {
    if(newComents.length > 0){
    commentaires = { userId: userId, text: newComents };
    axios
      .put(`${domaineURL}/videos/addComent/${video._id}`, { commentaires },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setNewComents("");
    sendNotifications()
  }
  };


  //click pour donner un like
  const handleLike = () => {
    axios
      .post(`${domaineURL}/videos/${video._id}/notations`, {
        userId: userId,
        likes: 1,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  //click pour anuuler son jaime
  const handleAnnuler = () => {
    axios
      .post(`${domaineURL}/videos/${video._id}/notations`, {
        userId: userId,
        likes: 0,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const [viewCommit ,setViewcommit] = useState(false)

  return (
    <div className="cardvideos" key={video._id} >
    {/*header de la carte*/}
    <div className="donnees" onClick={()=>navigate(`/postes/${video._id}/video`)}>
      <div className="info-user">
      <img src={profile ? profile.photo : defaultImage} alt=""/>
      <div className="info-day">
        <p>{prenom}</p>
        <p>{format(createdAt)}</p>
      </div>
      </div>
        <p>{description}</p>
      </div>

     {/*zone video*/}
      <video controls autoPlay muted >
        <source type="video/mp4" src={filePath} />
      </video>

      {/* zone action de commenter ou liker*/}
      <div className="actions">
      <p><ThumbUpIcon onClick={handleLike} /><span>{likes}</span> <ThumbDownIcon onClick={handleAnnuler}/></p>
        <p onClick={()=>setViewcommit(!viewCommit)}><ChatBubbleOutlineIcon /> <span>commenter</span> {commentaires.length}</p>
        {video.userId === userId && <p onClick={deletePost}>Supprimer</p>}
      </div>

      {/*zone de saisie commentaire*/}
      <div className="zone-input">
        <input
          type="text"
          name="newComents"
          value={newComents}
          placeholder="Ecrivez un commentaire"
          onChange={(e)=>setNewComents(e.target.value)}
        />
        <button className="btn" onClick={commenter}><SendIcon /></button>
      </div>

      {/*zone affichage des commentaire*/}
      <div className="zone-commentaire">
        {viewCommit &&
                commentaires.map((commit) => (
                  <PostCommentvideo commit={commit} key={commit._id} objectId={video._id} />
                ))
        }
      </div>
    </div>
  );
};

export default CardVideoPost;
