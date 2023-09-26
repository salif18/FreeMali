import React, { useState } from "react";
import Videos from "./windows/Videos";
import Images from "./windows/Images";

const Nav = () => {
  const [viewPhoto, setViewPhoto] = useState(true);
  const [viewVideo, setViewVideo] = useState(false);

  const handlePhoto = () => {
    setViewPhoto(true);
    setViewVideo(false);
  };

  const handleVideo = () => {
    setViewPhoto(false);
    setViewVideo(true);
  };

  return (
    <div className="nav">
      <div className="container">
        <p onClick={handlePhoto} className='p'>Photos</p>
        <p onClick={handleVideo} className='p'>Videos</p>
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
    </div>
  );
};

export default Nav;
