import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../context/myStore';
import Navbar from '../constants/Navbar';
import Conversation from '../constants/card/Conversation';
// import convers from '../data/ConversData';
import Discussions from '../constants/card/Discussions';
import axios from 'axios';
//  import io from 'socket.io-client';
import { Navigate } from 'react-router';

// const socket = io('http://localhost:3002'); 

const Messagerie = () => {
  const {userId,me_User,myProfile,isInLine,conversations,setConversations} = useContext(MyStore)
  const [newMessage,setNewMessage] = useState('')//nouveau text de discusion
  const [currentMessage,setCurrentMessage] =useState(null)//message courante pour etre envoyer dans la zone de discusion
 
  // useEffect(()=>{
  //   socket.on('sendMessage',(discu)=>{
  //     setConvers((convers)=>([...convers,discu]))
  //   });
  //   return ()=>{
  //     socket.off('receiveMessage')
  //   }
  // },[])

  // const handleSend=()=>{
  //   socket.emit('sendMessage',message);
  //   setMessage('')
  // }

  useEffect(()=>{  
    axios.get(`http://localhost:3002/conversations/userId/${userId}`)//recuperation des conversation  de user uniquement
    .then(res =>{
      res && setConversations(res.data)
    }).catch((err)=>console.log(err))
  },[])
  console.log(myProfile)

  //envoie des discussion dans la conversation
  const envoyer = (discussions)=>{
     discussions={ userId:userId, image:myProfile.photo, nom:me_User.nom, contenu:newMessage }
     const id = currentMessage[0]._id;
     axios.put(`http://localhost:3002/conversations/${id}`,{discussions})
     .then((res)=>res.data)
     .catch((err)=>console.log(err));
     setNewMessage('') 
     
  }


    return (
      <>
      <Navbar/>
        <div className='messagerie'>
        {!isInLine && <Navigate to='/connecter' replace={true} />}

        {/*partie ou affiche les conversations recus*/}
        <div className='chatMenu'>
        <div className='chatMenuWrapper'>
          <h1>Conversations</h1>
         {conversations.map((item)=>(
          <div onClick={()=>setCurrentMessage([item])}>
           <Conversation conversation={item}/>
           </div>
          ))}
        </div>
      </div>

       {/*zone ou souvre la converstion discussion*/}
       <div className='chatBox'>
       {currentMessage ?
       <div className='chatBoxWrapper'>

        <div className='chatBoxtop'>
          
          <Discussions discussion={currentMessage} />
        </div>
     
     <div className='chatBoxBottom'>
       <input type='text' 
       className='input-message'
       value={newMessage}
       onChange={(e)=>setNewMessage(e.target.value)}
       placeholder='Ecrit votre message...'
       />
       <button
        className='chatBox-btn' 
        onClick={()=>envoyer()}
       >Envoyer</button>
     </div>
         
     </div>
       :<span className='textread'>Ouvrir un message pour commencer la discussion</span>}
       </div>

      </div>
      </>
    );
}

export default Messagerie;
