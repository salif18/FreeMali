import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { MyStore } from '../../context/myStore';
import { NavLink } from 'react-router-dom';
import {format} from 'timeago.js'
const CardOffres = ({item}) => {
    const navigate = useNavigate()
     const {delOffre,me_User,userId } = useContext(MyStore)

    return (
        <div className='card-offre' key={item._id}>
            <div className='container-img-card-offre'>
               <img className='img-card-offre' src={item.image} alt='' />
            </div>
            <div className='card-offre-body'>
              <div className='contenu'>
               <h1>Titre du projet</h1>
               <p>{item.contenu}</p>
               <NavLink className='commenter' to={`/offre/${item._id}`}>Commentaires({item.commentaires.length})</NavLink>
               </div>
              <div className='contenu'>
              <h1>Auteur</h1>
              <p>{item.nom}</p>
              </div>
              <div className='contenu'>
              <h1>Date</h1>
              <p className='p2'>{format(item.createdAt)}</p>
              </div>
            </div>
            <div className='grp-btn'>
            
            {!me_User.isPrestataire && item.userId === userId && <button className='btn-card-offre-del'
             onClick={()=>delOffre(item._id)}
            >
            X
            </button>}
            <button className='btn-card-offre'
             onClick={()=>navigate(`/offre/${item._id}`)}>
            Voire projet
            </button>
            </div>
        </div>
    );
}

export default CardOffres;
