import React, { useContext, useEffect } from "react";
import { MyStore } from "../../context/myStore";
import axios from "axios";

// {conversation}
const Conversation = ({ contacts }) => {
  const { userId, defaultImage, invite, setInvite } = useContext(MyStore);

  //recuperer autre interlocuteur et ses donnees en filtrant userid
  useEffect(() => {
    const id = contacts.membres.filter((x) => x !== userId);
    const getInvite = () => {
      axios
        .get(`http://localhost:3002/profiles/prestaProfile/${id}`)
        .then((res) => {
          setInvite(res.data);
        })
        .catch((err) => console.log(err));
    };
    getInvite();
  }, [contacts, setInvite, userId]);


  const handledeleteConver = () => {
    axios.delete(`http://localhost:3002/message/${contacts._id}`); //suprimer la conversations
  };
  
  return (
    <div className="conversation" key={contacts._id}>
      <img
        className="convers-img"
        src={invite?.photo ? invite.photo : defaultImage}
        alt=""
      />
      <span className="convers-name">{invite?.prenom}</span>
      <button className="btn-convers-del" onClick={handledeleteConver}>
        x
      </button>
    </div>
  );
};

export default Conversation;
