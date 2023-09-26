import React ,{useContext} from 'react';
import { MyStore } from '../../context/myStore';
import { format } from 'timeago.js';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const ReponseCourierCard = ({re}) => {
    const { userId,token, myProfile ,setAdmin,admin,domaineURL} = useContext(MyStore);
    
  
    const Headers = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    useEffect(()=>{
        axios.get(`${domaineURL}/profils/admin`,Headers)
        .then(res => setAdmin(res.data))
        .catch(err => console.log(err))
    },[])

    const administrateur = admin[0]
    

    return (
        <div className='zone-repse'>
        <div className='photo-nom'>
           <img src={userId === re.userId ? myProfile.photo : administrateur?.photo } alt='' />
           {userId === re.userId ? <p>{myProfile?.prenom}</p> : <p>{administrateur?.prenom}</p>}
        </div>
         <p>{re.reponse}</p>
         <p><span>{format(re.date)}</span></p>
      </div>
    );
}

export default ReponseCourierCard;
