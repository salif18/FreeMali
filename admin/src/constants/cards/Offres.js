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
  const user = users.filter((user)=> user._id === item.userId);
    const auteur = user[0]

const reaction = item.commentaires;
  return (
    <div className="card-offre" key={item._id}>
      <div className="card-offre-body">
        <div className="container-img-card-offre">

          <div className="contenu">
          
            <div className="contenu-commit">
             <p>{item.contenu}</p> 
            </div>
             <div className='reaction'>
             <p>{reaction.length} candidature(s)</p>
            </div>
            
            </div>
        </div>
      </div>
      <div className="center">
       

        <div className="contenu">
          <h1>Date</h1>
          <p className="p2">{format(item.createdAt)}</p>
        </div>
       
      </div>
     
    </div>
  );
};

export default CardOffres;
