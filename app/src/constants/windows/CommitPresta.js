import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../../context/myStore';
import AviComentaires from '../card/aviComentaires';

const CommitPresta = () => {
    const { domaineURL, userId} = useContext(MyStore)

    const [item ,setItem ] = useState({})
    const [avis ,setAvis ] = useState([])
    
    //recuperer le profile du prestataire selectionner
  useEffect(() => {
    axios
      .get(`${domaineURL}/profiles/prestaProfile/${userId}`)
      .then((res) => {
        const { avis } = res.data;
        setItem(res.data);
        setAvis(avis);
      })
      .catch((err) => console.log(err));
  }, []);

    return (
        <div className='videos'>
        {avis.map((item) => (
            <div >
             <AviComentaires avi={item} />
            </div>
          ))}
        </div>
    );
}

export default CommitPresta;
