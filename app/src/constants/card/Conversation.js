import React, { useContext, useEffect } from "react";
import { MyStore } from "../../context/myStore";
import axios from "axios";

// {conversation}
const Conversation = ({ chaters }) => {
  const { userId, defaultImage, invite, setInvite } = useContext(MyStore);

  //recuperer autre interlocuteur et ses donnees en filtrant userid
  useEffect(() => {
    const id = chaters.membres.filter((x) => x !== userId);
    const getInvite = () => {
      axios
        .get(`http://localhost:3002/profiles/prestaProfile/${id}`)
        .then((res) => {
          setInvite(res.data);
        })
        .catch((err) => console.log(err));
    };
    getInvite();
  }, [chaters, setInvite, userId]);


  const handledeleteConver = () => {
    axios.delete(`http://localhost:3002/message/${chaters._id}`); //suprimer la conversations
  };
  
  return (
    <div className="conversation" key={chaters._id}>
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
