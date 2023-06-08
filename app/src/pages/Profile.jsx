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

const Profile = () => {
    const navigate = useNavigate()
    const {userId} = useContext(MyStore)
    const [item,setItem] = useState([])
    const {id} = useParams()
    console.log(id)

    useEffect(()=>{
        axios
            .get(`http://localhost:3002/profiles/yourProfile/${id}`)
            .then(res => {
                res && setItem(res.data)
            }).catch(err => console.log(err))
    },[])

    const handleLike=()=>{
          axios.post(`http://localhost:3002/profiles/${id}/notations`,{userId:userId,likes:1})
          .then((res)=>res.data)
          .catch((err)=>console.log(err))
    }

const handlePlus =()=>{
    axios.post(`http://localhost:3002/profiles/${id}/notations`,{userId:userId,likes:0})
    .then((res)=>res.data)
    .catch((err)=>console.log(err))
}

    const handleDisLike =()=>{
        axios.post(`http://localhost:3002/profiles/${id}/notations`,{userId:userId,likes:-1})
        .then((res)=>res.data)
        .catch((err)=>console.log(err))
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
               
               <div className='les-notes'>
               <p><FavoriteIcon style={{color:'red'}} /> {(item.likes)} j'aime(s)</p>
               </div>

               <div className='btn-avis'>
               <button className='btn-j' onClick={()=>handleLike()}>
               <FavoriteIcon style={{color:'rgb(13,179,221),marginRight:10'}} /> j'aime</button>
               <button className='btn-nj' onClick={()=>handlePlus()} >
               <HeartBrokenIcon style={{color:'red',marginRight:10}} />j'aime plus</button>
               <button className='btn-jp' onClick={()=>handleDisLike()}>
               <ThumbDownIcon style={{color:'blue',marginRight:10}} /> nul</button>
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
              <h1>Un mot sur le client</h1>
              
              <input
              className="input-avis"
              type="text"
              value=''
    
              placeholder="Ecris quelques choses sur ..."
            />
            <button className="btn-avis-input"
           
            >Critiquer</button>

            </div>

            <div className='avis'>
               <h1>Les avis</h1>
            </div>

            </div>
            <Footer/>
        </div>
        </>
    );
}

export default Profile;
