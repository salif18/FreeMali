import React, { useContext, useEffect, useState} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { MyStore } from "../context/myStore";
import EditIcon from '@mui/icons-material/Edit';
import CourriersCard from "../constants/cards/CourriersCard";
import ArchiveIcon from '@mui/icons-material/Archive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const Messagerie = () => {
    const { userId,setClients,setUsers, token, users, couriers, setCouriers, isInLine } = useContext(MyStore);
    const navigate = useNavigate();


    const Headers = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    
    //recuperer les products
    useEffect(()=>{
      axios.get('http://localhost:3002/auth/users&Profile',Headers)
      .then((res)=>{
        res && setUsers(res.data);
        setClients(res.data.filter((x)=>x.isPrestataire === false))
      }).catch(err => console.log(err))
    },[]);
    
    useEffect(()=>{
         axios.get('http://localhost:3002/courriers',Headers)
         .then(res => 
          setCouriers(res.data)
          ).catch(err => console.log(err)) 
    },[])

     
    const [afficherConfirmation, setAfficherConfirmation] = useState(false);

    const afficherMessageConfirmation = () => {
      setAfficherConfirmation(true);
    };
  
    const annulerSuppression = () => {
      setAfficherConfirmation(false);
    };
  
    const confirmerArchive = () => {
      setAfficherConfirmation(false);
      // Appelez ici la fonction de suppression réelle
      // props.onSuppression() ou quelque chose de similaire
      couriers.map((archive)=>(
        axios.post('http://localhost:3002/archives/couriers',archive,Headers)
        .then(res => res.data)
        .catch(err => console.log(err))
       ))
    };


     
    const [messages ,setMessages ] = useState('')
    const [sujets , setSujets] = useState('');
    const [viewInput ,setviewInput] = useState(false);

    // boutton pour envoyer la notification a un ensemble de groupe prestataire en un clic
  const sendNotifications =()=>{
    users.map((x)=>
      axios
     .post(`http://localhost:3002/notifications`,
     { 
       senderId:userId,
       receiverId:x._id,
       description:'freeMali a envoyer un message',
       type:'message'
      })
     .then((res) => res.data)
     .catch((err) => console.log(err))
    )
 }

    const handleSubmit = (e) => {
      e.preventDefault();
      users.map((x)=>
      axios
        .post(`http://localhost:3002/courriers`, {
          userId:x._id ,names:'FreeMali', email:'freemali@gmail.com', sujet:sujets, messages:messages
        },Headers)
        .then((res) => res.data)
        .catch((err) => console.log(err)) 
      )
      setMessages('');
      setSujets('');
      sendNotifications()
    };
  
    return (
        <div className='messagerie'>
        {!isInLine && <Navigate to='/login' replace={true} />}
        {/*partie ou affiche les conversations recus*/}
        <div className="new-message">
          <button className="btn-new-message" onClick={()=>setviewInput(!viewInput)}> <EditIcon/> Messages à tous </button>
          <div>
          <button className="btn-archive-courier" onClick={afficherMessageConfirmation}> <ArchiveIcon/> Tous Archiver</button>
          {afficherConfirmation && (
            <div className='pops'>
              <p>Voulez-vous vraiment archiver ?</p>
              <div className='btn-confirm'>
              <button className='oui' onClick={confirmerArchive}>Oui</button>
              <button className='non' onClick={annulerSuppression}>Non</button>
            </div>
            </div>
          )}
          </div>
          <button className="btn-archive-courier" onClick={()=>navigate(`/archive/courrier`)}><AccessTimeIcon/> Voir Archives</button>

        </div>

        {viewInput && <div className='zone-de-reponse'>
        <input value={sujets} onChange={(e)=>setSujets(e.target.value)} placeholder='Sujet :'/>
        <textarea 
          className="textar"   
          name='messages' 
          cols='50' 
          rows='2.5' 
          value={messages} 
          placeholder='Message...'
          onChange={(e)=> setMessages(e.target.value)}></textarea>
        <button className='reponse-envoyer' onClick={handleSubmit} >
          Envoyer
         </button>
       </div>
      }

        <div className="chatMenus">
         
         { couriers ? (couriers.map((item)=>(
          <CourriersCard item={item} key={item._id} />
         )))
          
           : (  <span className="textread"> "" Aucune discussion ouverte ""</span> )
         }  
          </div>
        </div>
    );
}

export default Messagerie;
