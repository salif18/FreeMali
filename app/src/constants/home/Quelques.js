import React, { useContext } from 'react';
// import data from '../../data/EmpData'

import { useNavigate } from 'react-router';
import { MyStore } from '../../context/myStore';
import Employers from '../card/Employers';
const Quelques = () => {
    const {users} = useContext(MyStore)
    const navigate = useNavigate()
    return (
        <div className='quelques'>
        
            <h1 className='h-h1'>Trouver les meilleurs prestataires experts qualifies pour vos services</h1>
            <div className='container-quelques'>
            
             {
               users.slice(0,3).filter((pre => pre.isPrestataire === true)).map(item => (
                <Employers item={item}/>
               ))
             }
             
            </div>
            <button onClick={()=>navigate('/blogs')} className='btn-qlq'>Voirs tous les prestataires &#8594;</button>
           
        </div>
    );
}

export default Quelques;
