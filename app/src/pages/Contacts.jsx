import React, { useContext, useEffect, useState } from "react";
import Navbar from "../constants/Navbar";
import Footer from "../constants/Footer";
import axios from 'axios';
import { MyStore } from "../context/myStore";
import { useNavigate } from "react-router";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Contacts = () => {
    const {userId, isInLine,setUsers,setClients,setAdmin,admin, token,domaineURL } = useContext(MyStore);
    const navigate = useNavigate()
 
    
    const Headers = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
        
      },
    };
    
    useEffect(()=>{
      axios.get(`${domaineURL}/profils/admin`,Headers)
      .then(res => setAdmin(res.data))
      .catch(err => console.log(err))
  },[])
  
 
    //recuperer les products
    useEffect(()=>{
      axios.get(`${domaineURL}/auth/users&Profile`,Headers)
      .then((res)=>{
        res && setUsers(res.data);
        setClients(res.data.filter((x)=>x.isPrestataire === false))
      }).catch(err => console.log(err))
    },[]);

  const [contacts, setContacts] = useState({
    userId:"",
    names: "",
    email: "",
    sujet: "",
    messages: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContacts({ ...contacts, [name]: value });
  };

  const adm = admin[0]
 
  // model de notification
const notification ={
  adminId:adm?.userId,
  senderId:userId,
  description:'a envoyer un message',
  type:'message',
  
}


  // boutton pour envoyer la notification au prestataire
const sendNotifications =()=>{
  axios
   .post(`${domaineURL}/notifications`, notification,Headers)
   .then((res) => res.data)
   .catch((err) => console.log(err));
}
  
  const { names, email , sujet, messages} = contacts
  const handleSubmit=()=>{
    if(isInLine){
    if(names.length > 0 && email.length > 0 && sujet.length > 0 && messages.length > 0){
    axios.post(`${domaineURL}/courriers`,{...contacts, userId} )
    .then(res => res.data)
    .catch(err => console.log(err));
    setContacts({
      userId:"",
    names: "",
    email: "",
    sujet: "",
    messages: "",
    });
    sendNotifications()
    }else{
        console.log('remplis les champs')
    }
  }else{
     navigate('/connecter')
  }
  };

  const handleAnuller =()=>{
    setContacts({
    userId:"",
    names: "",
    email: "",
    sujet: "",
    messages: "",
    });

  }

  return (
    <>
    <Navbar/>
    <div className="contactss">
    <div className="titree">
      <h2>Nous contacter</h2>
     </div>
      <div className="container-contact">
        <div className="champs-contact">
          <form >
            <div>
              <input
                className="form-controlm"
                type="text"
                name="names"
                value={contacts.names}
                placeholder="Nom complet"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <input
                className="form-controlm"
                type="email"
                name="email"
                value={contacts.email}
                placeholder="Address email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <input
                className="form-controlm"
                type="text"
                name="sujet"
                value={contacts.sujet}
                placeholder="Sujet"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <textarea
                className="form-textaream"
                rows='2'
                cols='50'
                name='messages'
                value={contacts.messages}
                placeholder="Message"
                onChange={(e) => handleChange(e)}>
              </textarea>
            </div>
            <div className="btn-conta">
              <button className="btn-envoie-message" onClick={(e)=>handleSubmit(e)}>Envoyer</button>
              <button className="btn-annule-message" onClick={()=>handleAnuller()}>Annuler</button>
            </div>
          </form>
        </div>
        <div className="ling"></div>
        <div className="contacter-reseau">
          <h2>Retrouvez nous sur</h2>
          <div className="soci">
          <FacebookSharpIcon className="icon" />
            <LinkedInIcon className="icon" />
            <InstagramIcon  className="icon"/>
            <WhatsAppIcon className="icon"/>
            <TwitterIcon className="icon"/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contacts;
