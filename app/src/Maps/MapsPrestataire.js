import React from "react";
// import { MyStore } from '../context/myStore';

const MapsPrestataire = ({ item }) => {
  const shareLocation = () => {
    if (navigator.geolocation) {
      //recuperer la position actuel de user
      navigator.geolocation.getCurrentPosition(() => {
        //partager la logitude et latitude de la position de user sur maps
        const shareUrl = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`; //partager la position grace a google maps
        window.open(shareUrl, "_blank"); //ouvrir par la fenetre window
      });
    }
  };

  const mapsImg =
    "https://www.plotprojects.com/wp-content/uploads/2023/01/geotargeting_advertising.jpg";
  return (
    <button className="maps-presta-btn" onClick={shareLocation}>
      <img src={mapsImg} alt="" />
    </button>
  );
};
export default MapsPrestataire;
