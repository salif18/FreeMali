import React, { Component} from 'react';
import {Map , GoogleApiWrapper} from 'google-maps-react'
class MapsCarte extends Component { 

  render() {
    return (
        
       
         <Map
           google={this.props.google}
           zoom={10}
           style={{
               width: '1500px',
               height: '350px',
            }}
           initialCenter={{
               lat:12.639232,
               lng:-8.002889 }}
         /> 
      
       );
     }
     
  }

   export default GoogleApiWrapper({
     apiKey: 'AIzaSyDFLF-glHoZOBdZYG6Y95SQVlQjzlE6KTw',
   })(MapsCarte);
