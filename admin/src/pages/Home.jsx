import React, { useContext, useEffect, useMemo, useState } from 'react';
import NombreProductComponent from '../constants/home/NombreProductComponent';
import OrdersComponent from '../constants/home/OrdersComponent';
import RevenueComponent from '../constants/home/RevenueComponent';
import CustomerStatComponent from '../constants/home/CustomerStatComponent';
import VentesStatComponent from '../constants/home/VentesStatComponent';
import CustomerListComponent from '../constants/home/CustomerListComponent';
import TableOrderComponent from '../constants/home/TableOrderComponent';
import axios from 'axios'
import { MyStore } from '../context/myStore';
import { Navigate } from 'react-router';
import Maps from '../constants/maps/Maps';
import MaoLeaflet from '../constants/maps/MaoLeaflet';


const Home = () => {
  const { domaineURI,setOffres, isInLine,setClients,setUsers,users, token, userId, setProfil } = useContext(MyStore);
  const URL =`${domaineURI}/auth/users/statistiques`;
 
  const [customerStats,setCustomerStats]=useState([]);
  

  const Headers = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  
  //recuperer les commandes
  useEffect(()=>{
    axios.get('http://localhost:3002/offres',Headers)
    .then((res)=>{
      res && setOffres(res.data)
    }).catch(err => console.log(err))
  },[]);

  //recuperer les products
  useEffect(()=>{
    axios.get('http://localhost:3002/auth/users&Profile',Headers)
    .then((res)=>{
      res && setUsers(res.data);
      setClients(res.data.filter((x)=>x.isPrestataire === false))
    }).catch(err => console.log(err))
  },[]);

  const MONTHS = useMemo(
  ()=>[
      'Jan',
      'Fev',
      'Mar',
      'Avr',
      'Mai',
      'Jui',
      'Juil',
      'Aou',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
  ],[])

  useEffect(()=>{
        const getDataStatystics=async()=>{
           try{
              const res = await axios.get(URL, Headers)
                  res.data.map((item)=>(
                      setCustomerStats(prev=>[
                      ...prev,
                      {name:MONTHS[item._id -1],'Active User':item.total}])
                  ))
              
           }catch(e){
              console.log(e)
           }
        }
        getDataStatystics()
  },[MONTHS]);

 
  const profiladmin = `http://localhost:3002/profils/admin/user/${userId}`
  //recuperation de profil
  useEffect(()=>{
   axios.get(profiladmin,Headers)
   .then((res)=> 
   setProfil(res.data))
   .catch((err)=>console.log(err))
},[])  


    return (
        <div className='home'>
           {!isInLine && <Navigate to='/login' replace={true} />}
          
           
            <div className='nombres'>
              <NombreProductComponent/>
               <OrdersComponent/>
               <RevenueComponent/>
            </div>

            <div className='statistiques'>
              <CustomerStatComponent data={customerStats} grid dataKey='Active User' />   
              <MaoLeaflet users={users} />          
            </div>

            <div className='user-orders'>
            <CustomerListComponent/>
            <TableOrderComponent/>
            </div>

        </div>
    );
}

export default Home;
