import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MyStore } from "../context/myStore";
import SharePosition from "../constants/maps/SharePosition";
import CommentPresta from "../constants/cards/CommentPresta";
import MarkunreadIcon from '@mui/icons-material/Markunread';
const SinglePrestataire = () => {
  const {isInLine,token ,userId} =useContext(MyStore)
  const [item, setItem] = useState({});
  const [user , setUser] = useState({})
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageValidation, setMessageValidation] = useState("");

  
  const Headers = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const [commentaires, setCommentaires ] = useState([]);
  useEffect(()=>{
      
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/auth/user/${id}`,Headers);
        if (res) {
          const data = await res.data;
          setUser(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  },[])

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/profiles/prestaProfile/${id}`,Headers);
        if (res) {
          const data = await res.data;
         
          const { avis } = res.data;
          
          setCommentaires(avis);
          setItem(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getItem();
  }, []);

  const statuts = [
    { value: "", label: "Select-status" },
    { value: true, label: "True" },
    { value: false, label: "False" }
  ];

 
const [newStatus ,setNewStatus] = useState('');

 //envoi de formulaire
 const handleSubmitPut = async (e) => {
  e.preventDefault();

  if (newStatus || newStatus.length > 0) {
    try {
      const res = await axios.put(`http://localhost:3002/auth/admin/isprestataire/status/${id}`, {newStatus});
      if (res) {
        await res.data;
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    setMessageValidation("Aucun status choisie");
  }
};

  
// model de notification
const notification = {
  senderId:userId,
  receiverId:id,
  description:'FreeMali a envoye un message',
  type:'message',
  offreId:id
}
    // boutton pour envoyer la notification au prestataire
  const sendNotifications =()=>{
    axios
     .post(`http://localhost:3002/notifications`, notification )
     .then((res) => res.data)
     .catch((err) => console.log(err));
 }
 
    
    const [messages ,setMessages ] = useState('')
    const [sujets , setSujets] = useState('');
    const [viewInput ,setviewInput] = useState(false);

    const handleSubmit = (contacts) => {
      contacts = {userId:user._id ,names:'FreeMali', email:'freemali@gmail.com', sujet:sujets, messages:messages}
      axios
        .post(`http://localhost:3002/courriers`, {...contacts})
        .then((res) => res.data)
        .catch((err) => console.log(err));
        setMessages('');
        setSujets('');
        sendNotifications()
    
    };

  return (
    <div className="singlePrestataire">
    {!isInLine && <Navigate to='/login' replace={true} />}
      <div className="update">
        <div className="update-header">
          <button className="btn-back" onClick={() => navigate("/prestataires")}>
            Retour aux prestataires
          </button>
          <h2>Modifier prestataire</h2>
        </div>
        <div>
          <div>
            
              <div className="formulaire">
                 
                <div className="container-img">
                  <div>
                  <img
                    className="item-image"
                    src={item.photo}
                    alt={item.name}
                  /> 
                  <SharePosition  user={item}/>
                  </div>
                  <div className="intp">
                  <div className="don"><p>Prenom</p> <span>{item.prenom}</span></div>
                  <div className="don"><p>Nom </p><span>{item.nom}</span></div>
                  <div className="don"><p>Contact</p> <span>{item.numero}</span></div>
                  <div className="don"><p>Satuts</p> <span>{user['isPrestataire']}</span></div>
                  <div className="don"><p>Proffession</p> <span>{item.proffession}</span></div>
                  <div className="don"><p>Categories</p> <span>{item.categorie}</span></div>
                  <div className="don"><p>Address</p> <span>{item.address}</span></div>
                  </div>
                 
                </div>
                <div>
                <label htmlFor="category">Prestataire ?</label>
                <br />
                <select
                    value={newStatus}
                    onChange={(e)=>setNewStatus(e.target.value)}
                    className="inputForm">
                    {statuts.map((stats) => (
                    <option key={stats.value} value={stats.value}>
                       {stats.label}
                    </option>
                    ))}
                </select>
                <div>
                <button
                  className="btn-save"
                  type="submit"
                  onClick={handleSubmitPut}
                  >
                  Enregistrer
                  <SaveIcon style={{ marginLeft: 10 }} />
                </button>
                <p className="lien-offre-retenu" onClick={()=>navigate(`/offre/retenue/${id}`)} >Les Projets </p>
              </div>
              <button className='btn email'>
         <a href={`mailto:${user.email}`} >
         Envoyer email <MarkunreadIcon style={{marginLeft:10}}/>
         </a>
         </button>
         <button className='btn email' onClick={()=>setviewInput(!viewInput)}><span>Envoyer message</span></button>


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

              </div>
              </div>
             
          </div>
          
        </div>

        <div className="infos-sur-prod">
          <div className="notes">
            <h3 className="title-note">Nombres d'appreciation</h3>
            <p>{item.likes}</p>
          </div>  
          <div className="notes">
            <h3 className="title-note">Nombres depreciations</h3>
            <p>{item.disLikes}</p>
          </div>
          </div>
          <h2 className="titre-com">Les commentaires</h2>
          <div className="zone-comment">
              {  
                  commentaires.map((item)=>( 
                 <CommentPresta item={item} key={item._id} />))
              }
          </div>
        </div>
      </div>
    
  );
};

export default SinglePrestataire;
