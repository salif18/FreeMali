import React, { useEffect, useState } from 'react';
import Navbar from '../constants/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import { MyStore } from '../context/myStore';
import axios from "axios";
import {  Navigate, useNavigate } from "react-router";
import CourriersCard from '../constants/card/CourriersCard';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {ClipLoader} from 'react-spinners';
import Footer from '../constants/Footer';


const Courriers = () => {
    const { isInLine,userId ,setAdmin, token, domaineURL } = useContext(MyStore);
    const [couriers , setCouriers] = useState([]);
    const navigate = useNavigate()
    const Headers = {
      Headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    //spinner
const [loading,setloading]=useState(false)

useEffect(()=>{
  setloading(true)
  setTimeout(()=>{
    setloading(false)
  },1000)
},[])


    useEffect(()=>{
      axios.get(`${domaineURL}/profils/admin`,Headers)
      .then(res => setAdmin(res.data))
      .catch(err => console.log(err))
  },[])
  
    useEffect(()=>{
        axios.get(`${domaineURL}/courriers/mycouriers/${userId}`,Headers)
        .then((res) => setCouriers(res.data))
        .catch((err)=>console.log(err))
    },[])

   

    const [afficherConfirmation, setAfficherConfirmation] = useState(false);

    const afficherMessageConfirmation = () => {
      setAfficherConfirmation(true);
    };
  
    const annulerSuppression = () => {
      setAfficherConfirmation(false);
    };
  
    const confirmerSuppression = () => {
      setAfficherConfirmation(false);
      axios.delete(`${domaineURL}/courriers/${userId}`)
      .then(res => res.data)
      .catch(err => console.log(err))
    };

    return (
        <>
        <Navbar/>
        {
          loading ? <div className='clip-card'>
                     <ClipLoader  />
                     <p>Chargement en  cours...</p>
                   </div> 
                :
          <main className='courrier'>
        {!isInLine && <Navigate to='/login' replace={true} />}
        {/*partie ou affiche les conversations recus*/}
        <div className="new-message">
        <div>
          <button className="btn-new-message" onClick={()=>navigate('/courrier')}> <EditIcon/> Votre boite de reception</button>
          <button className="btn-archive-courier" onClick={afficherMessageConfirmation}> <BackspaceIcon/> Tous supprimer</button>
          </div>
          {afficherConfirmation && (
            <div className='pops'>
              <p>Voulez-vous vraiment supprimer ?</p>
              <div className='btn-confirm'>
              <button className='oui' onClick={confirmerSuppression}>Oui</button>
              <button className='non' onClick={annulerSuppression}>Non</button>
            </div>
            </div>
          )}
        </div>
        <div className="chatMenu-courier">
         
         { couriers ? (couriers.map((item)=>(
          <CourriersCard item={item} key={item._id} />
         )))
          
           : (  <span className="textread"> "" Aucune discussion ouverte ""</span> )
         }  
          </div>
        </main>
        }
       <Footer/>
        </>
    );
}

export default Courriers;
