import React, { useContext } from 'react';
import Sidebar from '../constants/blogs/Sidebar';
import Navbar from '../constants/Navbar';
// import data from '../data/EmpData'
import { MyStore } from '../context/myStore';
import EmpCard from '../constants/card/Employers';

const Animateur = () => {
  const {users} = useContext(MyStore)
  console.log(users)
    return (
        <>
        <Navbar/>
        <div className='blogs'>
        <Sidebar/>
            <div className='main-container'>
            <h1>Nos profils animateurs</h1>
            <div className='section-ens'>
            {
              users.filter((item => item.proffession.includes('animateurs'))).map((item)=>(
                  <EmpCard item={item}/>
              ))
            }
          </div>
            </div>
        </div>
        </>
    );
}

export default Animateur;
