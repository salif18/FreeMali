import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../../context/myStore";
import { NavLink } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CardOffres = ({ item }) => {
  const navigate = useNavigate();
  const { me_User, domaineURL, userId, token, defaultImage, users } = useContext(MyStore);

  //configuration de lentete
const Headers = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 }

 
 const [afficherConfirmation, setAfficherConfirmation] = useState(false);

 const afficherMessageConfirmation = () => {
   setAfficherConfirmation(true);
 };

 const annulerSuppression = () => {
   setAfficherConfirmation(false);
 };

 const confirmerSuppression = () => {
   setAfficherConfirmation(false);
   axios
      .delete(`${domaineURL}/offres/${item._id}`,Headers) //supprimer son offre
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
          <div className="center">
          <div className="contenuss">
            <p>{auteur?.profile.prenom}</p>
            
          </div>
          <div className="contenus">
             <p className="p2">{format(item.createdAt)}</p>
          </div>
        </div>
       
        </div>
        
        <div>
        <div className="grp-btn">
        {(me_User && !me_User.isPrestataire && item.userId === userId && item.prise === false) && (
          <button
            className="btn-card-offre-del"
            onClick={afficherMessageConfirmation}>
            x
          </button>
        )}
        {afficherConfirmation && (
          <div className='pops'>
            <p>Voulez-vous vraiment supprimer ?</p>
            <div className='btn-confirm'>
            <button className='oui' onClick={confirmerSuppression}>Oui</button>
            <button className='non' onClick={annulerSuppression}>Non</button>
          </div>
          </div>
        )}
        <button
          className="btn-card-offre"
          onClick={() => navigate(`/offre/${item._id}`)}>
          Postulez à l'offre
        </button>
        <p >Offre: <span style={{fontSize:'0.9em',fontWeight:500,color: item.prise === true ? 'green' : 'blue'}}>{item.prise === true ? "en main"  :"En attente"}  {item.prise === true && <span>&#x1F44B;</span>} {item.prise ===true && <CheckCircleIcon className="ic"/>}</span></p>
      </div>
      </div>
      </div>

          <div className="contenu">
            <h1>{item.sujet}</h1>
            <p>Budget {item.budget ? <span>{item.budget} fcfa</span> : <span>non definit</span>}</p>
            <div className="contenu-commit">
             <p>{item.contenu}</p>
            </div>
            <NavLink className="commenter" to={`/offre/${item._id}`}>
              ({item.commentaires.length}) candidature(s)
            </NavLink>
          </div>
    
    </div>
  );
};

export default CardOffres;
