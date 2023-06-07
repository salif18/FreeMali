import React from 'react';
import { useNavigate } from 'react-router';

const Employers = ({item}) => {
  const navigate = useNavigate()
  
    return (

        <div className='empCard' key={item._id}>
            <div className='containe-img'>
               <img className='empcard-img' src={item.profile.photo} alt=''/>
            </div>
            <div className='card-body'>
              <h2>{item.profile.nom} {item.profile.prenom} </h2>
              <p>{item.profile.proffession}</p>
              
            </div>
            <div className='container-bt'>
              <button className='btn-contacter' onClick={()=>navigate(`/profile/${item._id}`)}>Contacter</button>
            </div>
            
        </div>
    );
}

export default Employers;
