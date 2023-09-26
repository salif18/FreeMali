import React, { useContext, useState } from "react";
// import data from '../data/EmpData';
import EmpCard from "../constants/card/Employers";
import NavbarSearch from "../constants/NavbarSearch";
import { MyStore } from "../context/myStore";
import MapsCarte from "../Maps/MapsCarte";

const Search = () => {
  const { valueSearch, users, myProfile, isLogin } = useContext(MyStore);

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Étape 1 : Calculer la distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const [LATITUDE, setLATITUDE] = useState("");
  const [LONGITUDE, setLONGITUDE] = useState("");

  // Étape 1 : Obtenir la position actuel de l'utilisateur
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLATITUDE(latitude);
      setLONGITUDE(longitude);
    });
  };

  // si l'utilisateur n'est pas connecter appel cette fonction pour obtenir la position actuel de lui
  !isLogin && getPosition();

  const prestataires = users.filter((presta) => presta.isPrestataire);

  // si user est connecter utilise son latitude ou
  const lat1 = myProfile ? myProfile.latitude : LATITUDE;
  const lng1 = myProfile ? myProfile.longitude : LONGITUDE;

  // filtrer les prestataire selon la distance calcule du plus proche au plus eloigne
  const filteredUsers = prestataires.sort((a,b)=>{
    const distanceA = calculateDistance(
      lat1,
      lng1,
      a.profile.latitude,
      a.profile.longitude
    );
    const distanceB = calculateDistance(
      lat1,
      lng1,
      b.profile.latitude,
      b.profile.longitude
    );
    // const maxDistance = 6; // Distance maximale en kilomètres

    return distanceA - distanceB;
  });
  
  // le resultat de la recherche
  const resultatSearch = filteredUsers.filter((x) =>
    x.profile.proffession.includes(valueSearch.toLowerCase())
  );

  return (
    <>
      <NavbarSearch />
      <div className="search">

        {valueSearch && (
          <div className='zone-map-infos'>
            <MapsCarte resultatSearch={resultatSearch} />
            {valueSearch && (
              <p className="search-p">
                ( {resultatSearch.length} ) profils trouves...
              </p>
            )}
          </div>
        )}
        
        <div className="container-result">
      
          {valueSearch &&
            resultatSearch.map((item) => (
              <div key={item._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <EmpCard item={item} />
                <p style={{ fontFamily: "Roboto", fontWeight: 600 }}>
                  {item.profile.address}
                  
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;
