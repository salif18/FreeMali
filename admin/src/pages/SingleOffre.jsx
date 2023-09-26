import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import { MyStore } from "../context/myStore";
import Commentaires from "../constants/cards/commentaires";

const SingleOffre = () => {
  const { isInLine, users, defaultImage, token } = useContext(MyStore)
  const [oneOffre, setOneOffre] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
 const navigate = useNavigate()
  const Headers = {
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const { id } = useParams();
  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/offres/${id}`,Headers);
        if (res) {
          const data = await res.data;
          const { commentaires } = res.data;
          
          setOneOffre(data);
          setCommentaires(commentaires);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getItem();
  }, []);

  

  const auteurs = users.filter(x => x._id === oneOffre.userId)
  const auteurImg = auteurs[0]
 
  return (
    <div className="singleOffre">
    {!isInLine && <Navigate to='/login' replace={true} />}
      <button className="btn-ba" onClick={()=>navigate('/offres')}>Retour aux offres</button>
      
      <div className="single-offre-header">
        <div className="rt">
        <h1>La demande</h1>
        <img src={auteurImg?.profile.photo} alt='' />
        </div>
        <p>{format(oneOffre.createdAt)}</p>
      </div>

      <div className="contenu-single-offre">
        <p>{oneOffre.contenu}</p>
      </div>

      <div className="single-commentaire">
        <h1>Employé</h1>
        
        {commentaires.filter((commit) => commit.accept === true).map((commit) => (
          <Commentaires
            commit={commit}
          />
        ))}
      </div>
    
      {/* <a href={`mailto:salifmoctarkonate@yahoo.fr`}>envoyer mail</a> */}
    </div>
  );
};

export default SingleOffre;
