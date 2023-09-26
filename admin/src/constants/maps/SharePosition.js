import React from 'react';
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
const SharePosition = ({user}) => {
    
    const BntSharePodition =()=>{
        const urlShare=`https://www.google.com/maps?q=${user.latitude},${user.longitude}`
        window.open(urlShare)
    }
    return (
        <button className='btn-share' onClick={BntSharePodition}>
           <LocationSearchingIcon style={{marginRight:20}}/> Voire la position
        </button>
    );
}

export default SharePosition;
