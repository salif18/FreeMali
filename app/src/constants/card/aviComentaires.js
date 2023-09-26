import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";

const AviComentaires = ({ avi, handleDeleteCommit }) => {
  const { userId, defaultImage, users } = useContext(MyStore);

  // filtrer les prestataires dans la list users pour recuperer ses donnes
  const commentataires = users.filter((c) => c._id === avi.userId);
  const commentataire = commentataires[0];
  return (
    <div className="aviscommentaire" key={avi._id}>
      
        
         
          <img
            className="img-avis"
            src={commentataire ? commentataire?.profile.photo : defaultImage}
            alt=""
          />
          
        
        <div className="n-mess">
         <p className="name">{commentataire?.profile.prenom}</p>
         <p className="mess-avis">{avi.comments}</p>
         </div>   
          
      <div className="date-btn">
        <p>{format(avi.date)}</p>
        <div className="grp-btn">
          {userId === avi.userId && (
            <p
              className="btn-card-avis-del"
              onClick={() => handleDeleteCommit(avi)}>
              Supprimer
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AviComentaires;
