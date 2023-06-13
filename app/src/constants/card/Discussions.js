import React, { useContext } from "react";
import { MyStore } from "../../context/myStore";
import { format } from "timeago.js";

const Discussions = ({ discussion }) => {
  const { myProfile, invite, userId } = useContext(MyStore);

  return (
    <>
      <div className={discussion.sender === userId ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="message-img"
            src={
              discussion?.sender === userId ? myProfile?.photo : invite?.photo
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
