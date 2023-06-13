import React from "react";
import { GoogleMap} from "react-google-maps";

const GoogleMaps = () => {
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
    />
  );
};

export default GoogleMaps;
