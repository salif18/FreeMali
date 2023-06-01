import React, { useContext, useState } from 'react';
import data from '../data/EmpData';
import EmpCard from '../constants/card/Employers';
import Navbar from '../constants/Navbar';
import NavbarSearch from '../constants/NavbarSearch';
import { MyStore } from '../context/myStore';
import Footer from '../constants/Footer';


const Search = () => {
    const {valueSearch,} =useContext(MyStore)

   const resultatSearch = data.filter((x)=> x.proffession.includes(valueSearch.toLowerCase()))
    return (
        <>
       <NavbarSearch/>
        <div className='search'>
        {valueSearch && <p className='search-p'>({resultatSearch.length}) profils trouves...</p>}
            <div className='container-result'>
             {valueSearch &&
                resultatSearch.map(item => (
                    <EmpCard item={item}/>
                ))
             }
            </div>
             
        </div>
       
        </>
    );
}

export default Search;
