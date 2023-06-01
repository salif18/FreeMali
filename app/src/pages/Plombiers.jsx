import React from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
import EmpCard from '../constants/card/Employers';
import data from '../data/EmpData'
const Plombiers = () => {
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils Plombiers</h1>
            <div className='section-ens'>
            {
              data.filter((item => item.proffession.includes('plombier'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Plombiers;
