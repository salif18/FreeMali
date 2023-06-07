import React, { useContext } from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
//import data from '../data/EmpData'
import EmpCard from '../constants/card/Employers';
import { MyStore } from '../context/myStore';

const Avocats = () => {
  const {users} = useContext(MyStore)
  const prestataires = users.filter((presta) =>  presta.isPrestataire)
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils avocats</h1>
            <div className='section-ens'>
            {
              prestataires.filter((item => item['profile'].proffession.includes('avocat'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Avocats;
