import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Reinitialisation = () => {

  const navigate = useNavigate()
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('');
  const [step,setStep] = useState(1)
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // changer le champ numero
  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
  };

  //envoeyer le numero de reinitialisation vers le backend
  const handleFormSubmit1 = async(e) => {
    if(numero.length > 0){
    e.preventDefault();
    try{
     const res = await axios.post('http://localhost:3002/auth/reset-password', { numero, email })
       if(res){
       setMessage(res.data.message);
       setResetToken(res.data.token);
       setStep(2);
       }
      }catch(error){
       setMessage(error.res.data.message);
    }
  }
  }

  // changer la valeur du passowrd
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    //changer la valeur de confirmation du mot de passe actuel
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };

  //envoie des nouveaux donne mots d passe vers backend
  const handleFormSubmit2 = async (e) => {
    if(password.length >0 && confirmPassword.length >0){
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3002/auth/validation-password', { resetToken, password, confirmPassword });
      if(res){
      setMessage(res.data.message);
      setPassword('');
      setConfirmPassword('');
      setResetToken('')
    }
    } catch (error) {
      setMessage(error.res.data.message);
    }
  }
  };

  // pour le rendu de la page reinitialisation step ===1
   if(step === 1 ){
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
   }else if(step === 2){
    return (
      <div className='reinitialisation2'>
           <h2>Etape 2</h2>
    <form onSubmit={handleFormSubmit2} className='form-renit' >
    <input
    className='form-control'
    type="text"
    placeholder="Token de réinitialisation"
    value={resetToken}
    onChange={(e) => setResetToken(e.target.value)}
    required
  />
      <input className='form-control' type="password" placeholder="Entrez un nouveau mot de passe" value={password} onChange={handlePasswordChange} />
      <input className='form-control' type="password" placeholder="Confirmez le nouveau mot de passe " value={confirmPassword} onChange={handleConfirmPasswordChange} />
      <button className='btn-renit' type="submit">Envoyer</button>
    </form>
    {message && <p>{message}</p>}
    {message && <a className='link-a' href onClick={()=>navigate('/connecter')}>Se connecter</a>}
      </div>
  );
   }
}

export default Reinitialisation;
