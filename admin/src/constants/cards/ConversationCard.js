import React, { useContext, useEffect } from "react";
import { MyStore } from "../../context/myStore";
import axios from "axios";


const ConversationCard = ({contacts}) => {
    const { userId, defaultImage, invite, setInvite,message } = useContext(MyStore);

    //recuperer autre interlocuteur et ses donnees en filtrant userid
    const id = contacts.membres.filter((x) => x !== userId);
  
    useEffect(() => {
      const getInvite = () => {
        axios
          .get(`http://localhost:3003/authentification/onecustomer/64b06ee8332e8785fe8cdd37`)
          .then((res) => {
            setInvite((invite)=>([...invite,res.data]));
          })
          .catch((err) => console.log(err));
      };
      getInvite();
    }, []);
  
  //filtrer les message par non lue
  const message_No_read = message.filter( c => c.status.includes('non lue') && c.conversationId === contacts._id )
  
   //recuperer le profile de chaque discuteur
    const receivers = invite.filter(c => c._id == id).map(c => {
      return c
    })
    const receiver = receivers[0]
  console.log(receiver)
  
    const handledeleteConver = () => {
      axios.delete(`http://localhost:3003/messages/${contacts._id}`); //suprimer la conversations
    };
    return (
        <div className='conversationcard'>
        <img
        className="convers-img"
        src={receiver?.photo ? receiver?.photo : defaultImage}
        alt=""
      />
      <span className="convers-name">{receiver?.username}</span>
      {/*<button className="btn-convers-del" onClick={handledeleteConver}>
        x
  </button>*/}
      {/*<span className="longuer-array">{message_No_read.length}</span>*/}
        </div>
    );
}

export default ConversationCard;
