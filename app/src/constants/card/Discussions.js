import React, { useContext, useEffect, useRef } from "react";
import { MyStore } from "../../context/myStore";
import {format} from 'timeago.js'

const Discussions = ({ discussion}) => {
  const chatContainerRef = useRef(null)

  useEffect(()=>{
     scrollToBottom()
  },[discussion])

  const scrollToBottom=()=>{
    if(chatContainerRef.current){
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTo({
        top:chatContainer.scrollHeight,
        behavior:'smooth'
      })
    }
  }

  const {userId} =useContext(MyStore)
  const curent = discussion[0]["discussions"];
  console.log(curent);
  return (
    <>
      {curent.map((item) => (
        <div className={item.userId === userId ? "message own":"message"}  key={item.id} >
          <div className="messageTop">
            <img className="message-img" src={item.image} alt=" " />
            <p>{item.contenu}</p>
          </div>

          <div className="messageBottom">
            <p className="message-times">{format(item.date)}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Discussions;
