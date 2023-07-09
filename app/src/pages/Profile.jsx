import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../constants/Navbar";
import Footer from "../constants/Footer";
import axios from "axios";
import { MyStore } from "../context/myStore";
import MapsPrestataire from "../Maps/MapsPrestataire";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import AviComentaires from "../constants/card/aviComentaires";
import io from "socket.io-client";
import { create } from "@mui/material/styles/createTransitions";
// url de socket
const socket = io("http://localhost:3002");

const Profile = () => {
  const navigate = useNavigate();
  const { userId, token, myProfile, defaultImage,isInLine} = useContext(MyStore);
  const [item, setItem] = useState([]);
  const [avis, setAvis] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState("");

  
//configuration de l'entete
const Headers = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 }
  
  //recuperer le profile du prestataire selectionner
  useEffect(() => {
    axios
      .get(`http://localhost:3002/profiles/prestaProfile/${id}`,Headers)
      .then((res) => {
        const { avis } = res.data;
        setItem(res.data);
        setAvis(avis);
      })
      .catch((err) => console.log(err));
  }, [id]);

  

  //click pour donner un like
  const handleLike = () => {
    axios
      .post(`http://localhost:3002/profiles/${id}/notations`, {
        userId: userId,
        likes: 1,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  //click pour anuuler son jaime
  const handlePlus = () => {
    axios
      .post(`http://localhost:3002/profiles/${id}/notations`, {
        userId: userId,
        likes: 0,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  // click pour non jaime
  const handleDisLike = () => {
    axios
      .post(`http://localhost:3002/profiles/${id}/notations`, {
        userId: userId,
        likes: -1,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  // model de notification
  const notification ={
    senderId:userId,
    receiverId:item.userId,
    description:'a écrit à propos de vous',
    type:"commitPresta"
  }

  // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    socket.emit('send_notifications',notification)
    //  axios
    //   .post(`http://localhost:3002/notifications`, notification)
    //   .then((res) => res.data)
    //   .catch((err) => console.log(err));
  }

  // ajouter des avis sur le prestataire
  const handleAvis = (avis) => {
   if(!isInLine){
    navigate('/connecter')
   }
    if(comments.length > 0){ 
    avis = {userId: userId, comments: comments};
    axios
      .put(`http://localhost:3002/profiles/avis/${id}`, { avis },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
      sendNotifications()
      setComments("");
    }else{
      console.log('champs vide')
    }
  };

  // supprimer son avis sur le prestataire
  const handleDeleteCommit = (avi) => {
    axios
      .put(`http://localhost:3002/profiles/delete/${id}/avis/${avi._id}`,Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  // boutton pour contacter le prestataire en envoyer les deux id 
  const handleContacter = () => {
    axios
      .post(`http://localhost:3002/chat`, {
        senderId: userId,
        receiverId: item.userId,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    navigate(`/messagerie`);
  };


  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="pr">
          <h1>
            Profil de {item.nom} {item.prenom}
          </h1>
        </div>

        <div className="container-profiles">
          <div className="cars-profile">
            <div className="img-car">
              <img
                className="card-img"
                src={item.photo ? item.photo : defaultImage}
                alt=""
              />
            </div>

            <div className="card-body">
              <h1>
                Salut je suis {item.nom} {item.prenom}
              </h1>

              <div className="btn-avis">
                <button className="btn-j" onClick={() => handleLike()}>
                  <FavoriteIcon
                    style={{ color: "rgb(13,179,221),marginRight:10" }}
                  />
                  {item.likes} bon(s)
                </button>
                <button className="btn-jp" onClick={() => handleDisLike()}>
                  <HeartBrokenIcon
                    style={{ color: "#ff4040", marginRight: 10 }}
                  />
                  {item.disLikes} pas bon(s)
                </button>
                <button className="btn-nj" onClick={() => handlePlus()}>
                  <DoDisturbOnIcon style={{ color: "blue", marginRight: 10 }} />
                  annuler
                </button>
              </div>
            </div>
          </div>

          <div className="biograph">
            <h2>A propos de moi</h2>
            <p>{item.biographie}</p>
            {userId !== item.userId && (
              <button
                className="btn-contacter"
                onClick={() => handleContacter()}>
                Contacter
              </button>
            )}
          </div>

          <div className="details">
            <h2>Des details</h2>
            <p>
              Nom <span>{item.nom}</span>
            </p>
            <p>
              Prenom <span>{item.prenom}</span>
            </p>
            <p>
              Contact <span>{item.numero}</span>
            </p>
            <p>
              Proffession <span>{item.proffession}</span>
            </p>
            <p>
              Address <span>{item.address}</span>
            </p>
            <MapsPrestataire item={item} />
          </div>
        </div>
        <div className="les-notations">
          <div className="header-avis">
            <h1>Vos critiques sur le prestataire</h1>

            <img
              style={{ width: 50, height: 50, borderRadius: "100%" }}
              src={myProfile ? myProfile.photo : defaultImage}
              alt=""
            />

            <input
              className="input-avis"
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Ajoutez un commentaire...."
            />
            <button className="btn-avis-input" onClick={() => handleAvis()}>
              Critiquer
            </button>
          </div>

          <div className="avis">
            <h1>Les commentaires</h1>
            {avis.length <= 0 && (
              <p style={{ marginLeft: 20, color: "#aaa", fontSize: 14 }}>
                "Aucuns commentaires"
              </p>
            )}
            {avis.sort((a,b)=>a.createdAt - b.createdAt).map((avi) => (
              <AviComentaires
                avi={avi}
                handleDeleteCommit={handleDeleteCommit}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
