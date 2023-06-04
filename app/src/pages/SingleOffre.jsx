import React, { useEffect, useState,useContext } from "react";
import { useParams, Navigate } from "react-router";
// import offres from '../data/OffresData';
import Navbar from "../constants/Navbar";
import { MyStore } from '../context/myStore';
import axios from "axios";
import {format} from 'timeago.js'

const SingleOffre = () => {
    const {userId,me_User,myProfile, isInLine} = useContext(MyStore)    
    
  const { id } = useParams();
  const [oneOffre, setOneOffre] = useState([])
const [comments, setComments] = useState([]);

 //contenu du commentaries
 const [newComents,setNewComents] =useState('')

useEffect(()=>{
    axios.get(`http://localhost:3002/offres/${id}`)//recuperer un offre
    .then(res => {
        const {commentaires}=res.data
        setOneOffre(res.data)
        setComments(commentaires)
    }).catch((err)=>console.log(err))
},[])


// ajouter des commentaires
const addCommentaires=(commentaires)=>{
    commentaires={userId:userId, nom:me_User.nom, image:myProfile.photo, comments:newComents};
    axios.put(`http://localhost:3002/offres/addComent/${id}`,{commentaires})
    .then(res => res.data)
    .catch((err)=>console.log(err));
    setNewComents('')
}
  
  
console.log(comments)
  return (
    <>
      <Navbar />
      {!isInLine && <Navigate to='/connecter' replace={true} />}
      <div className="singleoffre">
        <div className="single-offre-header">
          <h1>Service</h1>
          <p>{format(oneOffre.createdAt)}</p>
        </div>

        <div className="contenu-single-offre">
          <p>{oneOffre.contenu}</p>
          <div className="input-single">
            <input
              className="input-reponse"
              type="text"
              value={newComents}
              onChange={(e)=>setNewComents(e.target.value)}
              placeholder="Votre commentaire..."
            />
            <button className="btn-offre-reponse"
            onClick={(e)=>addCommentaires(e)}
            >Commenter</button>
          </div>
        </div>

        <div className="single-commentaire">
          <h1>Les commentaires</h1>
           {comments.map((commit)=>(
              <div className="commentaire-o" key={commit._id}>
                <img className="img-co" src={commit.image} alt='' />
                <p>{commit.comments}</p>
                <p>{format(commit.date)}</p>
                <div className='grp-btn'>
                {userId === commit.userId && <button className='btn-card-offre-del'>x</button>}
                 {!me_User.isPrestataire && <button className="btn-offre-contacter" >contacter</button>}
                </div>
              </div>
             ))}
        </div>
      </div>
    </>
  );
};

export default SingleOffre;
// {coment.map((commit)=>(
//   <div className="commentaire-o" key={commit._id}>
//     <img src={commit.image} alt='' />
//     <p>{commit.comments}</p>
//     <div>
//     <button className="sup">x</button>
//      <button className="btn-offre-contacter">contacter</button>
//     </div>
//   </div>
//  ))}