import React from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
import data from '../data/EmpData'
import EmpCard from '../constants/card/Employers'
const Enseignants = () => {
    
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils enseignants</h1>
            <div className='section-ens'>
              {
                data.filter((item => item.proffession.includes('enseignant'))).map((item)=>(
                    <EmpCard item={item}/>
                ))
              }
            </div>
            </div>
        </div>
        </>
    );
}

export default Enseignants;
