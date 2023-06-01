import React from 'react';
import { useParams } from 'react-router';
import Discussions from '../constants/card/Discussions';
import ConversData from '../data/ConversData'

const Chat = () => {
  const {id} = useParams()
  const convers = ConversData.filter((x)=>x.id === id)
  const item = convers[0]
  const discusions = item.discussions
    return (
        <div className='chat'>
        <div className='chatWrapper'>

        <div className='chattop'>
          <h1>discusions</h1>
          
       </div>
     
     <div className='chatBottom'>
       <input type='text' 
       className='input-message'
       />
       <button
        className='chat-btn' 
        
       >envoyer</button>
     </div>
 
     </div>
        </div>
    );
}

export default Chat;
