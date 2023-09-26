import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'; 
import {NavLink, useNavigate} from 'react-router-dom'
import {format} from 'timeago.js'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { MyStore } from '../context/myStore';
import { Navigate } from 'react-router';

const Prestataires = () => {
    const navigate = useNavigate()
const { users, setUsers,setClients, isInLine,token } = useContext(MyStore)
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
        axios.delete(`http://localhost:3002/prestataires/${id}`,Headers)
      setUsers(users.filter(x => x._id !== id))
    }
  
    const columns = [
        // { field: "_id", headerName: "ID", width: 200 },
        { field: "prestataires", headerName: "Prestataires", width: 160 ,renderCell:(params)=>{
            return(
                <div className="prod">
                <img className="prod-img" src={params.row.profile.photo} alt='' />
                {params.row.profile.prenom}
                </div>
            )
        }},
        
        { field: "proffession", headerName: "Proffessions", width: 120 ,renderCell:(params)=>{
          return(
              <div className="prod">
              {params.row.profile.proffession}
              </div>
          )
      }},
        {
          field:'date',
          headerName:'Date',
          width:120,
          renderCell:(params)=>{
            return(
              <p>{format(params.row.createdAt)}</p>
            )
          }
        },
               
        {
          field: "numero",
          headerName: "numero",
          width: 100,
        },
         {
          field: "email",
          headerName: "Email",
          width: 160,
        },
        { field: "address", headerName: "Addresses", width: 180 ,renderCell:(params)=>{
          return(
              <div className="prod">
              {params.row.profile.address}
              </div>
          )
        }}, 
        {
            field:'action',
            headerName:'Action',
            width:120 ,
            renderCell:(params)=>{
                return(
                    <>
                    <NavLink to={`/prestataires/${params.row._id}`}>
                    <button className="products-btn-edit">
                    <BorderColorIcon className="edit-btn" />
                    </button>
                    </NavLink>
                    <button className="products-btn-delete"
                    onClick={()=>handleDelete(params.row._id)}>
                    <DeleteIcon className='del'/>
                    </button>
                    </>
                )
            }
        }
      ];

    return (
        <div className='prestataires' >
        {!isInLine && <Navigate to='/login' replace={true} />}
        <DataGrid
        rows={users.filter((user)=> user.isPrestataire)}
        getRowId={(row)=>row._id}
        disableSelectionOnclick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <div>
      <button className='btn-prod' onClick={()=>navigate('/addproducts')}><AddIcon/>Ajouter de nouveaux prestataires</button>
      </div>
        </div>
    );
}

export default Prestataires;
