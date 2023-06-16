import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Reinitialisation = () => {
  const navigate = useNavigate()
    const [numero, setNumero] = useState('');
  const [message, setMessage] = useState('');
  const [step,setStep] = useState(1)
  const [resetToken, setResetToken] = useState("");
  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
  };

  const handleFormSubmit1 = (e) => {
    e.preventDefault();
      axios.post('http://localhost:3002/auth/reset-password', { numero })
      .then((res)=>{
        setStep(2);
       setMessage(res.data.message);
       setResetToken(res.data.token)
      })
      .catch((error)=>{
      setMessage(error.res.data.message);
    })
  }
console.log(resetToken)
  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };

    
  const handleFormSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/validation-password', { resetToken, password, confirmPassword });
      setMessage(response.data.message);
      setPassword('');
      setConfirmPassword('')
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

   if(step === 1 ){
    return (
        <div>
        <h2>Request Password Reset</h2>
        <form onSubmit={handleFormSubmit1}>
          <input type="number" placeholder="Entrer votre numero" value={numero} onChange={handleNumeroChange} />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
   }else if(step === 2){
    return (
      <div>
           <h2>Reinitialisation Password</h2>
    <form onSubmit={handleFormSubmit2}>
    <input
    type="text"
    placeholder="Token de réinitialisation"
    value={resetToken}
    onChange={(e) => setResetToken(e.target.value)}
    required
  />
      <input type="password" placeholder="Enter new password" value={password} onChange={handlePasswordChange} />
      <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      <button type="submit">Envoyer</button>
    </form>
    {message && <p>{message}</p>}
    {message && <p onClick={()=>navigate('/connecter')}>Se Reconnecter</p>}
      </div>
  );
   }
}

export default Reinitialisation;
