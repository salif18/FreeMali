// Pour filtrer les utilisateurs en fonction de leur position de géolocalisation la plus proche en React.js, vous pouvez suivre les étapes suivantes :

// 1. Obtenir la position géographique de l'utilisateur actuel en utilisant le navigateur web. Vous pouvez utiliser l'API de géolocalisation HTML5 pour cela. Voici un exemple de code pour obtenir la position :


navigator.geolocation.getCurrentPosition(function(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // Utilisez les coordonnées de latitude et de longitude
  // pour filtrer les utilisateurs les plus proches
});


// 2. Disposer des données des utilisateurs avec leurs positions géographiques. Vous pouvez stocker ces données dans un tableau ou les obtenir à partir d'une API.

// 3. Calculer la distance entre la position de l'utilisateur actuel et les positions des autres utilisateurs. Vous pouvez utiliser la formule de la distance entre deux points géographiques, comme la distance euclidienne ou la formule de la distance de Haversine pour une mesure plus précise. Voici un exemple utilisant la formule de la distance de Haversine :


function calculateDistance(lat1, lon1, lat2, lon2) {
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

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}


// 4. Filtrer les utilisateurs en utilisant la distance calculée. Vous pouvez itérer sur le tableau des utilisateurs et comparer la distance entre chaque utilisateur et la position de l'utilisateur actuel. Vous pouvez définir une distance maximale pour filtrer uniquement les utilisateurs à une certaine distance de l'utilisateur actuel.

// Voici un exemple de code qui illustre ces étapes :

// Étape 1 : Obtenir la position de l'utilisateur actuel
navigator.geolocation.getCurrentPosition(function(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  // Étape 2 : Données des utilisateurs
  const users = [
    { name: 'Utilisateur 1', latitude: 12.345, longitude: 67.890 },
    { name: 'Utilisateur 2', latitude: 34.567, longitude: 12.345 },
    // ...
  ];

  // Étape 3 : Calculer la distance
  const filteredUsers = users.filter(user => {
    const distance = calculateDistance(latitude, longitude, user.latitude, user.longitude);
    const maxDistance = 10; // Distance maximale en kilomètres
    return distance <= maxDistance;
  });

  // Étape 4 : Utiliser les utilisateurs filtrés comme vous le souhaitez
  console.log(filteredUsers);
});

// Cela vous donne une base pour filtrer les utilisateurs en fonction de leur position de géolocalisation la plus proche en utilisant React.js. Vous pouvez adapter ce code en