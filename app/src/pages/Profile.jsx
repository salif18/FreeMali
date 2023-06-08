import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router';

// import data from '../data/EmpData'
import Navbar from '../constants/Navbar';
import Footer from '../constants/Footer';
import axios from 'axios';
import { MyStore } from '../context/myStore';
import MapsPrestataire from '../Maps/MapsPrestataire';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import {format} from 'timeago.js'

const Profile = () => {
    const navigate = useNavigate()
    const {userId,myProfile} = useContext(MyStore)
    const [item,setItem] = useState([])
    const [avis,setAvis]=useState([])
    const {id} = useParams()
    const [comments,setComments] = useState('')

    //recuperer le profile du prestataire selectionner
    useEffect(()=>{
        axios
            .get(`http://localhost:3002/profiles/yourProfile/${id}`)
            .then(res => {
                const {avis} =res.data
                setItem(res.data)
                setAvis(avis)
            }).catch(err => console.log(err))
    },[])

    //click pour donner un like
    const handleLike=()=>{
          axios.post(`http://localhost:3002/profiles/${id}/notations`,{userId:userId,likes:1})
          .then((res)=>res.data)
          .catch((err)=>console.log(err))
    }

    //click pour anuuler son jaime
const handlePlus =()=>{
    axios.post(`http://localhost:3002/profiles/${id}/notations`,{userId:userId,likes:0})
    .then((res)=>res.data)
    .catch((err)=>console.log(err))
}

    // click pour non jaime
    const handleDisLike =()=>{
        axios.post(`http://localhost:3002/profiles/${id}/notations`,{userId:userId,likes:-1})
        .then((res)=>res.data)
        .catch((err)=>console.log(err))
    }
    
    // ajouter des avis sur le prestataire
    const handleAvis=(avis)=>{
         avis ={
            userId:userId,
            prenom:myProfile.prenom,
            image:myProfile.photo,
            comments:comments,
        };
        axios.put(`http://localhost:3002/profiles/avis/${id}`,{avis})
        .then(res => res.data)
        .catch(err => console.log(err));
        setComments('')
    }

    // supprimer son avis sur le prestataire
    const handleDeleteCommit =(avi)=>{
        axios.put(`http://localhost:3002/profiles/delete/${id}/avis/${avi._id}`)
        .then(res => res.data)
        .catch(err => console.log(err))
      }

    return (
        <>
        <Navbar/>
        <div className='profile'>
        <div className='pr'>
        <h1>Profil de {item.nom} {item.prenom}</h1>
        </div>
        
            <div className='container-profiles'>

            <div className='cars-profile'>
            <div className='img-car'>
                <img className='card-img' src={item.photo}  alt=''/>
            </div>
             
              <div className='card-body'>
               <h1>Salut je suis {item.nom} {item.prenom}</h1>
               
               

               <div className='btn-avis'>
               <button className='btn-j' onClick={()=>handleLike()}>
               <FavoriteIcon style={{color:'rgb(13,179,221),marginRight:10'}} /> {(item.likes)} j'aime(s)</button>
               <button className='btn-jp' onClick={()=>handleDisLike()}>
               <HeartBrokenIcon style={{color:'#ff4040',marginRight:10}} />{(item.disLikes)} nul(s)</button>
               <button className='btn-nj' onClick={()=>handlePlus()} >
               <DoDisturbOnIcon style={{color:'blue',marginRight:10}} />annuler</button>
               </div>

              </div>
            </div>

            <div className='biograph'>
             <h2>A propos de moi</h2>
             <p>{item.biographie}</p>
             {userId !== item.userId && <button className='btn-contacter' onClick={()=>navigate(`/contacter/${item.userId}`)}>
               Contacter moi</button>
             }
            </div>

            <div className='details'>
             <h2>Des details</h2>
             <p>Nom: {item.nom}</p>
             <p>Prenom: {item.prenom}</p>
             <p>Proffession: {item.proffession}</p>
             <p>Address: </p><MapsPrestataire item={item} />
            </div>
            
            </div>
            <div className='les-notations'>
            <div className='header-avis'>
              <h1>Votre avis sur le prestataire</h1>
              
              <input
              className="input-avis"
              type="text"
              value={comments}
              onChange={(e)=>setComments(e.target.value)}
              placeholder="Ecris quelques choses sur ..."
            />
            <button className="btn-avis-input"
            onClick={()=>handleAvis()}
            >Critiquer</button>

            </div>

            <div className='avis'>
               <h1>Les avis</h1>
               {avis.map((avi)=>(
                <div className="commentaire-o" key={avi._id}>
                <div className="left-commit">
                  <img className="img-co" src={avi.image} alt='' />
                  <p>{avi.comments}</p>
                 </div>
  
                  <div className="rigth-commit">
                  <p>{format(avi.date)}</p>
                  <div className='grp-btn'>
                  {userId === avi.userId && <button className='btn-card-offre-del' onClick={()=>handleDeleteCommit(avi)}>x</button>}
                  
                  </div>
                  </div>
                </div>
               ))}
            </div>

            </div>
            <Footer/>
        </div>
        </>
    );
}

export default Profile;
// <div className='les-notes'>
//                <p>Votes <FavoriteIcon style={{color:'red'}} /> {(item.likes)} j'aime(s)</p>
//                <p>Votes <HeartBrokenIcon style={{color:'red'}} /> {(item.disLikes)} nul(s)</p>
//                </div>