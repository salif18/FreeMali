import React from 'react';


const Conversation = ({conversation}) => {

    return (
       <div className='conversation' key={conversation._id}>
          <img className='convers-img' src={conversation.image} alt=''/>
          <span className='convers-name'>{conversation.nom}</span>
       </div>
    );
}

export default Conversation;
