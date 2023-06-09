import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../../context/myStore";
import { NavLink } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const CardOffres = ({ item }) => {
  const navigate = useNavigate();
  const { me_User, userId, token, defaultImage, users } = useContext(MyStore);

  //configuration de lentete
const Headers = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 }
  const deleteOffre = () => {
    axios
      .delete(`http://localhost:3002/offres/${item._id}`,Headers) //supprimer son offre
      .then((res) => res.data)
      .catch((Err) => console.log(Err));
  }; 

  //recuperer les infos sur auteurs dans la list de tous les users
  const Auteur = users.filter((c) => c._id === item.userId);
  const auteur = Auteur[0];


  return (
    <div className="card-offre" key={item._id}>
      <div className="card-offre-body">
        <div className="container-img-card-offre">
          <img
            className="img-card-offre"
            src={auteur ? auteur?.profile.photo : defaultImage}
            alt=""
          />

          <div className="contenu">
            <h1>Offre</h1>
            <div className="contenu-commit">
             <p>{item.contenu}</p>
            </div>
            <NavLink className="commenter" to={`/offre/${item._id}`}>
              Commentaires({item.commentaires.length})
            </NavLink>
          </div>
        </div>
      </div>
      <div className="center">
        <div className="contenu">
          <h1>Auteur</h1>
          <p>{auteur?.profile.prenom}</p>
          <p>{auteur?.numero}</p>
        </div>

        <div className="contenu">
          <h1>Date</h1>
          <p className="p2">{format(item.createdAt)}</p>
        </div>
      </div>
      <div className="grp-btn">
        {me_User && !me_User.isPrestataire && item.userId === userId && (
          <button
            className="btn-card-offre-del"
            onClick={() => deleteOffre(item._id)}>
            x
          </button>
        )}
        <button
          className="btn-card-offre"
          onClick={() => navigate(`/offre/${item._id}`)}>
          Voire projet
        </button>
      </div>
    </div>
  );
};

export default CardOffres;
