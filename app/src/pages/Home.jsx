import React, { useContext, useEffect } from "react";
import Navbar from "../constants/Navbar";
import Banner from "../constants/home/Banner";
import Footer from "../constants/Footer";
import CommentCamarche from "../constants/home/CommentCamarche";
import Quelques from "../constants/home/Quelques";
import { MyStore } from "../context/myStore";
import axios from "axios";
import Recomandation from "../constants/home/Recomandation";
import { useNavigate, Navigate } from "react-router";
import QuelquesOffre from "../constants/home/QuelquesOffre";

const Home = () => {
  const { getUsers, token, getMyData,domaineURL, userId, isInLine } =
    useContext(MyStore);
  
  const urlGET = `${domaineURL}/auth/usersData/${userId}`; //url de recuperation des donnes de user apres etre connecter

  const Headers = {
    headers:{
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}


  useEffect(() => {
    const getUser = async () => {
      axios
        .get(urlGET,Headers)
        .then((res) => {
          res && getMyData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    isInLine && getUser();
  }, []);

 

  // recuperer tous les utilisateurs
  useEffect(() => {
    axios
      .get(`${domaineURL}/auth/users&Profile`,Headers)
      .then((res) => {
        res && getUsers(res.data);
      })
      .catch((Err) => console.log(Err));
  }, []);


  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="container-home">
          <Banner />
          <Quelques />
          <QuelquesOffre/>
          <CommentCamarche />
          <Recomandation/>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
