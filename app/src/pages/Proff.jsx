import React, { useContext } from "react";
import Sidebar from "../constants/blogs/Sidebar";
import Navbar from "../constants/Navbar";
import EmpCard from "../constants/card/Employers";
// import data from '../data/EmpData'
import { MyStore } from "../context/myStore";

const Proff = () => {
  const { users } = useContext(MyStore);
  const prestataires = users.filter((presta) => presta.isPrestataire);
  return (
    <>
      <Navbar />
      <div className="blogs">
        <div className="side">
          <Sidebar />
        </div>
        <div className="main-container">
          <h1>Nos profils proffesseurs</h1>
          <div className="section-ens">
            {prestataires
              .filter((item) =>
                item.profile.proffession.includes("proffesseur")
              )
              .map((item) => (
                <EmpCard item={item} key={item._id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Proff;
