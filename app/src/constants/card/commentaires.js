import React, { useContext, useState } from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";
import { useNavigate } from "react-router";
import axios from "axios";

const Commentaires = ({ commit,handleDeleteCommit, handleModifier , newcomit, setnewComit, modifier , setModifier}) => {
  const { userId, token, me_User, defaultImage, users } = useContext(MyStore);
  const navigate = useNavigate();

  // filtrer les prestataires dans la list users pour recuperer ses donnes
  const commentataires = users.filter((c) => c._id === commit.userId);
  const commentataire = commentataires[0];

  
  //configuration de lentete
// const Headers = {
//   headers:{
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
//  }
  
  return (
    <div className="commentaire-o" key={commit._id}>
      <div className="left-commit">
        <img
          className="img-co"
          src={commentataire ? commentataire?.profile.photo : defaultImage}
          alt=""
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <p style={{ fontWeight: 600 }}>{commentataire?.profile.prenom}</p>
            <p>{commit.comments}</p>
            {(userId === commit.userId && !modifier) && <p onClick={()=>setModifier(!modifier)}><span>modifier</span></p>}
            
            {(modifier && userId === commit.userId ) && 
             <div style={{display:'flex'}}><input type="text" 
              className="modifier-comment"
              value={newcomit}
              placeholder="modifier le commentaire... "
              onChange={(e)=>setnewComit(e.target.value)} />
              {(userId === commit.userId && modifier) && <p onClick={()=>handleModifier(commit)} ><span>Ok</span></p>}
              </div>
            }
        </div>
      </div>

      <div className="rigth-commit">
        <p>{format(commit.date)}</p>
        <div className="grp-btn">
          {userId === commit.userId && (
            <button
              className="btn-card-offre-del"
              onClick={() => handleDeleteCommit(commit)}>
              x
            </button>
          )}
          {!me_User?.isPrestataire && (
            <button
              className="btn-offre-contacter"
              onClick={() => navigate(`/profile/${commit.userId}`)}>
              contacter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commentaires;
