import React from 'react';
import data from '../../data/EmpData'
import EmpCard from '../card/Employers';
import { useNavigate } from 'react-router';
const Quelques = () => {
    const navigate = useNavigate()
    return (
        <div className='quelques'>
        
            <h1 className='h-h1'>Trouver les meilleurs experts employés  pour vos projets</h1>
            <div className='container-quelques'>
            
             {
               data.slice(0,4).map(item => (
                <EmpCard item={item}/>
               ))
             }
             
            </div>
            <button onClick={()=>navigate('/blogs')} className='btn-qlq'>Voirs tous les employes &#8594;</button>
           
        </div>
    );
}

export default Quelques;
