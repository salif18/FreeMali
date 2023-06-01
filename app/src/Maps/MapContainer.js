import React, { Component } from 'react';
   import { Map, GoogleApiWrapper } from 'google-maps-react';

   class MapContainer extends Component {

    shareLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const shareUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            window.open(shareUrl, '_blank');
          });
        }
      };
 

     render() {
       return (
    
         <button className='maps-btn' onClick={this.shareLocation}>
          Partager ma geo-localisation
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
   }

   export default GoogleApiWrapper({
     apiKey: 'AIzaSyDFLF-glHoZOBdZYG6Y95SQVlQjzlE6KTw',
   })(MapContainer);
