import React, { useContext, useEffect } from 'react'
import Header from '../constants/home/Header'
import Navbar from '../constants/Navbar'
import Banner from '../constants/home/Banner'
import Card from '../constants/home/Card'
import logo1 from '../images/bussi.jpg'
import logo2 from '../images/client.png'
import logo3 from '../images/offre.png'
import Footer from '../constants/Footer'
import CommentCamarche from '../constants/home/CommentCamarche'
import Quelques from '../constants/home/Quelques'
import { MyStore } from '../context/myStore'
import axios from 'axios'

const Home = () => {
  const {getUsers, getMyData, getMyProfileData, userId, isInLine} = useContext(MyStore)
  const PROFILGET = `http://localhost:3002/profiles/${userId}`//url pour recuperer le profile de utilisateur connecter
  const urlGET = `http://localhost:3002/auth/users/${userId}`//url de recuperation des donnes de user apres etre connecter
  
  
  useEffect(()=>{
    const getUser =async()=>{
      axios
      .get(urlGET)
      .then((res)=>{
        res && getMyData(res.data)
         
      })
      .catch((err)=>{
        console.error(err)
      })
    }
    isInLine && getUser()
  },[])
  
  
// recuperation du profile de user 
useEffect(()=>{
  const getProfile =async()=>{
    axios
    .get(PROFILGET)
    .then((res)=>{
       res && getMyProfileData(res.data)
    })
    .catch((err)=>{
      console.error(err)
    })
  }
  isInLine && getProfile()
},[])


// recuperer tous les utilisateurs
useEffect(()=>{
    axios.get('http://localhost:3002/auth/utilisateur&Infos')
    .then((res)=>{
     res && getUsers(res.data)
    }).catch((Err)=>console.log(Err))
},[])


  // donnee des trois carte sur home
 const data = [
    {
      id:1,
      image:logo1,
      title:'Devenir potentielle prestataire',
      infos:'Pour etre employé',
      btntext:"S'inscrire",
      lien:'/sign-presta'
    },
    {
      id:2,
      image:logo2,
      title:'Devenir potentielle client',
      infos:'Pour poster vos differents services ',
      btntext:"S'inscrire",
      lien:'/sign-clients'
    },
    {
      id:3,
      image:logo3,
      title:'Les differentes offres',
      infos:'Ici se trouves les differentes demandes',
      btntext:'Découvrir',
      lien:'/offres'
    }

  ]
  return (
    <> 
     <Header/>
     <Navbar/>
    <div className='home-page'>
     <div className='container-home'>
     <Banner/>
    

     <div>
     <Quelques/>
     </div>
     
     <CommentCamarche/>
    
      <div className='section-home'>
     
       {
        data.map((item)=>(
          <Card item={item}  />
        ))
       }
     </div>

     <Footer/>
     </div>
    </div>
    </>
  )
}

export default Home