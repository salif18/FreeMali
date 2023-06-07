import React, { useContext } from 'react';
import { MyStore } from '../../context/myStore';
import axios from 'axios';


const Conversation = ({conversation}) => {
const {me_User} = useContext(MyStore)

const handledeleteConver=()=>{
   axios.delete(`http://localhost:3002/conversations/${conversation._id}`)//suprimer la conversations
}
    return (
       <div className='conversation' key={conversation._id}>
         <img className='convers-img' src={conversation.image} alt=''/>
          <span className='convers-name'>{conversation.nom}</span>
          <button className='btn-convers-del' onClick={handledeleteConver}>x</button>
       </div>
    );
}

export default Conversation;
