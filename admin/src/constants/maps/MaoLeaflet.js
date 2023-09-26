import React, { useContext } from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MyStore } from '../../context/myStore';

const MaoLeaflet = () => {
const {users } = useContext(MyStore)
    return (
        <MapContainer
         center={[12.639232,-8.002889]}
         zoom={13}
         style={{height:'260px',width:'100%',border:'1px solid #aaa', boxShadow:'2px 2px 2px 2px #ececec', borderRadius:10, margin:10}}
        >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
            {users.map(user =>(
                <Marker 
                key={user.profile.prenom}
                   position={[
                    user.profile.latitude, 
                    user.profile.longitude
                   ]}
                >
                <Popup>{user.profile.prenom}</Popup>
                </Marker>
                ))}
        </MapContainer>
    );
}

export default MaoLeaflet;
