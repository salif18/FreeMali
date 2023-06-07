import React, { useContext } from 'react';
import { MyStore } from '../context/myStore';

// class MapContainer extends Component {
const MapUser =()=>{
  const {myProfile} = useContext(MyStore)
   const shareLocation = () => {
      
        if (navigator.geolocation) {
            //demander la position actuel de user
            navigator.geolocation.getCurrentPosition(() => {
            //partager sa position par biais de maps google
            const shareUrl = `https://www.google.com/maps?q=${myProfile.latitude},${myProfile.longitude}`;//partager la position grace a google maps
            window.open(shareUrl, '_blank');//ouvrir par la fenetre window
          });
        }
      };
 


    //  render() {
    return (
        
         <button className='maps-btn' onClick={shareLocation}>
          Affcher ma localisation
         </button>
        //  <Map
        //    google={this.props.google}
        //    zoom={10}
        //    style={{
        //        width: '300px',
        //        height: '300px',
        //     }}
        //    initialCenter={{
        //        lat:12.639232,
        //        lng:-8.002889 }}
        //  /> 
      
       );
     }
     export default MapUser
  // }

  //  export default GoogleApiWrapper({
  //    apiKey: 'AIzaSyDFLF-glHoZOBdZYG6Y95SQVlQjzlE6KTw',
  //  })(MapContainer);
