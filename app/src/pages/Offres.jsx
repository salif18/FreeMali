import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../constants/Navbar';
import CardOffres from '../constants/card/Offres';
import { MyStore } from '../context/myStore';
import { Navigate,} from 'react-router';
import axios from 'axios'
import Footer from '../constants/Footer';

// url pour poster et recuperer tous les offres
const url = 'http://localhost:3002/offres'
const Offres = () => {
const {me_User,myProfile, isInLine, userId,offres,getOffres} = useContext(MyStore)
// const [offre,setOffre] =useState([])

// recuperation des offres du cotes server
useEffect(()=>{
    axios.get(url)
    .then(res => {
        res && getOffres(res.data)
    }).catch((err)=>console.log(err))
},[])

// valeur du champs input offre
const [recits,setRecits] = useState('')

// boutton pour poster un offre
const handlePost =()=>{
    const d = new Date()
    const offres ={
    userId:userId,
    nom:myProfile.nom,
    image:myProfile.photo,
    contenu:recits,
    commentaires:[],
    date:`${d.toLocaleDateString()} à ${d.toLocaleTimeString()}`
   };
   
    //envoie des offres vers le server
    axios.post(url,offres)
    .then((res)=>res.data)
    . catch((err)=>console.log(err));
    setRecits('')
}


    return (
        <>
        <Navbar/>
        <div className='offres'>
           {!isInLine && <Navigate to='/connecter' replace={true} />}
           
            {!me_User.isPrestataire &&
                <div className='container-offre'>
               <img className='img-offre' 
               src={myProfile.photo} alt=''/>
              <div className='cham-texta'>
               <h1>Rediger votre offre</h1>
               <textarea className='texta' value={recits} 
                 onChange={(e)=>setRecits(e.target.value)}
                 placeholder='Ecrit votre text...'
                >
                
               </textarea>
               <button className='btn-post-offre'
                onClick={(e)=>handlePost(e)}>
                Envoyer
               </button>
               
               </div>
              </div>  
            }
           <div className='offre-pulier'>
           {offres.length <= 0 && me_User.isPrestataire && <p className='textaucun'>" Aucun offre pour le moment "</p>}
           {offres.length <= 0 && !me_User.isPrestataire && <p className='textaucun'>" Aucun offre pour le moment "</p>}
            {offres.map((item)=>(
                <CardOffres item={item} />
            ))

            }
            </div>

        </div>
        </>
    );
}

export default Offres;
