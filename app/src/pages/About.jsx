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
           Nous avons également examiné les besoins et les demandes des utilisateurs et nous avons présenté <strong>FreeMali</strong> une nouvelle tendance dans le domaine des plateformes de mise en relation.
          </p>
         

          <strong>FreeMali</strong>
          <p >Le plateforme <strong>FreeMali</strong> est un repertoire des employes et espace des offres. Il a ete concu et adapté aux besoins et aux demandes des utilisateurs maliens.
          FreeMali est une plate-forme sous forme de repertoire des employes qui permet de mettre en relation des travailleurs indépendants avec des clients à la recherche de services variés. Que vous ayez besoin d'un plombier, d'un menuisier, d'un macon ou même d'un professeur particulier, FreeMali vous permet de trouver le professionnel idéal pour répondre à vos besoins.
          </p>
          <p><strong>FreeMali</strong> est aussi fait a l'image d'un petit reseau sociaux tres simple a utilise</p>
          <hr></hr>
          
          <strong>Fonctionnalités clés :</strong>
          <hr></hr>
          <p>
          <span>1. Profils de Professionnels :</span> <br/>Les travailleurs indépendants peuvent créer des profils détaillés, y compris leurs compétences, leurs tarifs et leurs évaluations par d'autres clients.
          </p>
          <p>
          <span>2. Recherche Avancée :</span><br/>Les utilisateurs peuvent rechercher des professionnels en fonction de critères spécifiques tels que la localisation, les categories de fonction.
          </p>
          <p>
          <span>3. Messagerie Instantanée :</span> <br/>Une fonction de messagerie intégrée permet aux clients de communiquer facilement avec les professionnels pour discuter des détails du service.
          </p>
          <p>
          <span>4. Paiement en Ligne :</span><br/> non intégré pour plus de confiance et eviter l'arnaque en ligne FreeMali propose un système de paiement sécurisé hors ligne entre client et prestataire par vu reel pour eviter les arnaques entre clients et professionnels.
          </p>
          <p><span>5. Évaluations et Commentaires :</span><br/> Les utilisateurs peuvent laisser des évaluations et des commentaires sur les professionnels avec lesquels ils ont travaillé, ce qui contribue à renforcer la confiance au sein de la communauté.
          </p>
          <p><span>6. Assistance Client :</span><br/> Une équipe d'assistance client est disponible pour répondre aux questions et résoudre les problèmes éventuels.
          </p>
          <p>Que vous ayez besoin d'un petit service ponctuel ou que vous recherchiez un professionnel pour un projet à plus long terme, <strong>FreeMali</strong> simplifie le processus de mise en relation pour vous aider à trouver la personne idéale pour chaque tâche.</p>
         </article>
         <CommentCamarche/>
        </main>
       }
       <Footer/>
        </>
    );
}

export default About;
