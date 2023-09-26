import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { MyStore } from '../context/myStore';
import axios from 'axios';
import Opportunites from '../constants/cards/Opportunites';

const OffreObtenue = () => {
const { offres ,setOffres } = useContext(MyStore) 

//recuperer id dans url 
const { id } = useParams();

//recuperer les offres 
useEffect(()=>{
    axios.get('http://localhost:3002/offres')
    .then((res) =>{
        setOffres(res.data)
    }).catch((err) => console.log(err))
},[])

//recuperation de tous les offres ou user ses prononcer et accepter
const recupOffre =()=>{
    return offres
    .filter((offre) => 
       offre.commentaires.some((element) => 
       element.userId.includes(id) && element.accept === true
       ))
}
const myCandidaturs = recupOffre()


    return (
        <div className='offre-retenu'>
            <div className='container-offre'>
               <div className='entete'>
                 <h1>Offres </h1>
               </div>

               <div className='container'>
               {
                myCandidaturs &&
                   myCandidaturs.map((item) => (
                    <Opportunites 
                      offre={item}
                      key={item._id}
                    />
                   ))
               }
               </div>
            </div>
        </div>
    );
}

export default OffreObtenue;
