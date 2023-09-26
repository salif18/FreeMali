import React from 'react';
import CardRecomandation from '../constants/cards/CardRecomandation';
import { useContext } from 'react';
import { MyStore } from '../context/myStore';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';

const Recomandation = () => {
    const { recomandation,setClients,setUsers, setRecomandation,token } = useContext(MyStore);
  
    const Headers = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    
    //recuperer les products
    useEffect(()=>{
      axios.get('http://localhost:3002/auth/users&Profile',Headers)
      .then((res)=>{
        res && setUsers(res.data);
        setClients(res.data.filter((x)=>x.isPrestataire === false))
      }).catch(err => console.log(err))
    },[]);

    useEffect(()=>{
        axios.get('http://localhost:3002/recomandations',Headers)
        .then((res) => 
         res && setRecomandation(res.data))
        .catch((err) => console.log(err))
    })
    

    return (
        <>
        <div className='recomandations'>
           <div className='header-recom'>
           <h2>Les suggessions </h2>
           </div>
            <div>
              {
                recomandation.map((item) =>
                (<CardRecomandation item={item} key={item._id} /> ))
              }
            </div>
        </div>
        </>
    );
}

export default Recomandation;
