import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import Navbar from "../constants/Navbar";
import { MyStore } from "../context/myStore";
import axios from "axios";
import { format } from "timeago.js";
import Commentaires from "../constants/card/commentaires";
import {ClipLoader} from 'react-spinners';
import Footer from "../constants/Footer";

const SingleOffre = () => {
  const { userId, me_User, admin, setAdmin, token,domaineURL, users, defaultImage, isInLine } = useContext(MyStore);
  const navigate = useNavigate();
  const { id } = useParams();
  const [oneOffre, setOneOffre] = useState([]);
  const [comments, setComments] = useState([]);
 
//recuperer les donnees de admin
  useEffect(()=>{
    axios.get(`${domaineURL}/profils/admin`,Headers)
    .then(res => setAdmin(res.data))
    .catch(err => console.log(err))
},[])

  //contenu du commentaries
  const [newComents, setNewComents] = useState("");
  const [budget,setBudget] = useState('');
  const [errorForm ,setErrorForm] = useState('')

  //configuration de l'entete de requete
  const Headers = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  //recuperer un offre choisie
  useEffect(() => {
    axios
      .get(`${domaineURL}/offres/${id}`,Headers) 
      .then((res) => {
        const { commentaires } = res.data;
        setOneOffre(res.data);
        setComments(commentaires);
      })
      .catch((err) => console.log(err));
  }, []);


  // model de notification
  const notification ={
    senderId:userId,
    receiverId:oneOffre.userId,
    type:"commitOffre",
    offreId:oneOffre._id,
    description:'a reagis à votre offre',
  }

  const adm = admin[0]

  // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    //envoie de notification aux prestataires
    axios
     .post(`${domaineURL}/notifications`, notification,Headers)
     .then((res) => res.data)
     .catch((err) => console.log(err));
    //envoie a admin
     axios
     .post(`${domaineURL}/notifications`,{
      adminId:adm?.userId,
      senderId:userId,
      description:'a reagis a un offre',
      offreId:oneOffre._id,
      type:"commitOffre",
     })
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }

  // ajouter des commentaires
  const addCommentaires = (commentaires) => {
    if(newComents.length > 0 && budget.length > 0){
    commentaires = { userId: userId, comments: newComents, budgetOffre:parseInt(budget) };
    axios
      .put(`${domaineURL}/offres/addComent/${id}`, { commentaires },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setNewComents("");
    setBudget('');
    sendNotifications()
  }else{
    setErrorForm('Ce champs est obligatoire')
  }
  };

  //button pour contacter
  const contactDonneur = () => {
    axios
      .post(`${domaineURL}/chat`, {
        senderId: userId,
        receiverId: oneOffre.userId,
      },Headers)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    navigate("/messagerie");
  };

  //recuperer le profile de l'auteur de l'offre
  const auteurs = users.filter(x => x._id === oneOffre.userId)
  const auteurImg = auteurs[0]

  //vider la variable errorForm apres un temps donne
  errorForm  &&  setTimeout(() => { setErrorForm('')},2800);
//spinner
const [loading,setloading]=useState(false)

useEffect(()=>{
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },1000)
},[])

  return (
    <>
      <Navbar />
      {!isInLine && <Navigate to="/connecter" replace={true} />}
      
      {
        loading ? <div className='clip-card'>
                     <ClipLoader  />
                     <p>Chargement en  cours...</p>
                   </div> 
                :
        <main className="singleoffre">
        

        <div className="contenu-single-offre">
        {/*entete de la carte offre*/}
        <div className="rt">
          <h1>La demande</h1>
          <p>{format(oneOffre.createdAt)}</p>
          </div>

          <img src={auteurImg? auteurImg.profile.photo :defaultImage} alt='' />
          <p>{oneOffre.contenu}</p>
          {/*affichage sous condition*/}
          {
            me_User?.isPrestataire && (
            <button
              className="contacter-offre"
              onClick={() => contactDonneur()}>
              Contacter l'auteur
            </button>
          )}
          {
            (oneOffre.prise !== true && me_User.isPrestataire) && 
             <div className="input-single">
           
            <div>
            <div style={{display:"flex",flexDirection:'column'}}>
            <input
              className="input-reponse"
              type="text"
              value={newComents}
              onChange={(e) => setNewComents(e.target.value)}
              placeholder="Proposez votre candidature...."
            />
            {(errorForm && newComents.length <= 0) && <span style={{color:'red'}}>{errorForm}</span>}
            </div>
            <div style={{display:"flex",flexDirection:'column'}}>
            <input 
               className="montant"
               type="number" 
               name='budget' 
               value={budget} 
               onChange={(e)=>setBudget(e.target.value)} 
               placeholder="Votre montant...Fcfa" 
               />
               {(errorForm && budget.length <= 0) && <span style={{color:'red'}}>{errorForm}</span>}
            </div>
            </div>

            <button
              className="btn-offre-reponse"
              onClick={(e) => addCommentaires(e)}>
              Proposer votre offre
            </button>
            
          </div>
        }
        </div>

        {/*Zone d'affichage des candidatures*/}
        <div className="single-commentaire">
        <h1>Les propositions</h1>
        {
          comments.length <= 0 && (
          <p style={{ marginLeft: 20, color: "#aaa", fontSize: 14 }}>
            "Aucunes propositions"
          </p>
        )}

        {/*les candidatures*/}
        {comments.map((commit) => (
          <Commentaires
            commit={commit}
            oneOffre={oneOffre}
            offreId={id}
            offreUserId={oneOffre.userId}
            key={commit._id}
          />
        ))}
      </div>

      </main>
    }
    <Footer/>
    </>
  );
};

export default SingleOffre;
