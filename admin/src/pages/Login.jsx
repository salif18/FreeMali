import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { MyStore } from "../context/myStore";
import { useNavigate } from "react-router";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
//API de registre login
const url = "http://localhost:3002/auth/admin/login";

const Login = () => {
    const [errorMessage,setErrorMessage] =useState('')
  const [isView, setIsView] = useState(false)

  const navigate = useNavigate();
  const { login } = useContext(MyStore);
 const RegexNumero = /numero/ 
 const RegexPassowrd =/mot de passe/
  const initialValue = {
    contacts: "",
    password: "",
  };

  const validation = yup.object({
    contacts: yup.string().required("Veuillez entrez votre numero ou votre email"),
    password: yup
      .string()
      .required("Veuillez entrer votre mot de passe")
      // .min(6)
      // .max(10),
     
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
    
//afficher et cacher le contenu du mot de passe
const handleViewPassword=()=>{
  setIsView(!isView)
}
    return (
        <div className='login'>
        <div className="logo">
        <h1>freeMali</h1>
        <p>Connectez vous et gerer votre application<br/>  gestion des commandes, des produits, des clients etc..  </p>
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
                    className="formc-control"
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
                <div className="pass-visible">
                  <Field
                    className="formc-control"
                    type={isView ? "text":"password"}
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                  />
                  <div className="visible">{isView ? <VisibilityOffIcon  onClick={()=>handleViewPassword()} />:<VisibilityIcon onClick={()=>handleViewPassword()}/>}</div>
                  </div>
                  <ErrorMessage
                    className="text-danger"
                    name={isView ? 'text':'password'}
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
                onClick={()=>navigate('/signup')}
                >
                Créer un  compte
              </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        </div>
    );
}

export default Login;
