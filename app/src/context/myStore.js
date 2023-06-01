import { createContext, useState } from "react";
// import offres from "../data/OffresData";

// const getOffre = () => {
//   const data = localStorage.getItem("offres");
//   if (data) {
//     return JSON.parse(data);
//   } else {
//     return [];
//   }
// };

const defaultValue = {
  userId: "",
  token: null,
  iSadminLogin: false,
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

export const MyStoreProvider = (props) => {
  const [userId, setUserId] = useState(userIdStorage);
  const [token, setToken] = useState(tokenStorage);
  const [myData, setMyData] = useState(getuserdata);
  const me_User = myData[0];
  const [myProfileData, setMyProfileData] = useState(getprofildata);
  const myProfile = myProfileData[0];
  const [prestataires,setPrestataires]=useState([])

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

//   se deconnecter
  const handleLogout = () => {
    setUserId(null);
    setToken(null);
    localStorage.clear();
  };

//   etat de connection de utilisateur
  const iSadminLogin = !!token;

  // les offres
//   const [offre, setOffre] = useState(getOffre);
//   useEffect(() => {
//     localStorage.setItem("offres", JSON.stringify(offre));
//   }, [offre]);

  // supprimer un offre
//   const delOffre = (id) => {
//     setOffre(offre.filter((x) => x.id !== id));
//   };

  // valeur de recherche
  const [valueSearch, setValueSearch] = useState("");
  const handleChange = (e) => {
    setValueSearch(e.target.value);
  };

//   // client
//   const client = {
//     userId_client: 1,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIVM5e8ISRJQukKAZcmEBN1cUf6ztd7ciFbA&usqp=CAU",
//     nom: "Salif M",
//     prenom: "Konate",
//     email: "salifmoctar@gmail.com",
//     numero: "78 30 32 08",
//     address: "https://goo.gl/maps/tgzewVJJP2EUk8wP7",
//   };

  // notification
  const [notifications, setNotifications] = useState([]);

  //ajouter de notification
  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  //supprimer de notification
  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  //conversation
  const [conversations, setConversations] = useState([]);

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
    isInLine: iSadminLogin,
    valueSearch: valueSearch,
    setValueSearch: setValueSearch,
    handleChange: handleChange,
    // offre: offre,
    // setOffre: setOffre,
    // delOffre: delOffre,
    // client: client,
    notifications: notifications,
    addNotification: addNotification,
    removeNotification: removeNotification,
    conversations: conversations,
    setConversations: setConversations,
    prestataires,setPrestataires
  };

  return (
    <MyStore.Provider value={contextValue}>{props.children}</MyStore.Provider>
  );
};
