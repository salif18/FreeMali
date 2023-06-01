import React, { useContext, useEffect } from 'react';
import Navbar from '../constants/Navbar';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Footer from '../constants/Footer';
import MapContainer from '../Maps/MapContainer';
import { MyStore } from '../context/myStore';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Parametres = () => {
const {getMyProfileData,isInLine,userId,me_User,myProfile} = useContext(MyStore)
const navigate = useNavigate()
//API 
const urlPOST = 'http://localhost:3002/profiles'//url pour poster le profile
const urlGET = `http://localhost:3002/profiles/${userId}`//url pour recuperer le profile de utilisateur connecter
const urlPUT =`http://localhost:3002/profiles/${userId}`//url pour modifier le profile de utilisateru


// recuperation du profile de user 
useEffect(()=>{
      const getProfile =async()=>{
        axios
        .get(urlGET)
        .then((res)=>{
           res && getMyProfileData(res.data)
        })
        .catch((err)=>{
          console.error(err)
        })
      }
      isInLine && getProfile()
},[])

// validation des champs de formulaire de modifcation profile
    const validation1 = yup.object({
        nom: yup.string().required("Veuillez entrer votre nom"),
        prenom: yup.string().required("Veuillez entrer votre prenom"),
        address: yup.string().required("Veuillez choisir votre address"),
        email: yup.string().required("Veuillez entrer un email operationnel"),
        numero: yup.number().required("Veuillez entrer un numero joingnable"),
       
      });


    const initialValue1 = {
        userId:"",
        nom: "",
        prenom: "",
        photo:'',
        email: "",
        numero: "",
        proffesion:"",
        categorie:"",
        address:"",
        biographie:""
        
      };

      const formSubmission =()=>{
        return new Promise((resolve, reject)=>{
          setTimeout(()=>{
            resolve('user registered')
          },2000)
        })

      }

      //envoi de formulaire
   const handleSubmit1=async(formData , onSubmittingProps)=>{
    try{
       const res = await axios.put(urlPUT,formData)
       if(res){
          await res.data 
          const {data} = res.data
        
        
       await formSubmission(formData)
       onSubmittingProps.resetForm()
       } 
     
    }catch(e){
     console.error(e)
    }
  }


      const validation2 = yup.object({
        nom: yup.string().required("Veuillez entrer votre nom"),
        prenom: yup.string().required("Veuillez entrer votre prenom"),
        address: yup.string().required("Veuillez choisir votre address"),
        email: yup.string().required("Veuillez entrer un email operationnel"),
        numero: yup.number().required("Veuillez entrer un numero joingnable"),
        biographie: yup.string().required("Veuillez ecrire sur a propos de vous")
      });


    const initialValue2 = {
        userId:"",
        nom: "",
        prenom: "",
        photo:"",
        email: "",
        numero: "",
        address:"",
        proffesion:"",
        categorie:"",
        biographie:""
      };

      const formSubmission2 =()=>{
        return new Promise((resolve, reject)=>{
          setTimeout(()=>{
            resolve('user registered')
          },2000)
        })

      }

      //envoi de formulaire
   const handleSubmit2=async(formData , onSubmittingProps)=>{
    try{
       const res = await axios.post(urlPOST,{...formData,userId})
       if(res){
          await res.data 
          const {data} = res.data
          navigate('/')
        
       await formSubmission2(formData)
       onSubmittingProps.resetForm()
       } 
     
    }catch(e){
     console.error(e)
    }
  }


  const proffesions = [
    { value: "", label: "Select-votre-proffession" },
    { value: "electricien", label: "Electricien" },
    { value: "menuisier", label: "Menuisier" },
    { value: "mecanicien", label: "Mecanicien" },
    { value: "plombier", label: "Plombier" },
    { value: "enseignant", label: "Enseignant" },
    { value: "proffeseur", label: "Proffesseur" },
    { value: "docteur", label: "Docteur" },
    { value: "medecin", label: "Medecin" },
    { value: "sage femme", label: "Sage femme" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "avocat", label: "Avocat" },
    { value: "animateur", label: "Animateur" },
    { value: "dj", label: "Dj" },
  ];

  const categories = [
    {value:'',label:'Choix de la categorie'},
    { value: "mains d'oeuvres", label: "Mains d'oeuvres" },
    { value: "educations", label:"Educations" },
    { value: "sante", label: "Sante" },
    { value: "juriste", label: "Juriste" },
    { value: "entreprenariat", label: "entreprenariat" },
  ];
  

    return (
        <>
        <Navbar/>
        <div className='parametre'>
        <div className='header-para'>
         
            <div className='img-para-container'>
             <img className='img-param' src={myProfile? myProfile.photo :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&usqp=CAU'} alt='' />
             </div> 
             <div className='lienposi'>
              <a href={myProfile? myProfile.address :''}>Ma Geo-Localisation</a>
             </div>
        </div>

           <div className='container-pro-parametre'>
            <div className='pro'>
              <h1 className='pro-h1'>Informations</h1>
              <Formik
              initialValues={initialValue1}
              validationSchema={validation1}
              onSubmit={handleSubmit1}>
              {(formik) => (
                <Form className="form-para">
                
                  
                    <div>
                      
                      <Field
                        className="champs"
                        type="text"
                        name="nom"
                        id="nom"
                        placeholder={me_User.nom}
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="nom"
                        component="span"
                      />
                    </div>
      
                    <div>
                      
                      <Field
                        className="champs"
                        type="text"
                        name="prenom"
                        id="prenom"
                        placeholder={me_User.prenom}
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="prenom"
                        component="span"
                      />
                    </div>
      
                    <Field
                    className="champs"
                    type="text"
                    name="photo"
                    
                    placeholder={myProfile ? myProfile.photo:'lien de limage'}
                  />

                  <div>
               
                <Field name="proffession" id="proffesion" className='champs'>
                  {({ field }) => (
                    <>
                      <select {...field} className="champs">
                        {proffesions.map((prof) => (
                          <option key={prof.value} value={prof.value} >
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

                  <div>
               
                  <Field name="categorie" id="categorie" className='champs'>
                    {({ field }) => (
                      <>
                        <select {...field} className="champs">
                          {categories.map((catego) => (
                            <option key={catego.value} value={catego.value}>
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
  
                  <div>
                 
                  <Field
                    className="champs"
                    type="email"
                    name="email"
                    id="email"
                    placeholder={me_User.email}
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="email"
                    component="span"
                  />
                </div>
                  
                <div>
                
                <Field
                  className="champs"
                  type="number"
                  name="numero"
                  id="numero"
                  placeholder={me_User.numero}
                />
                <ErrorMessage
                  className="text-danger"
                  name="numero"
                  component="span"
                />
              </div>

              <Field
              className="champs"
              type="text"
              name="biographie"
              placeholder='biographie'
            />
      
              <div>
                
                <Field
                  className="champs"
                  type="text"
                  name="address"
                  placeholder={myProfile ? myProfile.address : 'lien de address'}
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
                  
        
                 
                </Form> 
              
              )}
            </Formik>

            <div className='maps'>
              <MapContainer/>
            </div>

            </div>

            <div className='infos-pro'>
            <h1 className='infos-h1'>Completer votre profil</h1>
            <Formik
            initialValues={initialValue2}
            validationSchema={validation2}
            onSubmit={handleSubmit2}>
            {(formik) => (
              <Form className="form-para">
              
                  <div>
                  <Field
                  className="champs"
                  type="text"
                  name="photo"
                  placeholder='Photo'
                />
                 </div>
                 <div>
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
    
                  <div>
                    
                    <Field
                      className="champs"
                      type="text"
                      name="prenom"
                      id="prenom"
                      placeholder='Prenom'
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="prenom"
                      component="span"
                    />
                  </div>
    
                  <div>
               
                <Field name="proffession" id="proffesion" className='champs'>
                  {({ field }) => (
                    <>
                      <select {...field} className="champs">
                        {proffesions.map((prof) => (
                          <option key={prof.value} value={prof.value} >
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

                  <div>
               
                  <Field name="categorie" id="categorie">
                    {({ field }) => (
                      <>
                        <select {...field} className="champs">
                          {categories.map((catego) => (
                            <option key={catego.value} value={catego.value}>
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

                <div>
               
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
                
              <div>
              
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
    
            <div>
              
              <Field
                className="champs"
                type="text"
                name="address"
                placeholder='Lien de votre position maps'
              />
              <ErrorMessage
                className="text-danger"
                name="address"
                component="span"
              />
            </div>
    
            <div>
              
            <Field
              className="champs"
              as="textarea"
              rows="4" // Nombre de lignes du textarea
              cols="50" // Nombre de colonnes du textarea
              name="biographie"
              placeholder='Biographie'
            />
            <ErrorMessage
              className="text-danger"
              name="biographie"
              component="span"
            />
          </div>

            <div>
                  <button
                    className="signup-btn-para"
                    disabled={!formik.isValid || formik.isSubmitting}
                    type="submit">
                    Enregistrer
                  </button>
                </div>
                
      
               
              </Form>
            )}
          </Formik>
           
        </div>


            </div>
       
        
        </div>
        <Footer/>
        </>
    );
}

export default Parametres;
