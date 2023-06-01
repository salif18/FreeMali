import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router";
// import offres from '../data/OffresData';
import Navbar from "../constants/Navbar";
import { MyStore } from '../context/myStore';
import axios from "axios";
import {format} from 'timeago.js'
const SingleOffre = () => {
    const {userId,me_User,myProfile} = useContext(MyStore)    
    const navigate = useNavigate();
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
},[id])


// ajouter des commentaires
const addCommentaires=(commentaires)=>{
    commentaires={userId:userId, nom:me_User.nom, image:myProfile.photo, comments:newComents};
    axios.put(`http://localhost:3002/offres/addComent/${id}`,{commentaires})
    .then(res => res.data)
    .catch((err)=>console.log(err));
    setNewComents('')
}
  // const item = offre[0]
  // const {offre,setOffre} = useContext(MyStore)
  // const {id} = useParams()
  // const data = offre.filter(x => x.id == id)

  // la date
  // const d = new Date()

//   repondre au commentaries
//   const [comentaire,setComentaire] =useState('')

  // bouton ajouter de commentaire

  //  const addcomment=()=>{
  // le champ commentaire de l'objet
  // const newComentaires={
  //     id:Date.now(),
  //     userId:2,
  //     nom:'Salimata',
  //     comment:comentaire,
  //     date:`${d.toLocaleDateString()} à ${d.toLocaleTimeString()}`
  // };
  //    mettre le commentaire  dans le tableau commentaire
  // item.commentaires.push(newComentaires);

  //mis a jour de offre avec des nouveau commentaires
  // setOffre([item])
  // setComentaire('')
  // }

  // const del =(id)=>{
  //     item.commentaires.filter(x => x.id !== id)
  // }
console.log(comments)
  return (
    <>
      <Navbar />
      <div className="singleoffre">
        <div className="single-offre-header">
          <h1>Projet</h1>
          <p>{format(oneOffre.createdAt)}</p>
        </div>

        <div className="contenu-single-offre">
          <h1>Titre </h1>
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
                <div>
                <button className="sup">x</button>
                 <button className="btn-offre-contacter" >contacter</button>
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