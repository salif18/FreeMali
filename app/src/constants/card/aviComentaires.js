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
    <div className="commentaire-o" key={avi._id}>
      <div className="left-commit">
        <div>
          <p style={{ fontWeight: 600 }}>{commentataire?.profile.prenom}</p>
          <img
            className="img-co"
            src={commentataire ? commentataire?.profile.photo : defaultImage}
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <div className='contenu-commit'>
            <p>{avi.comments}</p>
          </div>
          
        </div>
      </div>

      <div className="rigth-commit">
        <p>{format(avi.date)}</p>
        <div className="grp-btn">
          {userId === avi.userId && (
            <button
              className="btn-card-offre-del"
              onClick={() => handleDeleteCommit(avi)}>
              x
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AviComentaires;
