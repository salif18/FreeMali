import React, { useContext } from "react";
// import data from '../../data/EmpData'

import { useNavigate } from "react-router";
import { MyStore } from "../../context/myStore";
import Employers from "../card/Employers";
const Quelques = () => {
  const { users } = useContext(MyStore);
  const navigate = useNavigate();
  return (
    <div className="quelques">
      <h1 className="h-h1">
        Trouver des experts qualifiés pour vos services
      </h1>
      <div className="container-quelques">
        {users
          .slice(0, 6)
          .filter((user) => user.isPrestataire === true)
          .map((item) => (
            <Employers item={item} key={item._id} />
          ))}
      </div>
      <button onClick={() => navigate("/blogs")} className="btn-qlq">
        Voirs tous nos employés &#8594;
      </button>
    </div>
  );
};

export default Quelques;
