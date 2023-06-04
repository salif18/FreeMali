import React, { useContext } from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
import EmpCard from '../constants/card/Employers';
//import data from '../data/EmpData'
import { MyStore } from '../context/myStore';

const Mecaniciens = () => {
const {users} = useContext(MyStore)
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils mecaniciens</h1>
            <div className='section-ens'>
            {
              users.filter((item => item.proffession.includes('mecanicien'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Mecaniciens;
