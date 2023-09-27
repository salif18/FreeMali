import React, { useContext, useEffect, useState } from "react";
import Videos from "./windows/Videos";
import Images from "./windows/Images";
import Offre from "./windows/Offre";
import { MyStore } from "../context/myStore";
import CommitPresta from "./windows/CommitPresta";
import axios from "axios";

const Nav = () => {
  const { domaineURL, userId,me_User} = useContext(MyStore)
  const [viewPhoto, setViewPhoto] = useState(false);
  const [viewVideo, setViewVideo] = useState(false);
  const [viewOffre, setViewOffre] = useState(false)
  const [viewCommit ,setViewCommit] = useState(false)

  

  const [item ,setItem ] = useState({})
  const [avis ,setAvis ] = useState([])
  
  //recuperer le profile du prestataire selectionner
useEffect(() => {
  axios
    .get(`${domaineURL}/profiles/prestaProfile/${userId}`)
    .then((res) => {
      const { avis } = res.data;
      setItem(res.data);
      setAvis(avis);
    })
    .catch((err) => console.log(err));
}, []);


  const handlePhoto = () => {
    setViewPhoto(!viewPhoto);
    
  };

  const handleVideo = () => {
    setViewVideo(!viewVideo);
  };

  const handleOffre=()=>{
    setViewOffre(!viewOffre)
  }

  
  const handleCommentaire=()=>{
    setViewCommit(!viewCommit)
  }

  return (
    <div className="nav">
      <div className="container">
        <p onClick={handlePhoto} className='p'>Photos</p>
        <p onClick={handleVideo} className='p'>Videos</p>
        <p onClick={handleOffre} className='p'>Offres</p>
        {me_User.isPrestataire === true && <p onClick={handleCommentaire} className='p'>A propos de moi</p>}
        {me_User.isPrestataire === true && <p className="p">({item.likes}) j'aimes</p>}
      </div>

      {viewVideo && (
        <div className="zone">
          <Videos />
        </div>
      )}

      {viewPhoto && (
        <div className="zone">
          <Images />
        </div>
      )}

      {viewOffre && (
        <div className="zone">
          <Offre />
        </div>
      )}

      {viewCommit && (
        <div className="zone">
          <CommitPresta/>
        </div>
      )}



    </div>
  );
};

export default Nav;
