import React, { useContext} from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";
import axios from 'axios'

const SinglePostCommentIm = ({commit, objectId}) => {
    const {text, date } = commit
   const { userId, defaultImage, users, domaineURL } = useContext(MyStore);
  
    // filtrer les prestataires dans la list users pour recuperer ses donnes
    const user = users.filter((c) => c._id === commit.userId);
    const auteur = user[0];
    const { profile } = auteur
    const {prenom } = profile

     //supprimer le commentaire du post
  const handleDeleteCommit = (commit) => {
    axios
      .put(
        `${domaineURL}/images/delete/${objectId}/commentaires/${commit._id}`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

    return (
        <div className='singlepostcommentimg'>
        
         
        <img
          className="img-avis"
          src={profile ? profile.photo : defaultImage}
          alt=""
        />
        
     
      <div className="n-mess">
       <p className="name">{prenom}</p>
       <p className="mess-avis">{text}</p>
       </div>   
        
    <div className="date-btn">
      <p>{format(date)}</p>
      <div className="grp-btn">
        {userId === commit.userId && (
          <p
            className="btn-card-avis-del"
            onClick={() => handleDeleteCommit(commit)}>
            Supprimer
          </p>
        )}
      </div>
    </div>
        </div>
    );
}

export default SinglePostCommentIm;
