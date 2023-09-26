import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CourriersCard from '../constants/cards/CourriersCard';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useContext } from 'react';
import { MyStore } from '../context/myStore';

const ArchivesCourier = () => {
    const {token} = useContext(MyStore)
    const [archives, setArchives ] = useState([]);
    const Headers = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

    useEffect(()=>{
        axios.get('http://localhost:3002/archives/couriers',Headers)
        .then(res => setArchives(res.data))
        .catch((err) => console.log(err))
    },[]);

    const [afficherConfirmation, setAfficherConfirmation] = useState(false);

    const afficherMessageConfirmation = () => {
      setAfficherConfirmation(true);
    };
  
    const annulerSuppression = () => {
      setAfficherConfirmation(false);
    };
  
    const confirmerArchive = () => {
      setAfficherConfirmation(false);
      // Appelez ici la fonction de suppression réelle
      // props.onSuppression() ou quelque chose de similaire
      axios.delete('http://localhost:3002/archives/couriers',Headers)
        .then(res => setArchives(res.data))
        .catch((err) => console.log(err))
    };
    
    return (
        <div className='courierArchive'>
          <div className='archive-header'>
             <h2>Les archives</h2>
             <button className="btn-archive-courier" onClick={afficherMessageConfirmation}> <UnarchiveIcon/> Desarchiver tous</button>
             {afficherConfirmation && (
              <div className='pops'>
                <p>Voulez-vous vraiment archiver ?</p>
                <div className='btn-confirm'>
                <button className='oui' onClick={confirmerArchive}>Oui</button>
                <button className='non' onClick={annulerSuppression}>Non</button>
              </div>
              </div>
            )}
          </div>
         <div className='arch'>     
         { archives.length > 0 ? (archives.map((item)=>(
            <CourriersCard item={item} />
           )))
            
             : (  <span className="textread"> """ Aucun archive ""</span> )
           }  
        </div>

        </div>
    );
}

export default ArchivesCourier;
