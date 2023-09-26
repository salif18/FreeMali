import React, { useState } from "react";
import Videos from "./windows/Videos";
import Images from "./windows/Images";
import Offre from "./windows/Offre";

const Nav = () => {
  const [viewPhoto, setViewPhoto] = useState(false);
  const [viewVideo, setViewVideo] = useState(false);
  const [viewOffre, setViewOffre] = useState(false)

  const handlePhoto = () => {
    setViewPhoto(!viewPhoto);
    
  };

  const handleVideo = () => {
    setViewVideo(!viewVideo);
  };

  const handleOffre=()=>{
    setViewOffre(!viewOffre)
  }

  return (
    <div className="nav">
      <div className="container">
        <p onClick={handlePhoto} className='p'>Photos</p>
        <p onClick={handleVideo} className='p'>Videos</p>
        <p onClick={handleOffre} className='p'>Offres</p>
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

    </div>
  );
};

export default Nav;
