import React from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
import EmpCard from '../constants/card/Employers';
import data from '../data/EmpData'
const Medecins = () => {
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils medecins</h1>
            <div className='section-ens'>
            {
              data.filter((item => item.proffession.includes('medecin'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Medecins;
