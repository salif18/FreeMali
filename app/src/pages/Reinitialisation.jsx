import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MyStore } from '../context/myStore';
//import { useNavigate } from 'react-router';

const Reinitialisation = () => {
const { domaineURL } = useContext(MyStore)
  //const navigate = useNavigate()
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('');
  

  // changer le champ numero
  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
  };


  //envoeyer le numero de reinitialisation vers le backend
  const handleFormSubmit1 = async(e) => {
    if(email.length > 0){
    e.preventDefault();
    try{
     const response = await axios.post(`${domaineURL}/auth/reset-password`, {numero ,email })
       if(response){
       setMessage(response.data.message);
       }
      }catch(error){
       setMessage(error.response.data.message);
    }
  }
  }
  
    return (
        <div className='reinitialisation2'>
        <h2>Réinitialisation du mot de passe </h2>
        <form onSubmit={handleFormSubmit1} className='form-renit'>
        <input className='form-control' type="number" placeholder="Entrer votre numero" value={numero} onChange={handleNumeroChange} />
         <p>et</p>
        <input className='form-control' type="email" placeholder="Votre email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          
          <button className='btn-renit' type="submit">Envoyer</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
  }
export default Reinitialisation;
