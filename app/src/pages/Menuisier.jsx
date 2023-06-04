import React, { useContext } from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
import EmpCard from '../constants/card/Employers';
// import data from '../data/EmpData'
import { MyStore } from '../context/myStore';

const Menuisier = () => {
const {users} = useContext(MyStore)
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils menuisiers</h1>
            <div className='section-ens'>
            {
              users.filter((item => item.proffession.includes('menuisier'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Menuisier;
