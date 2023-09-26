import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
class MapsCarte extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={{
          width: "1000px",
          height: "40vh",
          marginLeft:'190px'
          
        }}
        initialCenter={{
          lat: 12.639232,
          lng: -8.002889,
        }}>
        {this.props.resultatSearch.map((user) => (
          <Marker
            position={{
              lat: user.profile.latitude,
              lng: user.profile.longitude,
            }}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  //  apiKey: 'AIzaSyDFLF-glHoZOBdZYG6Y95SQVlQjzlE6KTw',
})(MapsCarte);
