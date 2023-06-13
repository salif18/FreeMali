import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../../context/myStore";

const Card = ({ item }) => {
  const { isInLine } = useContext(MyStore);
  const navigate = useNavigate();
  return (
    <button className="card-content" key={item.id}>
      <div className="container-card-image">
        <img className="card-img" src={item.image} alt="" />
      </div>
      <div className="card-body">
        <h2>{item.title}</h2>
        <p>{item.infos}</p>
      </div>
      {!isInLine && (
        <button className="btn-card" onClick={() => navigate(item.lien)}>
          {item.btntext}
        </button>
      )}
    </button>
  );
};

export default Card;
