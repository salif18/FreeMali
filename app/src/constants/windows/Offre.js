import React, { useContext, useEffect, useState } from 'react';
import CardOffres from '../card/Offres';
import axios from 'axios';
import { MyStore } from '../../context/myStore';

const Offre = () => {
    const { domaineURL, userId, me_User} = useContext(MyStore)
    const [offres , setOffres ] = useState([])
    // recuperation des offres du cotes server
  useEffect(() => {
    axios
      .get(`${domaineURL}/offres`)
      .then((res) => {
        res && setOffres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

const myOffres = offres.filter((item) => item.userId.includes(userId))

const myCandidaturesOffres = offres.filter((offre) => 
offre.commentaires.some((element) => 
  element.userId.includes(userId) && element.accept === true))

    return (
        <div className='videos'>
        {
          me_User.isPrestataire === false ? 
            myOffres.map((item) => (
            <div >
             <CardOffres item={item} key={item._id} />
            </div>
          ))
          :
          myCandidaturesOffres.map((item) => (
            <div >
             <CardOffres item={item} key={item._id} />
            </div>
          ))
        }
        </div>
    );
}

export default Offre;
