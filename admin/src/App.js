import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import SideBarComponent from "./constants/onglets/SideBarComponent";
import NavbarComponent from "./constants/onglets/NavbarComponent";
import Home from "./pages/Home";
import Prestataires from "./pages/Prestataires";
import Offres from "./pages/Offres";
import Clients from "./pages/Clients";
import SinglePrestataire from "./pages/SinglePrestataire";
import SingleOffre from "./pages/SingleOffre";
import SingleClient from "./pages/singleClient";
import Messagerie from "./pages/Messagerie";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AddProducts from "./pages/AddProducts";
import { MyStore } from "./context/myStore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MapView from "./pages/MapView";
import SingleCourrier from "./pages/SingleCourrier";
import ArchivesCourier from "./pages/ArchivesCourier";
import Recomandation from "./pages/Recomandation";
import Reinitialisation from "./pages/Reinitialisation";
import Comfirmation from "./pages/Comfirmation";
import OffreObtenue from "./pages/OffreObtenue";

function App() {
  const { isInLine } = useContext(MyStore);
  
  return (
    <>
      {isInLine && <NavbarComponent />}
      
      <div className="App">
        {isInLine && <SideBarComponent />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prestataires" element={<Prestataires />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/prestataires/:id" element={<SinglePrestataire />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/offres/:id" element={<SingleOffre />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<SingleClient />} />
          <Route path="/courrier" element={<Messagerie />} />
          <Route path="/courrier/:id" element={<SingleCourrier />} />
          <Route path="/archive/courrier" element={<ArchivesCourier/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/map" element={<MapView/>}/>
          <Route path="/recomandation" element={<Recomandation/>} />
          <Route path='/reinitialisation' element={<Reinitialisation/>} />
          <Route path='/reinitialisation/:token' element={<Comfirmation/>}/>
          <Route path='/offre/retenue/:id' element={<OffreObtenue/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
