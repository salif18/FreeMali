import React, { useContext } from "react";
import { useNavigate } from "react-router";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import { MyStore } from "../../context/myStore";

const Employers = ({ item }) => {
  const navigate = useNavigate();
  const { defaultImage } = useContext(MyStore);
  return (
    <div className="empCard" key={item._id}>
      <div className="containe-img">
        <img
          className="empcard-img"
          src={item.profile.photo ? item.profile.photo : defaultImage}
          alt=""
        />
      </div>
      <div className="card-body">
        <h2>
          {item && item.profile.prenom} {item && item.profile.nom}
        </h2>
        <p>{item && item.profile.proffession}</p>
        <div>
          <div className="icons">
            <p
              style={{
                color: "red",
                fontSize: 12,
                fontFamily: "Roboto",
                fontWeight: 600,
              }}>
              <ThumbUpIcon style={{ color: "#19a6e1", marginLeft: 10 }} />{" "}
              {item?.profile.likes >0 && item.profile.likes}
            </p>
            <p
              style={{
                color: "rgb(13,179,221)",
                fontSize: 12,
                fontFamily: "Roboto",
                fontWeight: 600,
              }}>
              <ThumbDownIcon
                style={{ color: "#ff4040", marginLeft: 10 }}
              />{" "}
              {item?.profile.disLikes > 0  && item.profile.disLikes}
            </p>
          </div>
          <p
            style={{
              marginLeft: 10,
              fontSize: 12,
              color: "#aaa",
              fontWeight: 600,
              fontFamily: "Roboto",
            }}>
            {item && item.profile.avis.length} Commentaire(s){" "}
          </p>
        </div>
      </div>
      <div className="container-bt">
        <button
          className="btn-contacter"
          onClick={() => navigate(`/profile/${item._id}`)}>
          Contacter
        </button>
      </div>
    </div>
  );
};

export default Employers;
