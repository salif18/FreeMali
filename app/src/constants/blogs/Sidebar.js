import React from "react";
import { NavLink } from "react-router-dom";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import GarageIcon from "@mui/icons-material/Garage";
import ConstructionIcon from "@mui/icons-material/Construction";
import PlumbingRoundedIcon from "@mui/icons-material/PlumbingRounded";
// import CastForEducationRoundedIcon from '@mui/icons-material/CastForEducationRounded';
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";


import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DevicesIcon from '@mui/icons-material/Devices';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container-menu">
        <div className="mainsoeuvres">
         
         <NavLink className="liens" to="/agronome">
          <AgricultureIcon
             style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Agro bussiness
          </NavLink>
          
          <NavLink className="liens" to="/electricite">
            <TipsAndUpdatesIcon
              style={{ margin: 10, fontSize: 26, color: "#39bbcb" }}
            />
            Electriciens
          </NavLink>

          <NavLink className="liens" to="/mecanique">
            <GarageIcon style={{ margin: 10, fontSize: 26, color:"#1d89e6" }} />
            Mecaniciens
          </NavLink>

          <NavLink className="liens" to="/menuiserie">
            <ConstructionIcon
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Menuisiers
          </NavLink>

          <NavLink className="liens" to="/plomberie">
            <PlumbingRoundedIcon
              style={{ margin: 10, fontSize: 26, color: "#39bbcb" }}
            />
            Plombiers
          </NavLink>

          <NavLink className="liens" to="/maçon">
          <AssuredWorkloadOutlinedIcon
            style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
          />
          Maçons
        </NavLink>

        <NavLink className="liens" to="/developpeur">
          <DevicesIcon
            style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
          />
          Developpeurs
        </NavLink>

        <NavLink className="liens" to="/informatique">
          <LaptopChromebookIcon
            style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
          />
          Informaticien(e)s
        </NavLink>

          <NavLink className="liens" to="/enseignants">
            <SchoolIcon
              style={{ margin: 10, fontSize: 26, color: "#39bbcb" }}
            />
            Enseignant(e)s
          </NavLink>

          <NavLink className="liens" to="/proffeseurs">
            <AutoStoriesIcon
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Proffesseur(e)s
          </NavLink>

          <NavLink className="liens" to="/docteur">
            <LocalHospitalIcon style={{ margin: 10, fontSize: 26, color: "#1d89e6" }} />
            Docteurs
          </NavLink>
    
          <NavLink className="liens" to="/entrepreneur">
            <BusinessCenterIcon
              style={{ margin: 10, fontSize: 26, color: "#39bbcb" }}
            />
            Entrepreneurs
          </NavLink>
        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
