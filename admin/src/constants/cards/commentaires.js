import React, { useContext, useState } from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";
import { useNavigate } from "react-router";
import axios from "axios";

const Commentaires = ({ commit}) => {
  const {  defaultImage, users } = useContext(MyStore);
 const navigate = useNavigate()
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
    <div className="commentaire-o" key={commit._id} onClick={()=>navigate(`/offre/retenue/${commit.userId}`)}>
      <div className="left-commit" >
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
          <p style={{ fontWeight: 600 }}></p>
            <p>{commit.comments}</p>
            {commit.accept === true && <span style={{fontFamily:'Roboto',color:'green',marginLeft:20}}>accepté</span>}
        </div>
      </div>

      <div className="rigth-commit">
        <p>{format(commit.date)}</p>
      </div>
    </div>
  );
};

export default Commentaires;
