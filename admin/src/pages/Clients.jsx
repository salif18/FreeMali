import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import axios from 'axios'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {NavLink, useNavigate, useNavigation} from 'react-router-dom'
import {format} from 'timeago.js'
import AddIcon from '@mui/icons-material/Add';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { MyStore } from '../context/myStore';
import { Navigate } from "react-router";
const Clients = () => {
    const { clients, setUsers,setClients, isInLine ,token} = useContext(MyStore)
    const navigate = useNavigate()
    
    const Headers = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    
    //recuperer les products
    useEffect(()=>{
      axios.get('http://localhost:3002/auth/users&Profile',Headers)
      .then((res)=>{
        res && setUsers(res.data);
        setClients(res.data.filter((x)=>x.isPrestataire === false))
      }).catch(err => console.log(err))
    },[]);

    const handleDelete =(id)=>{
        axios.delete(`http://localhost:3003/authentification/customer/delete/${id}`,Headers)
      setClients(clients.filter(x => x._id !==id))
    }
    const columns = [
        // { field: "_id", headerName: "ID", width: 210 },
        { field: "client", headerName: "Client", width: 80 ,renderCell:(params)=>{
            return(
                <div className="products">
                <img className="products-img" src={params.row.profile.photo} alt='' />
                 {params.row.prenom}
                </div>
            )
        }},
        { field: "prenom",
        headerName: "Prenom",
        width: 100,renderCell:(params)=>(
           <p>{params.row.profile.prenom}</p>
        ) },
      
        {
          field:'numero',
          headerName:'Numero',
          width:100,
          renderCell:(params)=>{
            return(
              <p>{params.row.numero}</p>
            )
          }
        },
        { field: "email",
         headerName: "Email",
         width: 200,renderCell:(params)=>(
            <p>{params.row.email}</p>
         ) },
       
         { field: "address", headerName: "Addresses", width: 200 ,renderCell:(params)=>{
          return(
              <div className="prod">
              {params.row.profile.address}
              </div>
          )
      }},
        {
            field:'action',
            headerName:'Action',
            width:100 ,
            renderCell:(params)=>{
                return(
                    <>
                    <NavLink to={`/clients/${params.row._id}`}>
                    <button className="products-btn-edit">
                    <BorderColorIcon className="edit-btn" style={{fontSize:18}} /></button>
                    </NavLink>
                    <button className="products-btn-delete"
                    onClick={()=>handleDelete(params.row._id)}>
                    <BackspaceIcon   className='del'/></button>
                    </>
                )
            }
        }
      ];

    return (
        <div className='clients'>
        {!isInLine && <Navigate to='/login' replace={true} />}
        <DataGrid
        rows={clients}
        getRowId={(row)=>row._id}
        disableSelectionOnclick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    
        </div>
    );
}

export default Clients;
