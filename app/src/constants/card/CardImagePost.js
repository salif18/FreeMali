import React, { useContext, useEffect, useState } from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";
import axios from 'axios'
import PostComment from "./PostComment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router";

const CardImagePost = ({ image }) => {
  const navigate = useNavigate()
    const { description, photo, createdAt,commentaires,likes  } = image;
    const { domaineURL,userId, defaultImage,admin,setAdmin, users } = useContext(MyStore);

    useEffect(()=>{
      axios.get(`${domaineURL}/profils/admin`,Headers)
      .then(res => setAdmin(res.data))
      .catch(err => console.log(err))
  },[])
  
  
    // filtrer les prestataires dans la list users pour recuperer ses donnes
    const user = users.filter((c) => c._id === image.userId);
    const auteur = user[0];
    const { profile } = auteur
    const {prenom } = profile

     //supprimer le poste
 const deletePost =()=>{
    axios.delete(`${domaineURL}/images/${userId}/image/${image._id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))
 }


  // model de notification
  const notification ={
    senderId:userId,
    receiverId:image.userId,
    type:"commitImage",
    offreId:image._id,
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
      description:'a reagis a une image',
      offreId:image._id,
      type:"commitImage",
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
      .put(`${domaineURL}/images/addComent/${image._id}`, { commentaires },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setNewComents("");
    sendNotifications()
  }
  };

 
  
 //click pour donner un like
 const handleLike = () => {
    axios
      .post(`${domaineURL}/images/${image._id}/notations`, {
        userId: userId,
        likes: 1,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  //click pour anuuler son jaime
  const likeAnnuler = () => {
    axios
      .post(`${domaineURL}/images/${image._id}/notations`, {
        userId: userId,
        likes: 0,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

   const [viewCommit ,setViewcommit] = useState(false)

  return (
    <div className="cardimage" >
    {/*header de la carte*/}
    <div className="donnees" onClick={()=>navigate(`/postes/${image._id}/image`)}>
    <div className="info-user">
    <img src={ profile ? profile.photo : defaultImage} alt="" />
    <div className="info-day">
      <p>{prenom}</p>
      <p>{format(createdAt)}</p>
    </div>
    </div>
      <p>{description}</p>
    </div>

    {/*zone video*/}
    <div className="container-image" >
      <img src={photo} alt="" />
    </div>

    {/* zone action de commenter ou liker*/}
    <div className="actions">
      <p><ThumbUpIcon onClick={handleLike}/><span>{likes}</span> <ThumbDownIcon onClick={likeAnnuler} /></p>
      <p onClick={()=>setViewcommit(!viewCommit)}><ChatBubbleOutlineIcon /><span>commenter</span> {commentaires.length}</p>
      {image.userId === userId && <p onClick={deletePost}>Supprimer</p>}
      
    </div>

    {/*zone de saisie commentaire*/}
    <div className="zone-input">
      <input
        type="text"
        name="commentaire"
        value={newComents}
        onChange={(e)=>setNewComents(e.target.value)}
        placeholder="Ecrivez un commentaire"
      />
      <button className="btn" onClick={commenter}><SendIcon /></button>
    </div>

    
    {/*zone affichage des commentaire*/}
    <div className="zone-commentaire">
       {viewCommit &&
          commentaires.map((commit) => (
            <PostComment commit={commit} key={commit._id} objectId={image._id} />
          ))
       }
    </div>
    </div>
  );
};

export default CardImagePost;
