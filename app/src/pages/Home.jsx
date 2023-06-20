import React, { useContext, useEffect } from "react";
import Navbar from "../constants/Navbar";
import Banner from "../constants/home/Banner";
import Footer from "../constants/Footer";
import CommentCamarche from "../constants/home/CommentCamarche";
import Quelques from "../constants/home/Quelques";
import { MyStore } from "../context/myStore";
import axios from "axios";

const Home = () => {
  const { getUsers, users, getMyData, getMyProfileData, userId, isInLine } =
    useContext(MyStore);
  const PROFILGET = `http://localhost:3002/profiles/myProfile/${userId}`; //url pour recuperer le profile de utilisateur connecter
  const urlGET = `http://localhost:3002/auth/usersData/${userId}`; //url de recuperation des donnes de user apres etre connecter

  useEffect(() => {
    const getUser = async () => {
      axios
        .get(urlGET)
        .then((res) => {
          res && getMyData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isInLine && getUser();
  }, []);

  // recuperation du profile de user
  useEffect(() => {
    const getProfile = async () => {
      axios
        .get(PROFILGET)
        .then((res) => {
          res && getMyProfileData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isInLine && getProfile();
  }, [PROFILGET, getMyProfileData, isInLine]);

  // recuperer tous les utilisateurs
  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/users&Profile")
      .then((res) => {
        res && getUsers(res.data);
      })
      .catch((Err) => console.log(Err));
  }, [getUsers]);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="container-home">
          <Banner />
          <Quelques />
          <CommentCamarche />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
