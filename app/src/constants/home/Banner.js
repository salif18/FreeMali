import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../../context/myStore";

const Banner = () => {
  const { isInLine } = useContext(MyStore);
  const navigate = useNavigate();

  return (
    <>
      <section className="banner">
        <div className="container-baner">
          <h1>
            Vous avez besoin d'un prestataire ou vous recherchez un job en ligne
            ? <br />
            Rejoignez notre <span>Plateforme !</span>
          </h1>
          <p>Trouvez des professionnels qualifiés pour vos services</p>
          {!isInLine && <p>Inscrivez-vous !</p>}
          <div className="btn-cont">
            {!isInLine && (
              <button
                className="btn-braner1"
                onClick={() => navigate("/sign-presta")}>
                Devenir prestataire
              </button>
            )}
            {!isInLine && (
              <button
                className="btn-braner2"
                onClick={() => navigate("/sign-clients")}>
                Devenir recruteur
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
