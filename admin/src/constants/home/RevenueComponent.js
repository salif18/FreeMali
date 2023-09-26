import React, { useContext, useEffect, useState } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import axios from 'axios'
import { MyStore } from "../../context/myStore";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const RevenueComponent = () => {
  const {users } = useContext(MyStore)
  const recruteurs = users.filter((u) => u.isPrestataire === false)

 
  return (
    <div className="revenueComponent">
      <div className="revenu-icon">
        <PaidIcon style={{ color: "blue", padding: 10, fontSize: 40 }} />
      </div>
      <div className="revenu-infos">
        <h3>Employeurs</h3>
        <div className="totprc">
        <p>{recruteurs.length}</p>
        <span className='money-taux'>
      
        </span>
        </div>
      </div>
    </div>
  );
};

export default RevenueComponent;
