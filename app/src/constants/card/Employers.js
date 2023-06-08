import React from 'react';
import { useNavigate } from 'react-router';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
const Employers = ({item}) => {
  const navigate = useNavigate()
  
    return (

        <div className='empCard' key={item._id}>
            <div className='containe-img'>
               <img className='empcard-img' src={item.profile.photo} alt=''/>
            </div>
            <div className='card-body'>
              <h2>{item.profile.prenom} {item.profile.nom}</h2>
              <p>{item.profile.proffession}</p>
              <div className='icons'>
              <p style={{color:'red',fontSize:12,fontFamily:"Roboto",fontWeight:600}}><FavoriteIcon style={{color:'#ff4040',marginLeft:10}}/> {item.profile.likes}</p>
              <p style={{color:'rgb(13,179,221)',fontSize:12,fontFamily:"Roboto",fontWeight:600}}><ThumbDownIcon style={{color:'rgb(13,167,221)',marginLeft:10}}/> {item.profile.disLikes}</p>
              <p style={{marginLeft:20, fontSize:12,fontWeight:600,fontFamily:'Roboto'}}>Avis {item.profile.avis.length}</p>
              </div>
            </div>
            <div className='container-bt'>
              <button className='btn-contacter' onClick={()=>navigate(`/profile/${item._id}`)}>Contacter</button>
            </div>
            
        </div>
    );
}

export default Employers;
