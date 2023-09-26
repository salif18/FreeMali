import React, { useContext } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Navigate } from "react-router";
import { MyStore } from "../context/myStore";

const AddProducts = () => {
  const { isInLine ,token} = useContext(MyStore);
  const validationSchema = yup.object({
    name: yup.string().required("Nom du produit est obligatoire"),
    image: yup.string().required("l'image du produit est obligatoire"),
    category: yup
      .string()
      .required("Veuillez selection la categorie du produit"),
      sousCategory: yup
      .string()
      .required("Veuillez selection la sous-categorie du produit"),
      statut: yup
      .string()
      .required("Veuillez selection le statut du produit"),
    prix: yup.number().required("Le prix du produit est obligatoire"),
    details: yup.string().required("Veuillez d'ecrire le produit"),
    stocks: yup.number().required("Veuillez preciser le nombre de stock"),
  });
  const initialValue = {
    name: "",
    image: "",
    category: "",
    sousCategory:"",
    prix: "",
    details: "",
    statut:"",
    stocks: "",
  };

  const options = [
    { value: "", label: "Select-category" },
    { value: "Homme", label: "Homme" },
    { value: "Femme", label: "Femme" },
    { value: "Enfants", label: "Enfants" },
    
  ];

  const sousOptions = [
    { value: "", label: "Select-sous-category" },
    { value: "Accessoire", label: "Accessoire" },
    { value: "Chaussure", label: "Chaussure" },
    { value: "Vetement", label: "Vetement" },
  ];

  const statuts = [
    { value: "", label: "Select-status" },
    { value: "nouveau", label: "Nouveau" },
    { value: "populaire", label: "Populaire" },
    { value: "tendance", label: "Tendance" },
    
  ];

  const Headers = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const formSubmission = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("user registered");
      }, 2000);
    });
  };
  
  const handleSubmit = async (formData,onSubmittingProps) => {
    try {
      const res = await axios.post(`http://localhost:3003/products`, formData, Headers);
      if (res) {
        await res.data;
        await formSubmission(formData);
        onSubmittingProps.resetForm();
      }
      
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="add-products">
    {!isInLine && <Navigate to='/login' replace={true} />}
      <h1 className="add-title">Ajouter des nouveaux produits</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {(formik) => (
          <div>
          <Form className="formulaire">
            <>
              <div className="left">
                <div>
                  <label htmlFor="name">Nom du Produit</label>
                  <br />
                  <Field
                    className="inputForm"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom du produit..."
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="name"
                    component="span"
                  />
                </div>
                <div>
                  <label htmlFor="image">Photo</label>
                  <br />
                  <Field
                    className="inputForm"
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Lien de l'image du produit..."
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="image"
                    component="span"
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <br />
                  <Field name="category">
                    {({ field }) => (
                      <>
                        <select {...field} className="inputForm">
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ErrorMessage
                          className="text-danger"
                          name="category"
                          component="span"
                        />
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    className="text-danger"
                    name="category"
                    component="span"
                  />
                </div>

                <div>
                  <label htmlFor="category">Sous-Category</label>
                  <br />
                  <Field name="sousCategory">
                    {({ field }) => (
                      <>
                        <select {...field} className="inputForm">
                          {sousOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ErrorMessage
                          className="text-danger"
                          name="sousCategory"
                          component="span"
                        />
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    className="text-danger"
                    name="category"
                    component="span"
                  />
                </div>
              </div>


              <div className="rigth">
              <div>
                  <label htmlFor="category">Status</label>
                  <br />
                  <Field name="statut">
                    {({ field }) => (
                      <>
                        <select {...field} className="inputForm">
                          {statuts.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ErrorMessage
                          className="text-danger"
                          name="statut"
                          component="span"
                        />
                      </>
                    )}
                  </Field>
                
                </div>


                <div>
                  <label htmlFor="price">Price</label>
                  <br />
                  <Field
                    className="inputForm"
                    type="number"
                    id="prix"
                    name="prix"
                    placeholder="Prix du produit..."
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="prix"
                    component="span"
                  />
                </div>
                <div>
                  <label htmlFor="details">Description</label>
                  <br />
                  <Field
                    className="inputForm"
                    type="text"
                    id="details"
                    name="details"
                    placeholder="Details du produit..."
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="details"
                    component="span"
                  />
                </div>
                <div>
                  <label htmlFor="stock">Stock</label>
                  <br />
                  <Field
                    className="inputForm"
                    type="number"
                    id="stock"
                    name="stocks"
                    placeholder="Stock du produit..."
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="stocks"
                    component="span"
                  />
                </div> 
               
              </div>
             
            </>
          </Form> 
             <div>
                <button
                  className="btn-add"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}>
                  Publier
                </button>
              </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddProducts;
