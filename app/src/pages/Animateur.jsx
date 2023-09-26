import React, { useContext } from "react";
import Sidebar from "../constants/blogs/Sidebar";
import Navbar from "../constants/Navbar";
// import data from '../data/EmpData'
import { MyStore } from "../context/myStore";
import EmpCard from "../constants/card/Employers";

const Animateur = () => {
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
          <h1>Nos profils animateurs</h1>
          <div className="section-ens">
            {prestataires
              .filter((item) =>
                item["profile"].proffession.includes("animateurs")
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

export default Animateur;
