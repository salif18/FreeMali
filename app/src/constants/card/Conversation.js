import React, { useContext, useEffect } from "react";
import { MyStore } from "../../context/myStore";
import axios from "axios";

// {conversation}
const Conversation = ({ contacts }) => {
  const { userId, defaultImage, invite, setInvite,message } = useContext(MyStore);

  //recuperer autre interlocuteur et ses donnees en filtrant userid
  const id = contacts.membres.filter((x) => x !== userId);

  useEffect(() => {
    const getInvite = () => {
      axios
        .get(`http://localhost:3002/profiles/prestaProfile/${id}`)
        .then((res) => {
          setInvite((invite)=>([...invite,res.data]));
        })
        .catch((err) => console.log(err));
    };
    getInvite();
  }, [contacts, setInvite, id]);

  //filtrer les message par non lue
  const message_No_read = message.filter( c => c.status.includes('non lue'))
 //recuperer le profile de chaque discuteur
  const receivers = invite.filter(c => c.userId == id).map(c => {
    return c
  })
  const receiver = receivers[0]
console.log(receiver)

  const handledeleteConver = () => {
    axios.delete(`http://localhost:3002/message/${contacts._id}`); //suprimer la conversations
  };
  
  return (
    <div className="conversation" key={contacts._id}>
      <img
        className="convers-img"
        src={receiver?.photo ? receiver?.photo : defaultImage}
        alt=""
      />
      <span className="convers-name">{receiver?.prenom}</span>
      <button className="btn-convers-del" onClick={handledeleteConver}>
        x
      </button>
      {<span>{message_No_read.length}</span>}
    </div>
  );
};

export default Conversation;
