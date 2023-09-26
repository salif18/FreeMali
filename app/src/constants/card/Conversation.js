import React, { useContext, useEffect } from "react";
import { MyStore } from "../../context/myStore";
import axios from "axios";

// {conversation}
const Conversation = ({ contacts }) => {
  const { domaineURL,userId, defaultImage,currenChat, invite, setInvite,message } = useContext(MyStore);

  //recuperer autre interlocuteur et ses donnees en filtrant userid
  const id = contacts.membres.filter((x) => x !== userId);

  useEffect(() => {
    const getInvite = () => {
      axios
        .get(`${domaineURL}/profiles/prestaProfile/${id}`)
        .then((res) => {
          setInvite((invite)=>([...invite,res.data]));
        })
        .catch((err) => console.log(err));
    };
    getInvite();
  }, [contacts, setInvite, id]);

//filtrer les message par non lue
const message_No_read = message.filter( c => c.status.includes('non lue') && c.conversationId === contacts._id )

 //recuperer le profile de chaque discuteur
  const receivers = invite.filter(c => c.userId == id).map(c => {
    return c
  })
  const receiver = receivers[0]


  const handledeleteConver = () => {
    axios.delete(`${domaineURL}/message/${contacts._id}`); 
  };

  //changer le status de message en lue
  const changeStatusMessage =()=>{
    
    axios
      .put(`${domaineURL}/message/status/${currenChat._id}`,{newStatus:'lue'})
      .then(res =>res.data)
      .catch(err => console.log(err))
    
  }

  
  return (
    <div className="conversation" key={contacts._id} onClick={changeStatusMessage}>
      <img
        className="convers-img"
        src={(receiver && receiver.photo) ? receiver.photo : defaultImage}
        alt=""
      />
      {/*<span className="message-length" >{message_No_read.length}</span>*/}
      <span className="convers-name">{receiver && receiver.prenom}</span>
      
    </div>
  );
};

export default Conversation;
