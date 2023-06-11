import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../../context/myStore';
import axios from 'axios';

// {conversation}
const Conversation = ({chaters}) => {
const {userId,defaultImage,invite,setInvite} = useContext(MyStore)

//recuperer autre interlocuteur et ses donnees en filtrant userid 
useEffect(()=>{
   const id = chaters.membres.find( x => x !== userId)
   const getInvite =()=>{
      axios.get(`http://localhost:3002/profiles/yourProfile/${id}`)
      .then(res =>{
         setInvite(res.data)
      }).catch(err => console.log(err))
   };
   getInvite()
},[chaters,setInvite,userId])


const handledeleteConver=()=>{
   axios.delete(`http://localhost:3002/conversations/${chaters._id}`)//suprimer la conversations
}
    return (
       <div className='conversation' key={chaters._id}>
         <img className='convers-img' src={invite?.photo ? invite.photo :defaultImage} alt=''/>
          <span className='convers-name'>{invite?.prenom}</span>
          <button className='btn-convers-del' onClick={handledeleteConver}>x</button>
       </div>
    );
}

export default Conversation;

// <div className='conversation' key={conversation._id}>
//          <img className='convers-img' src={userId === conversation.userId ? conversation.imageSender : conversation.image} alt=''/>
//           <span className='convers-name'>{userId === conversation.userId ? conversation.nomSender : conversation.nom}</span>
//           <button className='btn-convers-del' onClick={handledeleteConver}>x</button>
//        </div>