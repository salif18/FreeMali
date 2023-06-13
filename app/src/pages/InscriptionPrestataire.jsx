import React, { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Footer from "../constants/Footer";
import Navbar from "../constants/Navbar";
import axios from "axios";
import { MyStore } from "../context/myStore";
import { useNavigate } from "react-router";

const InscriptionPrestataire = () => {
  const { login, getMyData, userId, isInLine, getMyProfileData } =
    useContext(MyStore);
  const navigate = useNavigate();
  //API de registre signup
  const url = "http://localhost:3002/auth/signup";
  const urlGET = `http://localhost:3002/auth/usersData/${userId}`; //url de recuperation des donnes de user apres etre connecter
  const PROFILGET = `http://localhost:3002/profiles/myProfile/${userId}`; //url pour recuperer le profile de utilisateur connecter

  const initialValue = {
    email: "",
    numero: "",
    password: "",
    isPrestataire: true,
  };

  const validation = yup.object({
    email: yup.string().required("Veuillez entrer un email operationnel"),
    numero: yup.number().required("Veuillez entrer un numero joingnable"),
    password: yup
      .string()
      .required("Veuillez entrer un mot de passe")
      .min(6)
      .max(8),
    isPrestaire: yup
      .boolean()
      .oneOf([true], "veuillez cocher la case prestataire"),
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
    console.log(formData);
    try {
      const res = await axios.post(url, formData);
      if (res) {
        await res.data;
        const { userId, token } = res.data;
        login(userId, token);
        navigate("/parametre");
        await formSubmission(formData);
        onSubmittingProps.resetForm();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      axios
        .get(urlGET)
        .then((res) => {
          res && getMyData(res.data);
        })
        .catch((err) => {
          console.error(err);
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

  return (
    <>
      <Navbar />
      <div className="insc-presta">
        <div className="container-ins">
          <h3>Etre aux services des clients</h3>
          <p>
            Bienvenue sur Platform, un service qui vous permet de vous mettre en
            contact avec un clien a l'aide d'un seul bouton
          </p>
          <p>Creer votre compte et gagner des clients.</p>
        </div>
        <h1> Inscrivez-vous</h1>
        <Formik
          initialValues={initialValue}
          validationSchema={validation}
          onSubmit={handleSubmit}>
          {(formik) => (
            <Form className="form">
              <div className="left-form">
                <div>
                  <Field
                    className="form-control"
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
                <div>
                  <Field
                    className="form-control"
                    type="text"
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
                <div>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="password"
                    component="span"
                  />
                </div>

                <div>
                  <button
                    className="signup-btn-presta"
                    disabled={!formik.isValid || formik.isSubmitting}
                    type="submit">
                    S'enregistrer
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default InscriptionPrestataire;
