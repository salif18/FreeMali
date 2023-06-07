import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router';

// import data from '../data/EmpData'
import Navbar from '../constants/Navbar';
import Footer from '../constants/Footer';
import axios from 'axios';
import { MyStore } from '../context/myStore';
import MapsPrestataire from '../Maps/MapsPrestataire';


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
               <p></p>
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
            <Footer/>
        </div>
        </>
    );
}

export default Profile;
