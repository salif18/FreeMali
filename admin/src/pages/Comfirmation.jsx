import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Comfirmation = () => {
  // Extraire le token de l'URL
  // Afficher le formulaire de réinitialisation avec le token
  const { token } = useParams();

  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
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
    if (password.length > 0 && confirmPassword.length > 0) {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3002/auth/admin/validPassword",
          { token, password, confirmPassword }
        );
        if (response) {
          setMessage(response.data.message);
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="reinitialisation2">
      <h2>Etape 2</h2>
      <form onSubmit={handleFormSubmit2} className="form-renit">
        <input
          className="form-control"
          type="password"
          placeholder="Entrez un nouveau mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Confirmez le nouveau mot de passe "
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button className="btn-renit" type="submit">
          Envoyer
        </button>
      </form>
      {message && <p className="message-reini">{message}</p>}
      {message && (
        <a className="link-a" href onClick={() => navigate("/login")}>
          Se connecter
        </a>
      )}
    </div>
  );
};

export default Comfirmation;
