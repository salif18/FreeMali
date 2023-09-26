import React ,{useContext, useState} from 'react';
import { format } from "timeago.js";
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { MyStore } from '../../context/myStore';

const CourriersCard = ({item}) => {
    const navigate = useNavigate()
    const { domaineURL } = useContext(MyStore)

    const [afficherConfirmation, setAfficherConfirmation] = useState(false);

    const afficherMessageConfirmation = () => {
      setAfficherConfirmation(true);
    };
  
    const annulerSuppression = () => {
      setAfficherConfirmation(false);
    };
  
    const confirmerSuppression = () => {
      setAfficherConfirmation(false);
      axios.delete(`${domaineURL}/courriers/delete/${item._id}`)
      .then(res => res.data)
      .catch(err => console.log(err))
    };

    const statusLue =()=>{
      axios.put(`${domaineURL}/courriers/userlue/${item._id}`,{newStatus:'lue'})
      .then((res) => res.data)
      .catch((err)=>console.log(err))
  }

  const send =()=>{
    statusLue();
    navigate(`/courrier/${item._id}`)
  }
   
    return (
        <div className={item.userlue === 'non lue' ? 'courriercardNonLue':'courriercardLue'} key={item._id} >
            <div className='auteur-courrier' onClick={send}>
            <h2>{item.names}</h2>
            </div>
            <div className='courrier-sujet' onClick={send}>
            <h2>{item.sujet}</h2>
            </div>
            <div className='courrier-actions'>
            <DraftsIcon style={{margin:5, fontSize:20}} />
            <DeleteSweepIcon onClick={afficherMessageConfirmation} style={{margin:5, fontSize:20}} />
            {afficherConfirmation && (
                <div className='pops'>
                  <p>Voulez-vous vraiment supprimer ?</p>
                  <div className='btn-confirm'>
                  <button className='oui' onClick={confirmerSuppression}>Oui</button>
                  <button className='non' onClick={annulerSuppression}>Non</button>
                </div>
                </div>
              )}
            </div>
            <div className='courrier-date' onClick={()=>navigate(`/courrier/${item._id}`)}>
             <p>{format(item.createdAt)}</p>
            </div>
        </div>
    );
}

export default CourriersCard;
