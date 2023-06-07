import React, { useContext } from 'react';
import { MyStore } from '../context/myStore';

const MapUser =()=>{
  const {myProfile} = useContext(MyStore)
   const shareLocation = () => {
      
        if (navigator.geolocation) {
            //demander la position actuel de user
            navigator.geolocation.getCurrentPosition(() => {
            //partager sa position par biais de maps google
            const shareUrl = `https://www.google.com/maps?q=${myProfile.latitude},${myProfile.longitude}`;
            //ouvrir par la fenetre window
            window.open(shareUrl, '_blank');
          });
        }
      };
 
    return (
        
         <button className='maps-btn' onClick={shareLocation}>
          Affcher ma localisation
         </button>
       
       );
     }
 
export default MapUser