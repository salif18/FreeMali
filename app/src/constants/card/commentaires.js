import React, { useContext } from 'react';
import { MyStore } from '../../context/myStore';
import {format} from 'timeago.js'
import { useNavigate } from 'react-router';

const Commentaires = ({commit,handleDeleteCommit}) => {
    const {userId,me_User,defaultImage,users} = useContext(MyStore)
    const navigate =useNavigate()

// filtrer les prestataires dans la list users pour recuperer ses donnes
const commentataires = users.filter((c)=> c._id === commit.userId)
const commentataire = commentataires[0]

    return (
        <div className="commentaire-o" key={commit._id}>
        <div className="left-commit">
          <img className="img-co" src={commentataire ? commentataire?.profile.photo : defaultImage} alt='' />
          <div style={{display:'flex',flexDirection:'column',justifyContent:"space-between"}}>
          <p style={{fontWeight:600}}>{commit.nom}</p>
          <p>{commit.comments}</p>
          </div>
         </div>

          <div className="rigth-commit">
          <p>{format(commit.date)}</p>
          <div className='grp-btn'>
          {userId === commit.userId && <button className='btn-card-offre-del' onClick={()=>handleDeleteCommit(commit)}>x</button>}
           {!me_User?.isPrestataire && <button className="btn-offre-contacter" onClick={()=>navigate(`/profile/${commit.userId}`)} >contacter</button>}
          </div>
          </div>
        </div>
    );
}

export default Commentaires;
