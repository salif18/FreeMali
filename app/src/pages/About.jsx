import React, { useEffect, useState } from 'react';
import Navbar from '../constants/Navbar'
import {ClipLoader} from 'react-spinners';
import CommentCamarche from '../constants/home/CommentCamarche';
import Footer from '../constants/Footer';


const About = () => {
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
        {
            loading ? <div className='clip-card'>
                       <ClipLoader  />
                       <p>Chargement en  cours...</p>
                      </div> 
                    :
        <main className='abouts'>
         <div className='baner-about'>
          <div className='titre'>
            <h1 >A propos de FreeMali</h1>
          </div>
         </div>
            
         <article className='article'>
    
          <h1>Introduction</h1>
          <p >La mise en relation des mains-d'œuvre et des clients est un processus clé dans de nombreux secteurs d'activité. Au Mali, la mise en relation de manière informelle est encore souvent réalisée, à travers le bouche-à-oreille ou des annonces sur les réseaux sociaux. Cependant, avec l'avènement des technologies de l'information et de la communication, les plateformes numériques de mise en relation ont pris une importance croissante.
           Nous avons également examiné les besoins et les demandes des utilisateurs et nous avons présenté les nouvelles tendances dans le domaine des plateformes de mise en relation.
          </p>
         

          <p >Le plateforme <strong>FreeMali</strong> a ete concu et adapté aux besoins et aux demandes des utilisateurs maliens. Les clients doivent être en mesure de fournir des commentaires pour aider les travailleurs indépendants à améliorer leurs services.</p>
          <hr></hr>
          <strong>FreeMali</strong>
          <p>Est une plateforme qui met en contact un prestataire d'un service a un client dans les besoins</p>
          <p>Les besoins dans les domaines telques :</p>
         
          <ul>
           <li>Plomberie</li>
           <li>Manconerie</li>
           <li>Menuiserie</li>
           <li>Mecanique</li>
           <li>Electricite</li>
           <li>Sante</li>
           <li>Education</li>
           <li>Informatique</li>
           <li>Programmation</li>
           <li>Agro busness</li>
          </ul>
         </article>
         <CommentCamarche/>
        </main>
       }
       <Footer/>
        </>
    );
}

export default About;
