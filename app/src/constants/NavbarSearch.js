import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useContext } from 'react';
import { MyStore } from '../context/myStore';

const NavbarSearch = () => {
    const {valueSearch,handleChange} = useContext(MyStore)
    return (

        <nav className='navbar'>
        <div className='navbar-left'>
        <h1 className='navh2'>FreeMali</h1>
        </div>
        <div className='navbar-rigth'>
        
         <input className='input-search2' value={valueSearch} onChange={handleChange} placeholder='Recherche de profil...'/>
         <button className='btn-search'><SearchSharpIcon style={{color:'#ffff', fontWeight:'bold',fontSize:30}} /></button>
         
         <div className='navbar-rigth-sociaux'>
        
        </div>
        </div>
    </nav>
        
    );
}

export default NavbarSearch;
