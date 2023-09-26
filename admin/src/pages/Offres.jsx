import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../context/myStore';
import {  Navigate } from 'react-router-dom';
import Offrescard from '../constants/cards/Offrescard';
import axios from 'axios';


const Offres = () => {
    const { setOffres, offres,token, isInLine } = useContext(MyStore)

    const [valeurShow, setValeurShow] = useState(offres.length);
    const selcectionNumber = [{value:offres.length,label:'Afficher tous '},
    {value:5,label:5},{value:10,label:10},{value:20,label:20},{value:50,label:50},{value:100,label:100}]
 
    
  const Headers = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
     //recuperer les commandes
     useEffect(()=>{
      axios.get('http://localhost:3002/offres',Headers)
      .then((res)=>{
        res && setOffres(res.data)
      }).catch(err => console.log(err))
    },[]);

    
    return (
        <div className='offre'>
        {!isInLine && <Navigate to='/login' replace={true} />}
        <div>
        <form className='headers'>
          <div>
              <select className='select' value={valeurShow} onChange={(e)=>setValeurShow(e.target.value)}>
                  {selcectionNumber.map((item,index)=>(<option className='option' value={item.value} key={index}>{item.label}</option>))}
              </select>
          </div>
        </form>
      </div>
          <div className='tableaux'>
             <table className='tab'>
             <thead >
               <tr className='mythead'>
                  <th className='title-tab'>Photo</th>
                  <th className='title-tab'>Auteurs</th>
                  <th className='title-tab'>Contenu</th>
                  <th className='title-tab'>Date</th>
                  <th className='title-tab'>Actions</th>
               </tr>
               </thead>
               {!valeurShow &&
                offres.map((item)=>
                (<tbody className='tbody' key={item._id}>
                <Offrescard item={item} />
               </tbody>
               ))}
               
               {
                offres.slice(0, valeurShow).map((item)=>
                (<tbody className='tbody' key={item._id}>
                <Offrescard item={item} />
               </tbody>
               ))}
             </table>
          </div>
      </div>
        
    );
}

export default Offres;
