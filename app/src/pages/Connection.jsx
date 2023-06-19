import React, { useContext, useState } from "react";
import Navbar from "../constants/Navbar";
import Footer from "../constants/Footer";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { MyStore } from "../context/myStore";
import { useNavigate } from "react-router";

//API de registre login
const url = "http://localhost:3002/auth/login";
const Connection = () => {
  const [errorMessage,setErrorMessage] =useState('')
  const navigate = useNavigate();
  const { login } = useContext(MyStore);
 const RegexNumero = /numero/
 const RegexPassowrd =/mot de passe/
  const initialValue = {
    contacts: "",
    password: "",
  };

  const validation = yup.object({
    contacts: yup.string().required("Veuillez entrez votre numero ou email"),
    password: yup
      .string()
      .required("Veuillez entrer un mot de passe")
      .min(6)
      .max(10),
     
  }
  );

  const formSubmission = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("user registered");
      }, 2000);
    });
  };

  //envoi de formulaire
  const handleSubmit =async (formData, onSubmittingProps) => {
   try{
    const response = await axios.post(url, formData)
      if(response){
         const { userId, token} = response.data; 
        login(userId, token);
        navigate("/");
        formSubmission(formData);
        onSubmittingProps.resetForm();
    }
  }catch(error){
    setErrorMessage(error.response.data.message)
  }
}  
    

  return (
    <>
      <Navbar />
      <div className="connection-pages">
      <div className="logo">
        <h1>FreeMali</h1>
        <p>Connectez vous et gagnez des relations <br/>dans le cadre de travail sur notre plateform </p>
      </div>
        <div className="container-connect">
          <h1>Connectez-vous</h1>

          <Formik
            initialValues={initialValue}
            validationSchema={validation}
            onSubmit={handleSubmit}>
            {(formik) => (
              <Form className="form-connection">
                <div className="container-field">
                  <Field
                    className="form-control"
                    type="text"
                    name="contacts"
                    placeholder="Entrez votre numero ou e-mail"
                  
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="contacts"
                    component="span"
                  />
                  {errorMessage && RegexNumero.test(errorMessage) && <span className="error">{errorMessage}</span>}
                </div>

                <div className="container-field">
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
                  {errorMessage && RegexPassowrd.test(errorMessage) && <span className="error">{errorMessage}</span>}
                </div>

                <div>
                  <button
                    className="login-btn"
                    disabled={!formik.isValid || formik.isSubmitting}
                    type="submit">
                    Se connecter
                  </button>
                </div>
                 <p className="mot-oublie" onClick={()=>navigate('/reinitialisation')}>Mot de passe oublié ?</p>
                <div>
                <button
                className="btn-creer-un-compte"
                onClick={()=>navigate('/')}
                >
                Créer un  compte
              </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Connection;
