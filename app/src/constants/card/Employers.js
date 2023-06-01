import React from 'react';
import { useNavigate } from 'react-router';

const EmpCard = ({item}) => {
  const navigate = useNavigate()
    return (

        <div className='empCard' key={item._id}>
            <div className='containe-img'>
               <img className='empcard-img' src={item.photo} alt=''/>
            </div>
            <div className='card-body'>
              <h2>{item.nom} {item.prenom} </h2>
              <p>{item.proffession}</p>
              
            </div>
            <div className='container-bt'>
              <button className='btn-contacter' onClick={()=>navigate(`/profile/${item._id}`)}>Contacter</button>
            </div>
            
        </div>
    );
}

export default EmpCard;
