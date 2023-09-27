import React, { useEffect, useState } from 'react';
import Navbar from '../constants/Navbar';
import Footer from '../constants/Footer'
import { useNavigate } from 'react-router';
import {ClipLoader} from 'react-spinners';

const Confidentialite = () => {
    const navigate = useNavigate()

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
        <Navbar/>
        {loading ? <div className='clip-card'>
                     <ClipLoader  />
                     <p>Chargement en  cours...</p>
                   </div> 
                :
            <main className='confidentialite'>
            <div className='baner-confidentialite'>
            <div className='titre'>
             <h1>Politique de confidentialité</h1>
            </div>
            </div>

            <strong className='date'>27 Septembre 2023</strong>
            <div className='contenu'>
             <section className='left'>
              
              <p>Votre vie privée nous tient à coeur à FreeMali. Cette déclaration de confidentialité fournit des détails sur les informations personnelles que FreeMali collecte, et sur la manière dont FreeMali les utilise.</p>

              <h1 className='les-titre'>
              <strong>VOS INFORMATIONS PERSONNELLES COLLECTEES</strong><hr></hr></h1>
              <p>FreeMali collecte les informations personnelles suivants à travers un formulaire d'adhésion sur le site:</p>
             <ul className='listes'>
             <li>Nom</li>
             <li>Prénom</li>
             <li>Email</li>
             <li>Numéros de téléphones</li>
             <li>Adresse</li>
             <li>Geolocalisation</li>
             <li>Expériences professionnelles</li>
    
             </ul>
             </section>
             <section className='rigth'>
             <h1 className='les-titre'>
             <strong>UTILISATION D'INFORMATIONS PERSONNELLES</strong><hr></hr></h1>
             <p>FreeMali collecte les informations personnelles dans le but de :</p>
             <ul className='listes'>
              <li>Notifier par email et sms les candidats sur les offres d'emplois disponibles</li>
              <li>De proposer des informations et des offres publicitaires aux candidats</li>
             </ul>
             <p>Les candidats ont la possibilité en tout moment d'accéder à leurs informations ou encore de les supprimer. Cette procédure se fait manuellement pour le moment en nous contactant par email ou par téléphone.</p>
             </section>
            </div>
            <div className='ft'>
            <p className='plus-questions'>Pour toutes questions, veuillez nous contacter à <span onClick={()=>navigate('/contacts')}>ici...</span></p>
           </div>
        </main>
        }
        <Footer/>
        </>
    );
}

export default Confidentialite;
