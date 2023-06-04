import React, { useContext } from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
// import data from '../data/EmpData'
import EmpCard from '../constants/card/Employers';
import { MyStore } from '../context/myStore';

const Dj = () => {
  const {users} = useContext(MyStore)
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils Dj</h1>
            <div className='section-ens'>
            {
              users.filter((item => item.proffession.includes('dj'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Dj;
