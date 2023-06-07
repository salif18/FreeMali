import React from 'react';
// import { MyStore } from '../context/myStore';
import PlaceIcon from '@mui/icons-material/Place';

const MapsPrestataire =({item})=>{

   const shareLocation = () => {
        if (navigator.geolocation) {
          //recuperer la position actuel de user
            navigator.geolocation.getCurrentPosition(() => {
              
            //partager la logitude et latitude de la position de user sur maps
            const shareUrl = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`;//partager la position grace a google maps
            window.open(shareUrl, '_blank');//ouvrir par la fenetre window
          });
        }
      };
 

    return (
        
         <button className='maps-btn' onClick={shareLocation}>
          <PlaceIcon style={{marginRight:10,color:'#fff'}}/> Afficher la localisation 
         </button>
      
       );
     }
     export default MapsPrestataire
 