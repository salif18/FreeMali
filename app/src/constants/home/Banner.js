import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../../context/myStore";

const Banner = () => {
  const { isInLine, myProfile } = useContext(MyStore);
  const navigate = useNavigate();
  return (
    <>
      <section className="banner">
        <div className="container-baner">
          {isInLine && !myProfile ?
            <>
            <h1>
            Veuillez creer votre profile pour finaliser votre inscription, et
            <br />
            rejoignez notre <span>Plateforme !</span>
           </h1>
           <button
                className="btn-braner3"
                onClick={() => navigate("/parametre")}>
                Créer votre profil
              </button>
           </>
             :
             <>
            <h1>
            Vous avez besoin d'un employé ou vous recherchez un job en ligne
            ? <br />
            Rejoignez notre <span>Plateforme !</span>
           </h1>
           <p>Trouvez des professionnels qualifiés pour vos services</p>
           </>
          }
          
          {!isInLine && <p>Inscrivez-vous !</p>}
          <div className="btn-cont">
            {!isInLine && (
              <button
                className="btn-braner1"
                onClick={() => navigate("/sign-presta")}>
                Employés
              </button>
            )}
            {!isInLine && (
              <button
                className="btn-braner2"
                onClick={() => navigate("/sign-clients")}>
                Recruteurs 
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
