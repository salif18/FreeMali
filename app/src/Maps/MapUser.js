import React, { useContext } from "react";
import { MyStore } from "../context/myStore";

const MapUser = () => {
  const { myProfile } = useContext(MyStore);
  const shareLocation = () => {
    if (navigator.geolocation) {
      //demander la position actuel de user
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        //partager sa position par biais de maps google
        const shareUrl = `https://www.google.com/maps?q=${
          myProfile ? myProfile.latitude : latitude
        },${myProfile ? myProfile.longitude : longitude}`;
        //ouvrir par la fenetre window
        window.open(shareUrl, "_blank");
      });
    }
  };
  const mapsImage =
    "https://www.theadx.com/images-en/img-lokasyon-hedefleme.png";
  return (
    <button className="maps-user-btn" onClick={shareLocation}>
      <img className="carte-maps" src={mapsImage} alt="" />
      Afficher ma localisation
    </button>
  );
};

export default MapUser;
