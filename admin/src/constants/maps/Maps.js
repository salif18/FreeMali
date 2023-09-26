import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Popup } from "google-maps-react";
class Maps extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={{
          width: "1000px",
          height: "80vh",
          margin:20
        }}
        initialCenter={{
          lat: 12.639232,
          lng: -8.002889,
        }}>
        {this.props.users.map((user) => (
          <Marker
            position={{
              lat: user.profile.latitude,
              lng: user.profile.longitude,
            }}
          >
          <Popup>{user.profile.prenom}</Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  //  apiKey: 'AIzaSyDFLF-glHoZOBdZYG6Y95SQVlQjzlE6KTw',
})(Maps);
