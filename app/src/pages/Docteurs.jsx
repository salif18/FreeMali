import React from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
import data from '../data/EmpData'
import EmpCard from '../constants/card/Employers';
const Docteurs = () => {
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils docteurs</h1>
            <div className='section-ens'>
            {
              data.filter((item => item.proffession.includes('docteur'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Docteurs;
