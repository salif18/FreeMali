import React, { useContext, useEffect, useState, useRef } from "react";
import { MyStore } from "../context/myStore";
import Navbar from "../constants/Navbar";
import Conversation from "../constants/card/Conversation";
import Discussions from "../constants/card/Discussions";
import axios from "axios";
import io from "socket.io-client";
import { Navigate } from "react-router";

// url de socket
const socket = io("http://localhost:3002");

const Messagerie = () => {
  const { userId, isInLine, message, setMessage ,setCurrenChat, currenChat} = useContext(MyStore);

  //contacts des deux chatters
  const [chaters, setChaters] = useState([]);
  //nouveau text de discusion
  const [newMessage, setNewMessage] = useState(""); 

  //recuperer les contact des deux chatters
  useEffect(() => {
    axios
      .get(`http://localhost:3002/chat/${userId}`)
      .then((res) => {
        setChaters(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  //recuperer la conversation des deux personnes
  useEffect(() => {
    axios
      .get(`http://localhost:3002/message/${currenChat?._id}`)
      .then((res) => {
        const data = res.data
        setMessage(data);
      })
      .catch((err) => console.log(err));
  },[currenChat?._id,setMessage]);

  // envoi de message au server par socket.io
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      conversationId: currenChat._id,
      sender: userId,
      text: newMessage,
    };
    socket.emit(`send_message`, message);
    setNewMessage("");
  };

  // recevoir message depuis server par socket.io
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage([...message,data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  //changer le status de message en lue
  const changeStatusMessage =()=>{
    axios
      .put(`http://localhost:3002/message/status/${currenChat?._id}`,{newStatus:'lue'})
      .then(res =>res.data)
      .catch(err => console.log(err))
  }

  //bouton qui envoie la mis a jour de status lue du message recu
  //et appel la fonction currenChat
const handleBtnMultipleRole=(c)=>{
  setCurrenChat(c);
  changeStatusMessage()
}
  // scroll ecrant automatiquement a chaque nouveau text recu
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <Navbar />
      <div className="messagerie">
        {!isInLine && <Navigate to="/connecter" replace={true} />}

        {/*partie ou affiche les conversations recus*/}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h1>Mes conversations</h1>
            {chaters.map((c) => (
              <div onClick={() => handleBtnMultipleRole(c)}>
                <Conversation chaters={c} />
              </div>
            ))}
          </div>
        </div>

        {/*zone ou souvre la converstion discussion*/}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currenChat ? (
              <>
                <div className="chatBoxtop">
                  {message.map((item) => (
                    <div ref={scrollRef}>
                      <Discussions discussion={item} />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <input
                    type="text"
                    className="input-message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ecrit votre message..."
                  />
                  <button
                    className="chatBox-btn"
                    onClick={(e) => handleSubmit(e)}>
                    Envoyer
                  </button>
                </div>
              </>
            ) : (
              <span className="textread"> "" Aucune discussion ouverte ""</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messagerie;
