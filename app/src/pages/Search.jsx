import React, { useContext, useState} from 'react';
// import data from '../data/EmpData';
import EmpCard from '../constants/card/Employers';
import NavbarSearch from '../constants/NavbarSearch';
import { MyStore } from '../context/myStore';
import MapsCarte from '../Maps/MapsCarte';
import GoogleMaps from '../Maps/GoogleMaps';


const Search = () => {
const {valueSearch,users,myProfile} = useContext(MyStore)


 function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Étape 1 : Calculer la distance
const calculateDistance=(lat1, lon1, lat2, lon2)=>{
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  
 
  
// Étape 1 : Obtenir la position de l'utilisateur actuel
// navigator.geolocation.getCurrentPosition((position)=>{
    // const {latitude,longitude}= position.coords

  
    
  // });
    
//   Cela vous donne une base pour filtrer les utilisateurs en fonction de leur position de géolocalisation la plus proche en utilisant React.js. Vous pouvez adapter ce code en
  


const prestataires = users.filter((presta)=> presta.isPrestataire )

  // Étape 4 : Utiliser les utilisateurs filtrés comme vous le souhaitez
  const filteredUsers = prestataires.filter(user => {
      const distance = calculateDistance(myProfile.latitude, myProfile.longitude, user.profile.latitude, user.profile.longitude);
      // const maxDistance = 6; // Distance maximale en kilomètres
      
      return distance 
    });
    console.log('les filtrer');
    console.log(filteredUsers);
  
    const resultatSearch = filteredUsers.filter((x) => x.profile.proffession.includes(valueSearch.toLowerCase()))
    
return (
        <>
       <NavbarSearch/>
        <div className='search'>
        {valueSearch && <p className='search-p'>( {resultatSearch.length} ) profils trouves...</p>}
             {valueSearch && <div><MapsCarte resultatSearch={resultatSearch} /></div>}
            <div className='container-result'>
             {valueSearch &&
                resultatSearch.map(item => (
                    <EmpCard item={item}/>
                ))
             }
            </div>
            
        </div>
       
        </>
    );
}

export default Search;
