import React, { useContext } from 'react';
import Maps from '../constants/maps/Maps';
import { MyStore } from '../context/myStore';
import MaoLeaflet from '../constants/maps/MaoLeaflet';
import GoogleMaps from '../Maps/GoogleMaps';

const MapView = () => {
    const {users} = useContext(MyStore)
    return (
        <div style={{flex:4}}>
        <Maps users={users} />
        </div>
    );
}

export default MapView;
