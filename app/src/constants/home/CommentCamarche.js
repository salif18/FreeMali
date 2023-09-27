import React from "react";

const CommentCamarche = () => {
  return (
    <div className="comment" id="marche">
      <h1>Comment fonctionne notre plateforme <span className="free">FreeMali ?</span></h1>
      <div className="container-objets">
        <div className="objets">
          <img
            className="obj-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWBdX_GMVfQxlanKWwT9ne-aiQnuBT_1tZ-g&usqp=CAU"
            alt=""
          />
          <p>
            Vous etes recruteur ? postez votre projet et explicitez votre besoin
          </p>
        </div>

        <div className="objets">
          <img
            className="obj-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUEXl0Ew_ZtTcAyQSLmatAnqg3Wx46B-6YmA&usqp=CAU"
            alt=""
          />
          <p>
            Parcourez les profils dans le blog  puis choisissez celui qui vous
            convient le mieux
          </p>
        </div>

        <div className="objets">
          <img
            className="obj-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGF9kQdsN_IKiE4f4Ezje_td2vooo7KFdLww&usqp=CAU"
            alt=""
          />
          <p>
            Servez-vous de l'interface pour discuter et partager vos services
          </p>
        </div>

        <div className="objets">
          <img
            className="obj-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGuJmswuXRtJhTMI4nvTa9z-g58mBBvqPakA&usqp=CAU"
            alt=""
          />
          <p>
            Vous etes prestataire ? definir votre proffession et gagner des
            recruteurs
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCamarche;
