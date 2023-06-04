import React from 'react';
import {NavLink} from 'react-router-dom'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import GarageIcon from '@mui/icons-material/Garage';
import ConstructionIcon from '@mui/icons-material/Construction';
import PlumbingRoundedIcon from '@mui/icons-material/PlumbingRounded';
// import CastForEducationRoundedIcon from '@mui/icons-material/CastForEducationRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import GirlRoundedIcon from '@mui/icons-material/GirlRounded';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import MicExternalOnRoundedIcon from '@mui/icons-material/MicExternalOnRounded';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            
        <div className='container-menu'>

            <div className='mainsoeuvres'>
            <div className='secteur'>
            <AssuredWorkloadOutlinedIcon style={{margin:10,fontSize:30 ,color:'#aaa'}}/>
            <h3>Mains d'oeuvres</h3>
            </div>
            
            <NavLink className='liens' to='/electricite'><TipsAndUpdatesIcon style={{margin:10,fontSize:30 ,color:'orange'}}/>
            Electriciens</NavLink>
            <NavLink className='liens' to='/mecanique'><GarageIcon style={{margin:10,fontSize:30 ,color:'#aaa'}}/>Mecaniciens</NavLink>
            <NavLink className='liens' to='/menuiserie'><ConstructionIcon style={{margin:10,fontSize:30, color:'maroon'}}/>Menuisiers</NavLink>
            <NavLink className='liens' to='/plomberie'><PlumbingRoundedIcon style={{margin:10,fontSize:30,color:'blue'}} />Plombier</NavLink>
            </div>

            <div className='mainsoeuvres'>
            <div className='secteur'>
            <SchoolIcon style={{margin:10,fontSize:30 ,color:'#aaa'}}/>
            <h3>Educations</h3>
            </div>
            
            <NavLink className='liens' to='/enseignants'><SentimentDissatisfiedIcon style={{margin:10,fontSize:30,color:'green'}}/>Enseignant(e)s</NavLink>
            <NavLink className='liens' to='/proffeseurs'><AutoStoriesIcon style={{margin:10,fontSize:30,color:'red'}}/>Proffesseur(e)s</NavLink>
            </div>
            
            <div className='mainsoeuvres'>
            <div className='secteur' >
            <LocalHospitalIcon style={{margin:10,fontSize:30 ,color:'#aaa'}}/>
            <h3>Sante</h3>
            </div>
            <NavLink className='liens' to='/docteur'><TagFacesIcon style={{margin:10,fontSize:30,color:'blue'}}/>Docteurs</NavLink>
            <NavLink className='liens' to='/medecin'><Diversity1RoundedIcon style={{margin:10,fontSize:30,color:'orange'}}/>Medecins</NavLink>
            <NavLink className='liens' to='/sagefemme'><GirlRoundedIcon style={{margin:10,fontSize:30,color:'blue'}}/>Sages femmes</NavLink>
            </div>

            <div className='mainsoeuvres'>
            <div className='secteur'>
            <WorkHistoryIcon style={{margin:10,fontSize:30 ,color:'#aaa'}}/>
            <h3>Entreprenariats</h3>
            </div>
            <NavLink className='liens' to='/entrepreneur'><BusinessCenterIcon style={{margin:10,fontSize:30,color:'#555'}}/>Entrepreneurs</NavLink>
            </div>

            <div className='mainsoeuvres'>
            <div className='secteur'>
            <AccountBalanceIcon style={{margin:10,fontSize:30 ,color:'#aaa'}} />
            <h3>Juriste</h3>
            </div>
            <NavLink className='liens' to='/juriste'><SchoolIcon style={{margin:10,fontSize:30,color:'#555'}}/>Avocats</NavLink>  
            </div>

            <div className='mainsoeuvres'>
            <div className='secteur' >
            <OnlinePredictionIcon style={{margin:10,fontSize:30 ,color:'#aaa'}}/>
            <h3>Animations</h3>
            </div>
            <NavLink className='liens' to='/animateur'><MicExternalOnRoundedIcon style={{margin:10,fontSize:30,color:'#555'}}/>Animateurs</NavLink>
            <NavLink className='liens' to='/dj'><HeadsetMicIcon style={{margin:10,fontSize:30,color:'red'}}/>Dj</NavLink>
            </div>

            </div>
        </div>
    );
}

export default Sidebar;
