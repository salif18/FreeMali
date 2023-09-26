import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { MyStore } from "../context/myStore";
import axios from "axios";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const Profile = () => {
  const { isInLine, defaultImage,setProfil, profil, logout, token, userId } =
    useContext(MyStore);
  const navigate = useNavigate();
  const url = `http://localhost:3002/profils/admin`;
  const putUrl = `http://localhost:3002/profils/admin/update/${userId}`;
  const newPhotoUrl = `http://localhost:3002/profils/admin/photo/${userId}`;

  const Headers = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  
  const profiladmin = `http://localhost:3002/profils/admin/user/${userId}`
   //recuperation de profil
   useEffect(()=>{
    axios.get(profiladmin,Headers)
    .then((res)=> 
    setProfil(res.data))
    .catch((err)=>console.log(err))
 },[])  
  //creation de profil
  const [profile, setProfile] = useState({
    userId: "",
    photo: null,
    prenom: "",
    nom: "",
    numero: "",
    email: "",
  });

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, photo: file });
  };

  //envoi de formulaire
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("photo", profile.photo);
    formData.append("prenom", profile.prenom);
    formData.append("nom", profile.nom);
    formData.append("numero", profile.numero);
    formData.append("email", profile.email);
    try {
      const response = await axios.post(url, formData, Headers);
      if (response) {
        await response.data;
        navigate("/");
        setCreatProfil({
          userId: "",
          photo: null,
          prenom: "",
          nom: "",
          numero: "",
          email: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [profilUpdate, setProfilUpdate] = useState({
    userId: "",
    photo: null,
    prenom: "",
    nom: "",
    numero: "",
    email: "",
  });
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setProfilUpdate({ ...profilUpdate, [name]: value });
  };
  const handleChangeUpdatePhoto = (e) => {
    const file = e.target.files[0];
    setProfilUpdate({ ...profilUpdate, photo: file });
  };

  //envoi de formulaire
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("photo", profilUpdate.photo);
    formData.append("prenom", profilUpdate.prenom);
    formData.append("nom", profilUpdate.nom);
    formData.append("numero", profilUpdate.numero);
    formData.append("email", profilUpdate.email);
  
    try {
      const response = await axios.put(putUrl, formData, Headers);
      if (response) {
        await response.data;
        setProfilUpdate({
          userId: "",
          photo: null,
          prenom: "",
          nom: "",
          numero: "",
          email: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isProfil, setIsProfil] = useState(false);
  const [creatProfil, setCreatProfil] = useState(false);
  const [modifyImage, setModifyImage] = useState(false);
  const [photo, setPhoto] = useState("");

  const changeFile =(e)=>{
    const file = e.target.files[0];
    setPhoto(file)
  }

  const handlePutImage = (e) => {
   e.preventDefault()
    const formData = new FormData()
    formData.append('photo',photo)
    if (photo) {
      axios
        .put(newPhotoUrl, formData, Headers)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    } else {
      alert("Champs vide");
    }
    setModifyImage(!modifyImage);
  };
  
  return (
    <div className="profile">
      {!isInLine && <Navigate to="/login" replace={true} />}
      <div className="headerprofile">
        <div className="profileimage">
          <img src={profil ? profil.photo : defaultImage} alt="" />

          {!modifyImage && (
            <p onClick={() => setModifyImage(!modifyImage)}>
              Photo <AddAPhotoIcon />
            </p>
          )}
          {modifyImage && (
            <input
              type="file"
              name='photo'
              accept="image/*"
              onChange={changeFile}
              placeholder="Photo"
            />
          )}
          {
            modifyImage && 
            <>
              <p onClick={(e) => handlePutImage(e)}>Enregistrer</p>
              <p onClick={()=> setModifyImage(!modifyImage)}>Annuler</p>
            </>
          }
        </div>
        <div className="profileinfos">
          <h2>Informations Administrateur</h2>
          <p>
            Prenom: <span>{profil?.prenom}</span>
          </p>
          <p>
            Nom: <span>{profil?.nom}</span>
          </p>
          <p>
            Status: <span>Administrateur</span>
          </p>
          <p>
            Numero: <span>{profil?.numero}</span>
          </p>
          <p>
            Email: <span>{profil?.email}</span>
          </p>
        </div>
      </div>
      <div className="zone-btn">
        {!profil && (
          <p onClick={() => setCreatProfil(!creatProfil)}>Creer votre profil</p>
        )}
        <p onClick={() => setIsProfil(!isProfil)}> Modifier votre profil</p>
      </div>

      {!profil && (
        <div className="modifierProfile">
          <h2>Creer un profil</h2>

          <form className="form-profil">
            <div>
              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="file"
                  name="photo"
                  placeholder="Photo"
                  accept="image/*"
                  onChange={handleChangePhoto}
                />
              </div>

              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="text"
                  name="prenom"
                  placeholder="Prenom"
                  onChange={handleChange}
                  value={profile.prenom}
                />
              </div>

              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  onChange={handleChange}
                  value={profile.nom}
                />
              </div>
            </div>
            <div>
              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="number"
                  name="numero"
                  placeholder="Numero"
                  onChange={handleChange}
                  value={profile.numero}
                />
              </div>

              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={profile.email}
                />
              </div>

              <div>
                <button
                  className="create-btn"
                  onClick={handleSubmitCreate}
                  type="submit">
                  Creer profil
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {isProfil && (
        <div className="modifierProfile">
          <h2>Modification de profil</h2>

          <form className="form-profil">
            <div>
              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="file"
                  name="photo"
                  placeholder="Photo"
                  accept="image/*"
                  onChange={handleChangeUpdatePhoto}
                />
              </div>

              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="text"
                  name="prenom"
                  placeholder="Prenom"
                  onChange={handleChangeUpdate}
                  value={profilUpdate.prenom}
                />
              </div>

              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  onChange={handleChangeUpdate}
                  value={profilUpdate.nom}
                />
              </div>
            </div>
            <div>
              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="number"
                  name="numero"
                  placeholder="Numero"
                  onChange={handleChangeUpdate}
                  value={profilUpdate.numero}
                />
              </div>

              <div className="container-profil">
                <input
                  className="formprofil-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChangeUpdate}
                  value={profilUpdate.email}
                />
              </div>
              <div>
                <button
                  className="create-btn"
                  onClick={handleSubmitUpdate}
                  type="submit">
                  Modifier profil
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bt">
        <button className="logbtn" onClick={logout}>
          <PowerSettingsNewIcon style={{ fontSize: 20, margin: 5 }} /> Se
          deconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;
