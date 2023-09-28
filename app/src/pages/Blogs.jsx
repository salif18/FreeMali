import React, { useContext, useEffect, useState } from "react";
import Navbar from "../constants/Navbar";
import Sidebar from "../constants/blogs/Sidebar";
import {ClipLoader} from 'react-spinners';
// import data from '../data/EmpData'
import axios from "axios";
import { MyStore } from "../context/myStore";
import Employers from "../constants/card/Employers";
import SidebarLeft from "../constants/blogs/SidebarLeft";

const Blogs = () => {
  const { users, getUsers,token,domaineURL } = useContext(MyStore);
  const Headers = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  //  recuperer tous les utilisateur avec profile combiner
  useEffect(() => {
    axios
      .get(`${domaineURL}/auth/users&Profile`,Headers)
      .then((res) => {
        res && getUsers(res.data);
      })
      .catch((Err) => console.log(Err));
  }, []);

//spinner
const [loading,setloading]=useState(false)

useEffect(()=>{
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },1000)
},[])

  return (
    <>
      <Navbar />
      <div className="blogs">
        <div className="side">
          <Sidebar />
        </div>

        {
          loading ? <div className='clip-card'>
                     <ClipLoader  />
                     <p>Chargement en  cours...</p>
                   </div> 
                :
          <div className="main-container">
          <h1>Choisissez votre prestataire pour son savoir-faire</h1>
          <div className="section-ens">
            {users
              .filter((item) => item.isPrestataire)
              .map((item) => (
                <Employers item={item} key={item._id} />
              ))}
          </div>
        </div>
        }
        <div className="side">
         <SidebarLeft/>
        </div>
      </div>
    </>
  );
};

export default Blogs;
