import React, { useContext,useState } from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";


const Discussions = ({ discussion}) => {
  const { myProfile, invite, userId, currenChat } = useContext(MyStore);

   //recuperer autre interlocuteur et ses donnees en filtrant userid
   const id = currenChat.membres.filter((x) => x !== userId);

  //  recuperer le profile de chaque discuteur
  const receivers = invite.filter(c => c.userId == id).map(c => {
    return c
  })
  const receiver = receivers[0]

  return (
    <>
      <div className={discussion.sender === userId ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="message-img"
            src={
              discussion.sender === userId ? myProfile.photo : receiver.photo
            }
            alt=" "
          />
          <p>{discussion.text}</p>
          
        </div>

        <div className="messageBottom">
          <p className="message-times">{format(discussion.createdAt)}</p>
        </div>
      </div>
    </>
  );
};

export default Discussions;
