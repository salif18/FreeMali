import React, { useContext} from 'react';
// import data from '../data/EmpData';
import EmpCard from '../constants/card/Employers';
import NavbarSearch from '../constants/NavbarSearch';
import { MyStore } from '../context/myStore';



const Search = () => {
    const {valueSearch,users} =useContext(MyStore)
    console.log(users)
   const resultatSearch = users.filter((user)=> user.proffession.includes(valueSearch.toLowerCase()))
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
