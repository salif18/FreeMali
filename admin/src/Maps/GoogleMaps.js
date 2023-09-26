import React from "react";
import { GoogleMap, Marker} from "react-google-maps";

const GoogleMaps = ({users}) => {
  return (
    <GoogleMap
      style={{
        width: "100%",
        height: "400px",
      }}
      initialCenter={{
        lat: 12.639232,
        lng: -8.002889,
      }}
      zoom={10}
    >
    
    </GoogleMap>
   
    
  );
};

export default GoogleMaps;
