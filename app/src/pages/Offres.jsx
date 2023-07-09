import React, { useContext, useEffect, useState } from "react";
import Navbar from "../constants/Navbar";
import CardOffres from "../constants/card/Offres";
import { MyStore } from "../context/myStore";
import axios from "axios";

// url pour poster et recuperer tous les offres
const url = "http://localhost:3002/offres";
const Offres = () => {
  const {
    me_User,
    myProfile,
    defaultImage,
    userId,
    token,
    offres,
    getOffres,
    isInLine,
    users,
  } = useContext(MyStore);
//configuration de lentete
const Headers = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 }
// valeur du champs input offre
  const [recits, setRecits] = useState("");
  
  // boutton pour envoyer la notification a un ensemble de groupe prestataire en un clic
  const sendNotifications =()=>{
    users.filter((x) => x.isPrestataire).map((x)=>
      axios
     .post(`http://localhost:3002/notifications`,
     { 
       senderId:userId,
       receiverId:x._id,
       type:"commitOffre",
       description:'a poster une nouvelle offre'
      })
     .then((res) => res.data)
     .catch((err) => console.log(err))
    )
 }

  // recuperation des offres du cotes server
  useEffect(() => {
    axios
      .get(url,Headers)
      .then((res) => {
        res && getOffres(res.data);
      })
      .catch((err) => console.log(err));
  }, [getOffres]);

  
  // boutton pour poster un offre
  const handlePost = () => {
    if(offres.length > 0){
    const offres = {
      userId: userId,
      contenu: recits,
      
    };

    //envoie des offres vers le server
    axios
      .post(url, offres,Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
      sendNotifications();
      setRecits("");
     
  }else{
    console.log('vide')
  }
  };

  return (
    <>
      <Navbar />
      <div className="offres">
        {me_User && !me_User?.isPrestataire && (
          <div className="container-offre">
            <img
              className="img-offre"
              src={myProfile ? myProfile?.photo : defaultImage}
              alt=""
            />
            <div className="cham-texta">
              <h1>Rediger votre offre</h1>
              <textarea
                className="texta"
                value={recits}
                onChange={(e) => setRecits(e.target.value)}
                placeholder="Ajoutez une offre..."></textarea>
              <button className="btn-post-offre" onClick={(e) => handlePost(e)}>
                Envoyer
              </button>
            </div>
          </div>
        )}

        <div className="offre-pulier">
          {offres?.length <= 0 && me_User && me_User?.isPrestataire && (
            <p className="textaucun">" Aucun offre pour le moment "</p>
          )}
          {offres?.length <= 0 && me_User && !me_User?.isPrestataire && (
            <p className="textaucun">" Aucun offre pour le moment "</p>
          )}
          {offres?.length <= 0 && !isInLine && (
            <p className="textaucun">" Aucun offre pour le moment "</p>
          )}
          {offres?.map((item) => (
            <CardOffres item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Offres;
