import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { MyStore } from "../context/myStore";
import { useNavigate } from "react-router";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Signup = () => {
    const { login, userId, getMyData, isInLine, getMyProfileData } =
    useContext(MyStore);
    const [errorMessage,setErrorMessage] =useState('')
    const [isView, setIsView] = useState(false)
  //API de registre signup
  const url = "http://localhost:3002/auth/admin/signup";
  //url de recuperation des donnes de user apres etre connecter
  const urlGET = `http://localhost:3002/auth/admin/data/${userId}`;
  //url pour recuperer le profile de utilisateur connecter
  const PROFILGET = `http://localhost:3002/profiles/myProfile/${userId}`;

  const navigate = useNavigate();
  const initialValue = {
    email: "",
    numero: "",
    password: "",
  };

  // Regex pour valider un mot de passe avec au moins 8 caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  // Regex pour valider une adresse e-mail
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//recherche le mot numero
  const RegexNumero = /numero/

  const validation = yup.object({
    email: yup.string()
    .matches(emailRegex,"Veuillez entrer un email operationnel")
    .required('Le champs ne doit pas etre vide'),
    numero: yup.string()
    .required("Veuillez entrer un numero joingnable"),
    password: yup
      .string()
      .matches(passwordRegex,"Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre")
      .required("Veuillez entrer un mot de passe")
      // .min(6)
      // .max(10),
  });

  const formSubmission = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("user registered");
      }, 2000);
    });
  };

  //envoi de formulaire
  const handleSubmit = async (formData, onSubmittingProps) => {
    try {
      const response = await axios.post(url, formData);
      if (response) {
        await response.data;
        const { userId, token } = response.data;
        login(userId, token);
        navigate("/profile");
        await formSubmission(formData);
        onSubmittingProps.resetForm();
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  };

  useEffect(() => {
    const getUser = async () => {
      axios
        .get(urlGET)
        .then((response) => {
          response && getMyData(response.data);
        })
        .catch((error) => {
          console.log(error)
         
        });
    };
    isInLine && getUser();
  }, []);

  // recuperation du profile de user
  useEffect(() => {
    const getProfile = async () => {
      axios
        .get(PROFILGET)
        .then((res) => {
          res && getMyProfileData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isInLine && getProfile();
  }, []);

   //afficher et cacher le contenu du mot de passe
const handleViewPassword=()=>{
  setIsView(!isView)
}
    return (
        <div className='signup'>
        <div className="container-ins">
        <p>Créer votre compte administrateur.</p>
      </div>
      <h1>Inscrivez-vous</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validation}
        onSubmit={handleSubmit}>
        {(formik) => (
          <Form className="form">
            <div className="left-form">
              <div className="container-field">
                <Field
                  className="forms-control"
                  type="number"
                  name="numero"
                  id="numero"
                  placeholder="Numero de telephone"
                />
                {errorMessage && RegexNumero.test(errorMessage) && <span className="error">{errorMessage}</span>}
                <ErrorMessage
                  className="text-danger"
                  name="numero"
                  component="span"
                />
              </div>
              <div className="container-field">
                <Field
                  className="forms-control"
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
            </div>

            <div className="rigth-form">
              <div className="container-field">
              <div className="pass-visible">
                <Field
                  className="forms-control"
                  type={isView ? "text":"password"}
                  name="password"
                  id="password"
                  placeholder="Mot de passe"
                />
                <div className="visiblepresta">{isView ? <VisibilityOffIcon  onClick={()=>handleViewPassword()} />:<VisibilityIcon onClick={()=>handleViewPassword()}/>}</div>
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="password"
                  component="span"
                />
              </div>

              <div className="container-field">
                <button
                  className="signup-btn-clients"
                  disabled={!formik.isValid || formik.isSubmitting}
                  type="submit">
                  S'inscrire
                </button>
              </div>
           
              
           <div className="politique">
           <p>En s'inscrivant j'accepte <span>les Conditions d'utilisation et</span><br/><span>les politiques de confidentialité</span> </p>
          </div>

            </div>
          </Form>
        )}
      </Formik>
        </div>
    );
}

export default Signup;
