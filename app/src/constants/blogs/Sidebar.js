import React from "react";
import { NavLink } from "react-router-dom";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import GarageIcon from "@mui/icons-material/Garage";
import ConstructionIcon from "@mui/icons-material/Construction";
import PlumbingRoundedIcon from "@mui/icons-material/PlumbingRounded";
// import CastForEducationRoundedIcon from '@mui/icons-material/CastForEducationRounded';
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import GirlRoundedIcon from "@mui/icons-material/GirlRounded";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import MicExternalOnRoundedIcon from "@mui/icons-material/MicExternalOnRounded";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import DevicesIcon from '@mui/icons-material/Devices';
import LanIcon from '@mui/icons-material/Lan';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container-menu">
        <div className="mainsoeuvres">
          {/*<div className="secteur">
            <AssuredWorkloadOutlinedIcon
              style={{ margin: 10, fontSize: 26, color: "#aaa" }}
            />
            <h3>Mains d'oeuvres</h3>
  </div>*/}

          <NavLink className="liens" to="/electricite">
            <TipsAndUpdatesIcon
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
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
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Plombier
          </NavLink>
          <NavLink className="liens" to="/maçon">
          <AssuredWorkloadOutlinedIcon
            style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
          />
          Maçons
        </NavLink>
        </div>

        <div className="mainsoeuvres">
        {/*<div className="secteur">
          <LanIcon
            style={{ margin: 10, fontSize: 26, color: "#aaa" }}
          />
          <h3>Developpeur</h3>
  </div>*/}
        <NavLink className="liens" to="/developpeur">
          <DevicesIcon
            style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
          />
          Developpeur
        </NavLink>
      </div>

        <div className="mainsoeuvres">
          {/*<div className="secteur">
            <SchoolIcon style={{ margin: 10, fontSize: 26, color: "#aaa" }} />
            <h3>Educations</h3>
  </div>*/}

          <NavLink className="liens" to="/enseignants">
            <SchoolIcon
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Enseignant(e)s
          </NavLink>
          <NavLink className="liens" to="/proffeseurs">
            <AutoStoriesIcon
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Proffesseur(e)s
          </NavLink>
        </div>

        <div className="mainsoeuvres">
          {/*<div className="secteur">
            <LocalHospitalIcon
              style={{ margin: 10, fontSize: 26, color: "#aaa" }}
            />
            <h3>Sante</h3>
  </div>*/}
          <NavLink className="liens" to="/docteur">
            <LocalHospitalIcon style={{ margin: 10, fontSize: 26, color: "#1d89e6" }} />
            Docteurs
          </NavLink>
        </div>

        <div className="mainsoeuvres">
          {/*<div className="secteur">
            <WorkHistoryIcon
              style={{ margin: 10, fontSize: 26, color: "#aaa" }}
            />
            <h3>Entreprenariats</h3>
  </div>*/}
          <NavLink className="liens" to="/entrepreneur">
            <BusinessCenterIcon
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Entrepreneurs
          </NavLink>
        </div>

        <div className="mainsoeuvres">
          {/*<div className="secteur">
            <OnlinePredictionIcon
              style={{ margin: 10, fontSize: 26, color: "#aaa" }}
            />
            <h3>Animations</h3>
  </div>*/}
          <NavLink className="liens" to="/dj">
            <HeadsetMicIcon
              style={{ margin: 10, fontSize: 26, color: "#1d89e6" }}
            />
            Dj
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
