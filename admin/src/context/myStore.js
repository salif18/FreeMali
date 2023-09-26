import { createContext, useState } from "react";

const defaultValue = {
  userId: "",
  token: null,
  isUserToConnect: false,
  login: () => {},
  logout: () => {},
};

export const MyStore = createContext(defaultValue);
const userIdStorage = localStorage.getItem("userId");
const tokenStorage = localStorage.getItem("token");


export const MyStoreProvider = (props) => {
  const [userId, setUserId] = useState(userIdStorage); //magasin de stock userId
  const [token, setToken] = useState(tokenStorage); //magasin de stock token
  const [couriers, setCouriers] = useState([])
  const [users, setUsers] = useState([]);
  const [offres, setOffres] = useState([]);
  const [clients, setClients] = useState([]);
  const [profil, setProfil]= useState({})
  const [profilCustomer,setProfilCustomer] = useState({})
  const [recomandation, setRecomandation] = useState([])
  //connection
  
  const handleLogin = (userId, token) => {  
    setUserId(userId);
    setToken(token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };

  //se deconnecter
  const handleLogout = () => {
    setUserId(null);
    setToken(null);
    localStorage.clear();
  };

  //Etat de connection de utilisateur
  const isUserToConnect = !!token;

  // notification
  const [notifications, setNotifications] = useState([]);
 
  // image par defsult
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&usqp=CAU";

    //url
    const domaineURI = 'http://localhost:3002';

    // context value
  const contextValue = {
    userId: userId,
    token: token,
    login: handleLogin,
    logout: handleLogout,
    isInLine: isUserToConnect,
    couriers:couriers,
    setCouriers:setCouriers,
    notifications: notifications,
    setNotifications:setNotifications,
    defaultImage: defaultImage,
    domaineURI:domaineURI,
    users:users,
    setUsers:setUsers,
    offres:offres,
    setOffres:setOffres,
    clients:clients,
    setClients:setClients,
    profil:profil,
    setProfil:setProfil,
    setProfilCustomer:setProfilCustomer,
    profilCustomer:profilCustomer,
    recomandation:recomandation,
    setRecomandation:setRecomandation

  };

  return (
    <MyStore.Provider value={contextValue}>{props.children}</MyStore.Provider>
  );
};
