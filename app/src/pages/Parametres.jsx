import React, { useContext, useEffect, useState } from "react";
import Navbar from "../constants/Navbar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Footer from "../constants/Footer";
import { MyStore } from "../context/myStore";
import axios from "axios";
import { useNavigate, Navigate } from "react-router";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditIcon from "@mui/icons-material/Edit";
import MapUser from "../Maps/MapUser";

const Parametres = () => {
  const {
    getMyProfileData,
    isInLine,
    userId,
    me_User,
    myProfile,
    defaultImage,
    token
  } = useContext(MyStore);
  const navigate = useNavigate();
  //const regexNumber = /^\+?[1-9]\d{1,14}$/;

  const Headers = {
    headers:{
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
   }
   console.log(userId)
   console.log(token)
  //API
  //url pour poster le profile
  const urlPOST = "http://localhost:3002/profiles";
  //url pour recuperer le profile de utilisateur connecter
  const urlGET = `http://localhost:3002/profiles/myProfile/${userId}`;
  //url pour modifier le profile de utilisateru
  const urlPUT = `http://localhost:3002/profiles/${userId}`;
  //url pour modifier le profile par cham
  const urlPUTField = `http://localhost:3002/profiles/${userId}/forField`;

  const [click, setClick] = useState(false);
  const [LONGITUDE, setLONGITUDE] = useState("");
  const [LATITUDE, setLATITUDE] = useState("");
  const [updateView, setUpdateView] = useState(false);

  const getPosition = () => {
    //demander acces ala position local
    navigator.geolocation.getCurrentPosition((position) => {
      //recuperer la position local
      const { latitude, longitude } = position.coords;
      setLONGITUDE(longitude);
      setLATITUDE(latitude);
      setClick(true);
    });
  };

  // recuperation du profile de user
  useEffect(() => {
    const getProfile = async () => {
      axios
        .get(urlGET)
        .then((res) => {
          res && getMyProfileData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isInLine && getProfile();
  }, []);

  // validation des champs de formulaire de modifcation profile
  const validation1 = yup.object({});

  const initialValue1 = {
    userId: "",
    nom: "",
    prenom: "",
    photo:"",
    email: "",
    numero: "",
    proffession: "",
    categorie: "",
    address: "",
    biographie: "",
  };

  const formSubmission = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("user registered");
      }, 2000);
    });
  };

  //envoi de formulaire
  const handleSubmit1 = async (values, onSubmittingProps) => {
    try {
      const formData = new FormData()
      formData.append('photo',values.photo)
      const res = await axios.put(urlPUTField, { ...formData },{Headers});
      if (res) {
        await res.data;
        await formSubmission(formData);
        onSubmittingProps.resetForm();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const validation2 = yup.object({
    nom: yup.string().required("Veuillez entrer votre nom"),
    prenom: yup.string().required("Veuillez entrer votre prenom"),
    address: yup.string().required("Veuillez choisir votre address"),
    email: yup.string().required("Veuillez entrer un email operationnel"),
    numero: yup.number().required("Veuillez entrer un numero joingnable"),
    biographie: yup.string().required("Veuillez ecrire sur a propos de vous"),
  }); 
 
  const initialValue2 = {
    nom: "", 
    prenom: "",
    photo:"",
    email: "",
    numero: "",
    address: "",
    proffession: "",
    categorie: "",
    biographie: "",
  };

  const formSubmission2 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("user registered");
      }, 2000);
    });
  };

 
  //envoi de formulaire onSubmittingProps,
  const handleSubmit2 = async (formData,{resetForm}) => {
    try {
      const longitude = LONGITUDE;
      const latitude = LATITUDE;
      
      const res = await axios.post(urlPOST,{
        ...formData,
        userId, 
        longitude, 
        latitude 
      }, Headers);

      if (res) {
        await res.data;
        navigate("/");

        // await formSubmission2(formData);
        // onSubmittingProps.
        resetForm();
      }
    } catch (e) {
      console.error(e);
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

  return (
    <>
      <Navbar />
      <div className="parametre">
        <div className="header-para">
          {!isInLine && <Navigate to="/connecter" replace={true} />}
          <div className="img-para-container">
            <img
              className="img-param"
              src={myProfile ? myProfile?.photo : defaultImage}
              alt=""
            />
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

        <div className="container-pro-parametre">
          {updateView && (
            <div className="pro">
              <>
                <h1 className="pro-h1">Modifier les informations</h1>
                <Formik
                  initialValues={initialValue1}
                  validationSchema={validation1}
                  onSubmit={handleSubmit1}>
                  {(formik) => (
                    <Form className="form-para">
                      <div className="form-para-left">
                        <div className="container-field">
                          <Field
                            className="champs"
                            type="file"
                            name="photo"
                            placeholder="Photo"
                          />
                        </div>
                        <div className="container-field">
                          <Field
                            className="champs"
                            type="text"
                            name="nom"
                            id="nom"
                            placeholder="Nom"
                          />
                          <ErrorMessage
                            className="text-danger"
                            name="nom"
                            component="span"
                          />
                        </div>

                        <div className="container-field">
                          <Field
                            className="champs"
                            type="text"
                            name="prenom"
                            id="prenom"
                            placeholder="Prenom"
                          />
                          <ErrorMessage
                            className="text-danger"
                            name="prenom"
                            component="span"
                          />
                        </div>

                        <div className="container-field">
                          <Field
                            name="proffession"
                            id="proffesion"
                            className="champs">
                            {({ field }) => (
                              <>
                                <select {...field} className="champs">
                                  {proffesions.map((prof) => (
                                    <option key={prof.value} value={prof.value}>
                                      {prof.label}
                                    </option>
                                  ))}
                                </select>
                                <ErrorMessage
                                  className="text-danger"
                                  name="proffession"
                                  component="span"
                                />
                              </>
                            )}
                          </Field>
                        </div>

                        <div className="container-field">
                          <Field
                            name="categorie"
                            id="categorie"
                            className="champs">
                            {({ field }) => (
                              <>
                                <select {...field} className="champs">
                                  {categories.map((catego) => (
                                    <option
                                      key={catego.value}
                                      value={catego.value}>
                                      {catego.label}
                                    </option>
                                  ))}
                                </select>
                                <ErrorMessage
                                  className="text-danger"
                                  name="categorie"
                                  component="span"
                                />
                              </>
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className="form-para-rigth">
                        <div className="container-field">
                          <Field
                            className="champs"
                            type="email"
                            name="email"
                            id="email"
                            placeholder={me_User?.email}
                          />
                          <ErrorMessage
                            className="text-danger"
                            name="email"
                            component="span"
                          />
                        </div>

                        <div className="container-field">
                          <Field
                            className="champs"
                            type="number"
                            name="numero"
                            id="numero"
                            placeholder={me_User?.numero}
                          />
                          <ErrorMessage
                            className="text-danger"
                            name="numero"
                            component="span"
                          />
                        </div>

                        <div className="container-field">
                          <Field
                            className="champs"
                            type="text"
                            name="biographie"
                            placeholder="biographie"
                          />
                        </div>
                        <div className="container-field">
                          <Field
                            className="champs"
                            type="text"
                            name="address"
                            placeholder="Address"
                          />
                          <ErrorMessage
                            className="text-danger"
                            name="address"
                            component="span"
                          />
                        </div>

                        <div>
                          <button
                            className="signup-btn-para"
                            disabled={!formik.isValid || formik.isSubmitting}
                            type="submit">
                            Modifier
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            </div>
          )}

          {!myProfile && (
            <div className="infos-pro">
              <h1 className="infos-h1">Creer votre profil </h1>

              <Formik
                initialValues={initialValue2}
                validationSchema={validation2}
                onSubmit={handleSubmit2}>
                {(formik) => (
                  <Form className="form-para">
                    <div className="infos-pro-left">
                      <div className="container-field">
                        <Field
                          className="champs"
                          type="file"
                          name="photo"
                          placeholder="Photo"
                        />
                      </div>
                      <div className="container-field">
                        <Field
                          className="champs"
                          type="text"
                          name="nom"
                          id="nom"
                          placeholder="Nom"
                        />
                        <ErrorMessage
                          className="text-danger"
                          name="nom"
                          component="span"
                        />
                      </div>

                      <div className="container-field">
                        <Field
                          className="champs"
                          type="text"
                          name="prenom"
                          id="prenom"
                          placeholder="Prenom"
                        />
                        <ErrorMessage
                          className="text-danger"
                          name="prenom"
                          component="span"
                        />
                      </div>

                      <div className="container-field">
                        <Field
                          name="proffession"
                          id="proffesion"
                          className="champs">
                          {({ field }) => (
                            <>
                              <select {...field} className="champs">
                                {proffesions.map((prof) => (
                                  <option key={prof.value} value={prof.value}>
                                    {prof.label}
                                  </option>
                                ))}
                              </select>
                              <ErrorMessage
                                className="text-danger"
                                name="proffession"
                                component="span"
                              />
                            </>
                          )}
                        </Field>
                      </div>

                      <div className="container-field">
                        <Field name="categorie" id="categorie">
                          {({ field }) => (
                            <>
                              <select {...field} className="champs">
                                {categories.map((catego) => (
                                  <option
                                    key={catego.value}
                                    value={catego.value}>
                                    {catego.label}
                                  </option>
                                ))}
                              </select>
                              <ErrorMessage
                                className="text-danger"
                                name="categorie"
                                component="span"
                              />
                            </>
                          )}
                        </Field>
                      </div>
                    </div>

                    <div className="infos-pro-right">
                      <div className="container-field">
                        <Field
                          className="champs"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          className="text-danger"
                          name="email"
                          component="span"
                        />
                      </div>
                      <div className="container-field">
                        <Field
                          className="champs"
                          type="number"
                          name="numero"
                          id="numero"
                          placeholder="Numero de telephone"
                        />
                        <ErrorMessage
                          className="text-danger"
                          name="numero"
                          component="span"
                        />
                      </div>

                      <div className="container-field">
                        {!click ? (
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
                        <Field
                          className="champs"
                          type="text"
                          name="address"
                          placeholder="Ville/Quartier"
                        />
                        <ErrorMessage
                          className="text-danger"
                          name="address"
                          component="span"
                        />
                      </div>

                      <div className="container-field">
                        <Field
                          className="champs"
                          as="textarea"
                          rows="4" // Nombre de lignes du textarea
                          cols="50" // Nombre de colonnes du textarea
                          name="biographie"
                          placeholder="Biographie"
                        />
                        <ErrorMessage
                          className="text-danger"
                          name="biographie"
                          component="span"
                        />
                      </div>

                      <div className="container-field">
                        <button
                          className="signup-btn-para"
                          disabled={!formik.isValid || formik.isSubmitting}
                          type="submit">
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Parametres;
