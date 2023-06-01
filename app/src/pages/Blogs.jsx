import React, { useContext, useEffect} from 'react';
import Navbar from '../constants/Navbar';
import Sidebar from '../constants/blogs/Sidebar';
import EmpCard from '../constants/card/Employers';
//  import data from '../data/EmpData';
// import Footer from '../constants/Footer';
import axios from 'axios'
import { MyStore } from '../context/myStore';

const Blogs = () => {
   const {prestataires,setPrestataires} = useContext(MyStore)

   useEffect(()=>{
       axios.get('http://localhost:3002/auth/prestataire')
       .then((res)=>{
        res && setPrestataires(res.data)
       }).catch((Err)=>console.log(Err))
   },[])


    return (
            <>
            <Navbar/>
            <div className='blogs'>
            <div className='side'>
              <Sidebar/>
            </div>
            
             <div className='main-container'>
              <h1>Choisissez votre employe pour son savoir-faire</h1>
              <div className='section-ens'>
              {
                prestataires.filter((item => item.isPrestataire)).map((item)=>(
                    <EmpCard item={item}/>
                ))
              }
            </div>
             </div>
            </div>
            </>
        
    );
}

export default Blogs;
