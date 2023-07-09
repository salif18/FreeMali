import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import Navbar from "../constants/Navbar";
import { MyStore } from "../context/myStore";
import axios from "axios";
import { format } from "timeago.js";
import Commentaires from "../constants/card/commentaires";

const SingleOffre = () => {
  const { userId, me_User, token, myProfile,users, defaultImage, isInLine } =
    useContext(MyStore);
  const navigate = useNavigate();
  const { id } = useParams();
  const [oneOffre, setOneOffre] = useState([]);
  const [comments, setComments] = useState([]);
  const [newcomit, setnewComit] = useState('')
  const [modifier , setModifier] = useState(false)
  //contenu du commentaries
  const [newComents, setNewComents] = useState("");
 const Headers = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 }
  useEffect(() => {
    axios
      .get(`http://localhost:3002/offres/${id}`,Headers) //recuperer un offre
      .then((res) => {
        const { commentaires } = res.data;
        setOneOffre(res.data);
        setComments(commentaires);
      })
      .catch((err) => console.log(err));
  }, [id]);


  // model de notification
  const notification ={
    senderId:userId,
    receiverId:oneOffre.userId,
    type:"commitOffre",
    offreId:oneOffre._id,
    description:'a reagis à votre offre',
  }

  // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    axios
     .post(`http://localhost:3002/notifications`, notification,Headers)
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }

  // ajouter des commentaires
  const addCommentaires = (commentaires) => {
    if(newComents.length > 0){
    commentaires = { userId: userId, comments: newComents };
    axios
      .put(`http://localhost:3002/offres/addComent/${id}`, { commentaires },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setNewComents("");
    sendNotifications()
  }
  };

  const handleDeleteCommit = (commit) => {
    axios
      .put(
        `http://localhost:3002/offres/user/delete/${oneOffre.userId}/commentaires/${commit._id}`,Headers
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };
  const contactDonneur = () => {
    axios
      .post("http://localhost:3002/chat", {
        senderId: userId,
        receiverId: oneOffre.userId,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    navigate("/messagerie");
  };

  const handleModifier = (commit)=>{
    axios.put(`http://localhost:3002/offres/modify/${commit.userId}/commentaires/${commit._id}`,{newcomit},Headers)
    .then((res) => res.data)
    .catch((err) => console.log(err));
    setModifier(!modifier)
    setnewComit('')
  }

  const auteurs = users.filter(x => x.userId === oneOffre.userId)
  const auteurImg = auteurs[0]
  
  return (
    <>
      <Navbar />
      {!isInLine && <Navigate to="/connecter" replace={true} />}
      <div className="singleoffre">
        <div className="single-offre-header">
          <div className="rt">
          <h1>La demande</h1>
          <img src={auteurImg? auteurImg.profile.photo :defaultImage} alt='' />
          </div>
          <p>{format(oneOffre.createdAt)}</p>
        </div>

        <div className="contenu-single-offre">
          <p>{oneOffre.contenu}</p>
          {me_User?.isPrestataire && (
            <button
              className="contacter-offre"
              onClick={() => contactDonneur()}>
              Contacter l'auteur
            </button>
          )}
          <div className="input-single">
            <img
              style={{
                width: 50,
                height: 50,
                marginRight: 20,
                borderRadius: "100%",
              }}
              src={myProfile ? myProfile.photo : defaultImage}
              alt=""
            />
            <input
              className="input-reponse"
              type="text"
              value={newComents}
              onChange={(e) => setNewComents(e.target.value)}
              placeholder="Ajoutez un commentaire...."
            />
            <button
              className="btn-offre-reponse"
              onClick={(e) => addCommentaires(e)}>
              Commenter
            </button>
          </div>
        </div>

        <div className="single-commentaire">
          <h1>Les commentaires</h1>
          {comments.length <= 0 && (
            <p style={{ marginLeft: 20, color: "#aaa", fontSize: 14 }}>
              "Aucuns commentaires"
            </p>
          )}
          {comments.map((commit) => (
            <Commentaires
              commit={commit}
              handleDeleteCommit={handleDeleteCommit}
              handleModifier={handleModifier}
              newcomit={newcomit}
              setnewComit={setnewComit}
              modifier={modifier}
              setModifier={setModifier}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleOffre;
