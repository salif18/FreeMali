import React, { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Shop2Icon from '@mui/icons-material/Shop2';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import MapIcon from '@mui/icons-material/Map';
import RecommendIcon from '@mui/icons-material/Recommend';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { MyStore } from '../../context/myStore';

const SideBarComponent = () => {
  const { isInLine} = useContext(MyStore)
    return (
        <div className='sidebarComponent'>
          {!isInLine && <Navigate to='/login' replace={true} />}
            <div className='dashbord'>
            <NavLink className='dashlink' to='/'>
              <DashboardIcon style={{margin:5, color:'#19a6e1'}}/>
              Vue d'ensemble
            </NavLink>
            </div>

            <div className='liens'>
              <NavLink className='link' to='/offres'>
               <BusinessCenterIcon style={{margin:5,color:'#19a6e1'}}/>Offres
             </NavLink>
             <NavLink className='link' to='/prestataires'>
               <ManageAccountsIcon style={{margin:5 ,color:'#19a6e1'}}/>Prestataires
             </NavLink>
            
             <NavLink className='link' to='/clients'>
               <GroupIcon style={{margin:5,color:'#19a6e1'}} />Clients
             </NavLink>
             <NavLink className='link' to='/map'>
               <MapIcon style={{margin:5,color:'#19a6e1'}} />Geolocation users
             </NavLink>
             <NavLink className='link' to='/recomandation'>
             <RecommendIcon style={{margin:5,color:'#19a6e1'}} /> Recomandations  
             </NavLink>
             </div>
            
        </div>
    );
}

export default SideBarComponent;
