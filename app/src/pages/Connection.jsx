import React, { useContext } from "react";
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
  const navigate = useNavigate();
  const { login } = useContext(MyStore);

  const initialValue = {
    numero: "",
    password: "",
  };

  const validation = yup.object({
    numero: yup.string().required("Veuillez votre numero operationnel"),
    password: yup
      .string()
      .required("Veuillez entrer un mot de passe")
      .min(6)
      .max(8),
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
      const res = await axios.post(url, formData);
      if (res) {
        await res.data;
        const { userId, token } = res.data;
        login(userId, token);
        navigate("/");
        await formSubmission(formData);
        onSubmittingProps.resetForm();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="connection-pages">
        <div className="container-connect">
          <h1>Connectez-vous</h1>

          <Formik
            initialValues={initialValue}
            validationSchema={validation}
            onSubmit={handleSubmit}>
            {(formik) => (
              <Form className="form-connection">
                <div>
                  <Field
                    className="form-control"
                    type="text"
                    name="numero"
                    placeholder="Votre numero"
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
                    className="login-btn"
                    disabled={!formik.isValid || formik.isSubmitting}
                    type="submit">
                    Se connecter
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
