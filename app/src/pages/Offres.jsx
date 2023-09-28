import React, { useContext, useEffect, useState } from "react";
import Navbar from "../constants/Navbar";
import CardOffres from "../constants/card/Offres";
import { MyStore } from "../context/myStore";
import axios from "axios";
import { Navigate } from "react-router";
import {ClipLoader} from 'react-spinners';
import SidebarLeft from "../constants/blogs/SidebarLeft";




const Offres = () => {
  const {
    me_User,
    myProfile,
    defaultImage,
    userId,
    token,
    offres,
    getOffres,
    isInLine,
    users,
    setAdmin,
    admin,
    domaineURL
  } = useContext(MyStore);
const url = `${domaineURL}/offres`;
  //recuperer la photo dans le profile
  const { photo } = myProfile;

  //configuration de lentete
  const Headers = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  //recuperer donne de administrateur
  useEffect(() => {
    axios
      .get(`${domaineURL}/profils/admin`, Headers)
      .then((res) => setAdmin(res.data))
      .catch((err) => console.log(err));
  }, []);

  // valeur du champs input offre
  const [recits, setRecits] = useState("");
  const [category,setCategory] = useState('')
  const [budget, setBudget]= useState('')
  const [sujet, setSujet] =useState('')
  const [errorForm ,setErrorForm] = useState('');

  const adm = admin[0];

  
  // boutton pour envoyer la notification a un ensemble de groupe prestataire en un clic
  const sendNotifications = () => {
    //vers les prestataire selon leur categorie
    users
      .filter((x) => x.isPrestataire && x.profile.proffession === category)
      .map((x) =>
        axios
          .post(`${domaineURL}/notifications`, {
            senderId: userId,
            receiverId: x._id,
            type: "newoffre",
            description: "a poster une nouvelle offre concernant votre dommaine ne vous laissez pas perdre cette opportunité",
          })
          .then((res) => res.data)
          .catch((err) => console.log(err))
      );
      //vers admin
    axios
      .post(`${domaineURL}/notifications`, {
        adminId: adm?.userId,
        senderId: userId,
        type: "newoffre",
        description: "a poster une nouvelle offre",
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  // recuperation des offres du cotes server
  useEffect(() => {
    axios
      .get(url, Headers)
      .then((res) => {
        res && getOffres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // boutton pour poster un offre
  const handlePost = () => {
    if (recits.length > 0 && category.length > 0 &&  sujet.length > 0) {
      const offres = {
        userId: userId,
        contenu: recits,
        sujet:sujet,
        category:category,
        budget:parseInt(budget)
      };

      //envoie des offres vers le server
      axios
        .post(url, offres, Headers)
        .then((res) => res.data)
        .catch((err) => console.log(err));
         sendNotifications();
         setRecits("");
         setBudget('')
         setSujet('')
    } else {
      setErrorForm('Le champs est vide');
    }
  };

  const categories = [
    { value: "", label: "Categories" },
    { value: "electricien", label: "Electricien" },
    { value: "menuisier", label: "Menuisier" },
    { value: "mecanicien", label: "Mecanicien" },
    { value: "plombier", label: "Plombier" },
    { value: "maçon", label: "Maçon" },
    { value: "developpeur", label: "Developpeur" },
    { value: "informaticien", label: "Informaticien" },
    { value: "enseignant", label: "Enseignant" },
    { value: "proffesseur", label: "Proffesseur" },
    { value: "docteur", label: "Docteur" },
    { value: "sage femme", label: "Sage femme" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "agronomme", label: "Agronomme" },
    { value: "animateur", label: "Animateur" },
    { value: "dj", label: "Dj" },
  ];


  //filtrer les offre par recommandation categorie des user
  const recommandationOffre =()=>{
    const user = users.find((user) => user._id === userId)
    const {profile} = user
    const {proffession} = profile
    return offres.filter((element) => element.category.includes(proffession))
  }
  const offreRecommanded = recommandationOffre()
  
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
      {loading ? <div className='clip-card'>
      <ClipLoader  />
      <p>Chargement en  cours...</p>
    </div> 
 :
 <div className="offre-pages">
        <div className="offres">
       
     {/*afichage par condition*/}
        {
          (me_User && !me_User.isPrestataire) && 
          <div>
            <div className="container-offre">
              <img
                className="img-offre"
                src={myProfile ? photo : defaultImage}
                alt=""
              />
              <div className="cham-texta">
              <div>
                <input 
                  className="titre"
                  type="text" 
                  name='sujet' 
                  value={sujet} 
                  onChange={(e)=>setSujet(e.target.value)} 
                  placeholder={(errorForm && sujet.length <= 0 ) ? errorForm : "Titre:"}
                 />
                 
                <input
                  className="texta"
                  value={recits}
                  onChange={(e) => setRecits(e.target.value)}
                  placeholder={(errorForm && recits.length <= 0 ) ? errorForm :"Decrivez votre projet d'emploi..."}
                />
               
                </div>
               
              </div>
            </div>
             
            <div className="zone-saisie-offre">
            <div>
              <select
                name="proffession"
                id="proffesion"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="champs">
                {categories.map((categorie) => (
                  <option key={categorie.value} value={categorie.value}>
                    {categorie.label}
                  </option>
                ))}
              </select>
              {(errorForm && category.length <= 0) && <span style={{color:'red'}}>{errorForm}</span>}
              </div>
              <input
                type="number"
                name="budget"
                value={budget}
                onChange={(e)=>setBudget(e.target.value)}
                placeholder="Votre budget FCFA"
              />
            
              <button
              className="btn-post-offre"
              onClick={(e) => handlePost(e)}>
              Publier
            </button>
            </div>
          </div>
        }
         {/*zone d'affichage des offres*/}
        <div className="offre-pulier">
          {offres.length <= 0 && me_User && me_User.isPrestataire && (
            <p className="textaucun">" Aucun offre pour le moment "</p>
          )}
          {offres.length <= 0 && me_User && !me_User.isPrestataire && (
            <p className="textaucun">" Aucun offre pour le moment "</p>
          )}
          {offres.length <= 0 && !isInLine && (
            <p className="textaucun">" Aucun offre pour le moment "</p>
          )}
          {me_User && me_User.isPrestataire ?
            offreRecommanded.map((item) => (
              <CardOffres item={item} key={item._id} />
            )):
            offres.map((item) => (
            <CardOffres item={item} key={item._id} />
          ))
          }
        </div>
      </div>
      <div className="side">
      <SidebarLeft/>
      </div>
      </div>
      }
      
    </>
  );
};

export default Offres;