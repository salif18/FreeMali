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

const getuserdata = () => {
  const data = localStorage.getItem("dataUser");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const getprofildata = () => {
  const data = localStorage.getItem("profile");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const getusers = () => {
  const data = localStorage.getItem("users");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const MyStoreProvider = (props) => {
  const [userId, setUserId] = useState(userIdStorage); //magasin de stock userId
  const [token, setToken] = useState(tokenStorage); //magasin de stock token
  const [myData, setMyData] = useState(getuserdata); //magasin de stock des donnees de l'utilisateur
  const me_User = myData[0];
  const [myProfileData, setMyProfileData] = useState(getprofildata); //magasin de stock du profile de utilisateur
  const myProfile = myProfileData[0];
  const [users, setUsers] = useState(getusers); //magasin de stock de tous les utilisateurs
  const [conversations, setConversations] = useState([]); //conversation stockage
  const [offres, setOffres] = useState([]); //stockage des offres
  const [newOffre, setNewOffre] = useState(0); //si un nouveau offre est recu
  const [newMessage, setNewMessage] = useState(0); //si un nouveau message est recu
  const [newNotification, setNewNotification] = useState(0);
  const [invite, setInvite] = useState(null);
  const [touched,setTouched] = useState(false)//l'etat de toucher sur icone
  const [isModalOpen, setIsModalOpen] = useState(false)//etat d'ouvertur de la fenetre modal
  const [message,setMessage] = useState([])
 const [currenChat, setCurrenChat] = useState(null); //maintenir les infos des deux chatters recus pour utiliser ce id dans les conversations
  //   connection
  const handleLogin = (userId, token) => {
    setUserId(userId);
    setToken(token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };

  //   recuperer mes donnees infos
  const getMyData = (data) => {
    setMyData(data);
    localStorage.setItem("dataUser", JSON.stringify(data));
  };

  //recuperer mon profile
  const getMyProfileData = (profile) => {
    setMyProfileData(profile);
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  //obtenir les users
  const getUsers = (user) => {
    setUsers(user);
    localStorage.setItem("users", JSON.stringify(user));
  };

  //recuperer les offres
  const getOffres = (data) => {
    setOffres(data);
    localStorage.setItem("offres", JSON.stringify(data));
  };
  //   se deconnecter
  const handleLogout = () => {
    setUserId(null);
    setToken(null);
    localStorage.clear();
  };

  //Etat de connection de utilisateur
  const isUserToConnect = !!token;

  // valeur de recherche
  const [valueSearch, setValueSearch] = useState("");
  const handleChange = (e) => {
    setValueSearch(e.target.value);
  };

  // notification
  const [notifications, setNotifications] = useState([]);

  //supprimer la notification
  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // onvir la fenetre modal
  const openModal=()=>{
    setIsModalOpen(true)
  }
  //fermer la fenetre modal
  const closeModal =()=>{
    setIsModalOpen(false)
  }

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&usqp=CAU";
  // context value
  const contextValue = {
    userId: userId,
    token: token,
    login: handleLogin,
    logout: handleLogout,
    me_User: me_User,
    myProfile: myProfile,
    getMyData: getMyData,
    getMyProfileData: getMyProfileData,
    isInLine: isUserToConnect,
    valueSearch: valueSearch,
    setValueSearch: setValueSearch,
    handleChange: handleChange,
    message:message,
    setMessage:setMessage,
    currenChat:currenChat,
    setCurrenChat:setCurrenChat,
    notifications: notifications,
    setNotifications:setNotifications,
    removeNotification: removeNotification,
    conversations: conversations,
    setConversations: setConversations,
    users: users,
    getUsers: getUsers,
    offres: offres,
    getOffres: getOffres,
    defaultImage: defaultImage,
    newOffre: newOffre,
    setNewOffre: setNewOffre,
    newMessage: newMessage,
    setNewMessage: setNewMessage,
    newNotification: newNotification,
    setNewNotification: setNewNotification,
    invite: invite,
    setInvite: setInvite,
    isModalOpen:isModalOpen,
    openModal:openModal,
    closeModal:closeModal,
    touched:touched,
    setTouched:setTouched
  };

  return (
    <MyStore.Provider value={contextValue}>{props.children}</MyStore.Provider>
  );
};
