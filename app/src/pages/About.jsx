import React, { useEffect, useState } from 'react';
import Navbar from '../constants/Navbar'
import {ClipLoader} from 'react-spinners';

const About = () => {
//spinner
const [loading,setloading]=useState(false)

useEffect(()=>{
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },1000)
},[])
    return (
        <>
        <Navbar/>
        {
            loading ? <div className='clip-card'>
                       <ClipLoader  />
                       <p>Chargement en  cours...</p>
                      </div> 
                    :
        <main className='abouts'>
         <div className='baner-about'>
          <div className='titre'>
            <h1>A propos de FreeMali</h1>
          </div>
         </div>
            
        </main>
       }
        </>
    );
}

export default About;
