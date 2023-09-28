import React, { useContext, useEffect, useState } from "react";
import Navbar from "../constants/Navbar";
import Footer from '../constants/Footer';
import { MyStore } from "../context/myStore";
import axios from "axios";
import { useNavigate, Navigate,NavLink } from "react-router-dom";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditIcon from "@mui/icons-material/Edit";
import MapUser from "../Maps/MapUser";
import Nav from "../constants/Nav";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {ClipLoader} from 'react-spinners';

const Parametres = () => {
  const {
    getMyProfileData,
    isInLine,
    userId,
    token,
    setAdmin,
    admin,
    me_User,
    myProfile,
    defaultImage,
    domaineURL,
    logout
  } = useContext(MyStore);

 
  
  const navigate = useNavigate();
  //const regexNumber = /^\+?[1-9]\d{1,14}$/;
  const Headers = {
    headers: {
      "Content-type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  };

  
//spinner
const [loading,setloading]=useState(false)

useEffect(()=>{
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },1000)
},[])

  //API
  //url pour poster le profile
  const urlPOST = `${domaineURL}/profiles`;
  //url pour recuperer le profile de utilisateur connecter
  const urlGET = `${domaineURL}/profiles/myProfile/${userId}`;
  //url pour modifier le profile de utilisateru
  const urlPUT = `${domaineURL}/profiles/updateclient/${userId}`;
  //url pour modifier le profile par cham
  
  const [LONGITUDE, setLONGITUDE] = useState("");
  const [LATITUDE, setLATITUDE] = useState("");
  const [updateView, setUpdateView] = useState(false);
  const [messageValidation, setMessageValidation] = useState("");

  const getPosition = () => {
    //demander acces ala position local
    navigator.geolocation.getCurrentPosition((position) => {
      //recuperer la position local
      const { latitude, longitude } = position.coords;
      setLONGITUDE(longitude);
      setLATITUDE(latitude);
      //setClick(true);
    });
  };
  
  useEffect(()=>{
    axios.get(`${domaineURL}/profils/admin`)
    .then(res => setAdmin(res.data))
    .catch(err => console.log(err))
},[])

const adm = admin[0]

// model de notification
const notification = {
  adminId:adm?.userId,
  senderId:userId,
  description:'Nouvelle inscription',
  type:'inscription',
  offreId:userId
}

  // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    axios
     .post(`${domaineURL}/notifications`, notification )
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }


  // recuperation du profile de user
  useEffect(() => {
    const getProfile = async () => {
      axios
        .get(urlGET, Headers)
        .then((res) => {
          res && getMyProfileData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isInLine && getProfile();
  }, []);

  // PARTIE DE CREATION
  const [profil, setProfil] = useState({
    nom: "",
    prenom: "",
    photo: null,
    email: "",
    numero: "",
    address: "",
    proffession: "",
    categorie: "",
    biographie: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil({ ...profil, [name]: value });
  };

  const handleFileChange = (e) => {
    // Accédez au premier fichier sélectionné
    const file = e.target.files[0];
   
    // Stockez le fichier sélectionné dans l'état
    setProfil({ ...profil, photo: file });
    
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const longitude = LONGITUDE;
    const latitude = LATITUDE;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("photo", profil.photo);
    formData.append("nom", profil.nom);
    formData.append("prenom", profil.prenom);
    formData.append("email", profil.email);
    formData.append("numero", profil.numero);
    formData.append("address", profil.address);
    formData.append("categorie", profil.categorie);
    formData.append("proffession", profil.proffession);
    formData.append("biographie", profil.biographie);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    
    if (
      profil.photo.length > 0 ||
      profil.nom.length > 0 ||
      profil.prenom.length > 0 ||
      profil.email.length > 0 ||
      profil.numero.length > 0 ||
      profil.address.length > 0 ||
      profil.categorie.length > 0 ||
      profil.proffession.length > 0 ||
      profil.biographie.length > 0
    ) {
      try {
        const res = await axios.post(urlPOST, formData, Headers);
        if (res) {
          await res.data;
          navigate("/");
          setProfil({
            nom: "",
            prenom: "",
            photo: null,
            email: "",
            numero: "",
            address: "",
            proffession: "",
            categorie: "",
            biographie: "",
          });
        }
      } catch (e) {
        console.error(e);
      }
      sendNotifications()
    } else {
      setMessageValidation("Veuillez remplir tous les champs");
    }
  };

  //PARTIE DE MODIFICATION
  const [profilUpdate, setProfilUpdate] = useState({
    userId: "",
    nom: "",
    prenom: "",
    photo: null,
    email: "",
    numero: "",
    proffession: "",
    categorie: "",
    address: "",
    biographie: "",
  });

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setProfilUpdate({ ...profilUpdate, [name]: value });
  };

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    setProfilUpdate({ ...profilUpdate, photo: file });
  };
  //envoi de formulaire
  const handleSubmitPut = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("photo", profilUpdate.photo);
    formData.append("nom", profilUpdate.nom);
    formData.append("prenom", profilUpdate.prenom);
    formData.append("email", profilUpdate.email);
    formData.append("numero", profilUpdate.numero);
    formData.append("address", profilUpdate.address);
    formData.append("categorie", profilUpdate.categorie);
    formData.append("proffession", profilUpdate.proffession);
    formData.append("biographie", profilUpdate.biographie);
    console.log(formData)
    if (profilUpdate) {
      try {
        const res = await axios.put(urlPUT, formData, Headers);
        if (res) {
          await res.data;
          setProfilUpdate({
            userId: "",
            nom: "",
            prenom: "",
            photo: null,
            email: "",
            numero: "",
            proffession: "",
            categorie: "",
            address: "",
            biographie: "",
          })
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setMessageValidation("Champs vide");
    }
  };

  const proffesions = [
    { value: "", label: "Select-votre-proffession" },
    { value: "electricien", label: "Electricien" },
    { value: "menuisier", label: "Menuisier" },
    { value: "mecanicien", label: "Mecanicien" },
    { value: "plombier", label: "Plombier" },
    { value: "maçon", label: "Maçon" },
    { value: "developpeur", label: "Developpeur" },
    { value: "informaticien", label: "Informaticien" },
    { value: "enseignant", label: "Enseignant" },
    { value: "proffesseur", label: "Proffesseur" },
    { value: "docteur", label: "Docteur" },
    { value: "sage femme", label: "Sage femme" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "agronomme", label: "Agronomme" },
    { value: "animateur", label: "Animateur" },
    { value: "dj", label: "Dj" },
  ];

  const categories = [
    { value: "", label: "Choix de la categorie" },
    { value: "mains d'oeuvres", label: "Mains d'oeuvres" },
    { value: "educations", label: "Educations" },
    { value: "programmations", label: "Programmations" },
    { value: "informatiques", label: "Informatiques" },
    { value: "agropastorale", label: "Agropastorale" },
    { value: "animations", label: "Animations" },
    { value: "sante", label: "Sante" },
    { value: "juriste", label: "Juriste" },
    { value: "entreprenariat", label: "entreprenariat" },
  ];

  const [renderInput , setRenderInput] = useState(false)
  const [singlePhoto , setSinglePhoto] = useState('')

  const handleChangeFile = (e)=>{
    const file = e.target.files[0];
    setSinglePhoto(file)
  }

  const submitFile =(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo',singlePhoto)
    if(singlePhoto){
      axios.put(`${domaineURL}/profiles/${userId}/fieldPhoto`,formData,Headers)
      .then((res)=>res.data)
      .catch((err)=>console.log(err));
      setSinglePhoto('');
      setRenderInput(!renderInput)
    }else{
      alert('file vide')
    }
  }
 
  const deconecter =()=>{
    logout();
    navigate('/')
  }

  return (
    <>
      <Navbar />
      {
        loading ? <div className='clip-card'>
                     <ClipLoader  />
                     <p>Chargement en  cours...</p>
                   </div> 
                :
        <div className="parametre">
        <div className="header-para">
          {!isInLine && <Navigate to="/connecter" replace={true} />}
          <div className="img-para-container">
          <div className="img-single">
            <img
              className="img-param"
              src={myProfile ? myProfile?.photo : defaultImage}
              alt=""
            />
                  
               <label className='camera' htmlFor='photo' >
                  <AddAPhotoIcon onClick={()=>setRenderInput(!renderInput)}/>
               </label>
               <input id='photo' type="file" name='photo' accept="image/*" onChange={handleChangeFile}  />
              {
                renderInput &&
                  <>
                  <span onClick={(e)=>submitFile(e)}>Enregistrer</span>
                  <p onClick={()=> setRenderInput(!renderInput)}>Annuler</p>
                 </>
              }
              <div className="deco" onClick={()=>deconecter()}>
                  <PowerSettingsNewIcon className="icon-power" />
                  Déconnexion
                </div>
            </div>
            <div className="information">
              <h1>Informations personnelles</h1>
              <h2>
                Prenom <span>{myProfile && myProfile?.prenom}</span>
              </h2>
              <h2>
                Nom <span>{myProfile && myProfile?.nom}</span>
              </h2>
              <h2>
                Proffession{" "}
                <span>
                  {myProfile && myProfile?.proffession
                    ? myProfile?.proffession
                    : "Non defini"}
                </span>
              </h2>
              <h2>
                Address <span>{myProfile && myProfile?.address}</span>
              </h2>
              <h2>
                Numero <span>{myProfile && myProfile?.numero}</span>
              </h2>

              <p className="modif" onClick={() => setUpdateView(!updateView)}>
                Modifier votre profil <EditIcon />{" "}
              </p>
            
            </div>
          </div>
          <div className="lienposi">
            <MapUser />
          </div>
        </div>
        <Nav/>
        
        <div className="container-pro-parametre">
          {updateView && (
            <div className="pro">
              <>
                <h1 className="pro-h1">Modifier les informations</h1>

                <form className="form-para">
                  <div className="form-para-left">
                    <div className="container-field">
                    <label htmlFor='photoupdate' className="champs" ><AddAPhotoIcon/></label>
                      <input
                        id="photoupdate"
                        className="champs"
                        type="file"
                        accept="image/*"
                        name="photo"
                        placeholder="Photo"
                        onChange={handleChangePhoto}
                      />
                    </div>
                    <div className="container-field">
                      <input
                        className="champs"
                        type="text"
                        name="nom"
                        id="nom"
                        value={profilUpdate.nom}
                        onChange={handleChangeUpdate}
                        placeholder="Nom"
                      />
                      {profilUpdate.nom.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>

                    <div className="container-field">
                      <input
                        className="champs"
                        type="text"
                        name="prenom"
                        id="prenom"
                        value={profilUpdate.prenom}
                        onChange={handleChangeUpdate}
                        placeholder="Prenom"
                      />
                      {profilUpdate.prenom.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>

                    <div className="container-field">
                      <select
                        name="proffession"
                        value={profilUpdate.proffession}
                        onChange={handleChangeUpdate}
                        id="proffesion"
                        className="champs">
                        {proffesions.map((prof) => (
                          <option key={prof.value} value={prof.value}>
                            {prof.label}
                          </option>
                        ))}
                      </select>
                      {profilUpdate.proffession.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>

                    <div className="container-field">
                      <select
                        name="categorie"
                        value={profilUpdate.categorie}
                        onChange={handleChangeUpdate}
                        id="categorie"
                        className="champs">
                        {categories.map((catego) => (
                          <option key={catego.value} value={catego.value}>
                            {catego.label}
                          </option>
                        ))}
                      </select>
                      {profilUpdate.categorie.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-para-rigth">
                    <div className="container-field">
                      <input
                        className="champs"
                        type="email"
                        name="email"
                        id="email"
                        value={profilUpdate.email}
                        onChange={handleChangeUpdate}
                        placeholder={me_User.email}
                      />
                      {profilUpdate.email.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>

                    <div className="container-field">
                      <input
                        className="champs"
                        type="number"
                        name="numero"
                        id="numero"
                        value={profilUpdate.numero}
                        onChange={handleChangeUpdate}
                        placeholder={me_User.numero}
                      />
                      {profilUpdate.numero.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>

                    <div className="container-field">
                      <input
                        className="champs"
                        type="text"
                        name="biographie"
                        placeholder="biographie"
                        value={profilUpdate.biographie}
                        onChange={handleChangeUpdate}
                      />
                      {profilUpdate.biographie.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>
                    <div className="container-field">
                      <input
                        className="champs"
                        type="text"
                        name="address"
                        value={profilUpdate.address}
                        onChange={handleChangeUpdate}
                        placeholder="Address"
                      />
                      {profilUpdate.address.length <= 0 && (
                        <span className="error">{messageValidation}</span>
                      )}
                    </div>

                    <div>
                      <button className="signup-btn-para" type="submit" onClick={handleSubmitPut}>
                        
                        Modifier
                      </button>
                    </div>
                  </div>
                </form>
              </>
            </div>
          )}

          {!myProfile && (
            <div className="infos-pro">
              <h1 className="infos-h1">Creer votre profil pour valider votre inscription </h1>

              <div className="form-para">
                <div className="infos-pro-left">
                  <div className="container-field">
                  <label className='champs' htmlFor='fichier' ><AddAPhotoIcon/></label>
                    <input
                    id='fichier'
                    className="champs"
                    type="file"
                    accept="image/*"
                    name="photo"
                    placeholder="Photo"
                    onChange={handleFileChange}
                    />
                  </div>
                  <div className="container-field">
                    <input
                      className="champs"
                      type="text"
                      name="nom"
                      value={profil.nom}
                      id="nom"
                      placeholder="Nom"
                      onChange={handleChange}
                    />
                    {profil.nom.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>

                  <div className="container-field">
                    <input
                      className="champs"
                      type="text"
                      name="prenom"
                      value={profil.prenom}
                      onChange={handleChange}
                      id="prenom"
                      placeholder="Prenom"
                    />
                    {profil.prenom.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>

                  <div className="container-field">
                    <select
                      name="proffession"
                      id="proffesion"
                      value={profil.proffession}
                      onChange={handleChange}
                      className="champs">
                      {proffesions.map((prof) => (
                        <option key={prof.value} value={prof.value}>
                          {prof.label}
                        </option>
                      ))}
                    </select>
                    {profil.proffession.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>

                  <div className="container-field">
                    <select
                      name="categorie"
                      id="categorie"
                      value={profil.categorie}
                      onChange={handleChange}
                      className="champs">
                      {categories.map((catego) => (
                        <option key={catego.value} value={catego.value}>
                          {catego.label}
                        </option>
                      ))}
                    </select>
                    {profil.categorie.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>
                </div>

                <div className="infos-pro-right">
                  <div className="container-field">
                    <input
                      className="champs"
                      type="email"
                      name="email"
                      value={profil.email}
                      onChange={handleChange}
                      id="email"
                      placeholder="Email"
                    />
                    {profil.email.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>
                  <div className="container-field">
                    <input
                      className="champs"
                      type="number"
                      name="numero"
                      value={profil.numero}
                      onChange={handleChange}
                      id="numero"
                      placeholder="Numero de telephone"
                    />
                    {profil.numero.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>
                  <div className="container-field">
                    {(!LATITUDE && !LONGITUDE) ? (
                      <button
                        className="maps-btn-ins"
                        onClick={() => getPosition()}>
                        <LocationSearchingIcon
                          style={{ marginRight: 10, fontSize: 20 }}
                        />
                        Envoyer nous votre position actuelle
                      </button>
                    ) : (
                      <p style={{ fontFamily: "Roboto" }}>
                        <GpsFixedIcon
                          style={{ color: "green", marginRight: 10 }}
                        />{" "}
                        Position active
                        <DoneAllIcon
                          style={{ color: "green", marginLeft: 10 }}
                        />
                      </p>
                    )}
                  </div>

                  <div className="container-field">
                    <input
                      className="champs"
                      type="text"
                      name="address"
                      value={profil.address}
                      onChange={handleChange}
                      placeholder="Ville/Quartier"
                    />
                    {profil.address.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>

                  <div className="container-field">
                    <input
                      className="champs"
                      as="textarea"
                      rows="4" // Nombre de lignes du textarea
                      cols="50" // Nombre de colonnes du textarea
                      name="biographie"
                      value={profil.biographie}
                      onChange={handleChange}
                      placeholder="Biographie"
                    />
                    {profil.biographie.length <= 0 && (
                      <span className="error">{messageValidation}</span>
                    )}
                  </div>

                  <div className="container-field">
                    <button
                      className="signup-btn-para"
                      onClick={handleSubmitCreate}>
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      }
      <Footer />
    </>
  );
};

export default Parametres;
