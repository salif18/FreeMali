import React, { useContext, useEffect } from "react";
import Navbar from "../constants/Navbar";
import Sidebar from "../constants/blogs/Sidebar";

// import data from '../data/EmpData'
import axios from "axios";
import { MyStore } from "../context/myStore";
import Employers from "../constants/card/Employers";

const Blogs = () => {
  const { users, getUsers } = useContext(MyStore);

  //  recuperer tous les utilisateur avec profile combiner
  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/users&Profile")
      .then((res) => {
        res && getUsers(res.data);
      })
      .catch((Err) => console.log(Err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="blogs">
        <div className="side">
          <Sidebar />
        </div>

        <div className="main-container">
          <h1>Choisissez votre prestataire pour son savoir-faire</h1>
          <div className="section-ens">
            {users
              .filter((item) => item.isPrestataire)
              .map((item) => (
                <Employers item={item} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
