import React, { useContext } from "react";
import Sidebar from "../constants/blogs/Sidebar";
import Navbar from "../constants/Navbar";
// import data from '../data/EmpData'
import EmpCard from "../constants/card/Employers";
import { MyStore } from "../context/myStore";

const Dj = () => {
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
          <h1>Nos profils Dj</h1>
          <div className="section-ens">
            {prestataires
              .filter((item) => item["profile"].proffession.includes("dj"))
              .map((item) => (
                <EmpCard item={item} key={item._id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dj;
