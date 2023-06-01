import React, { useContext } from 'react';
import { MyStore } from '../context/myStore';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Notifications = () => {
    const {notifications,addNotification,removeNotification} = useContext(MyStore)
   
    const handleNewMessage =()=>{
        const newMessage ='Vous avez recu un nouveau message';
        toast.info(newMessage,{position:toast.POSITION.BOTTOM_RIGHT})
        
        const notification ={id:Date.now(),message:newMessage}
        addNotification(notification)
    }

    const handleNewComment =()=>{
        const newComment ='Vous avez recu un nouveau commentaire';
        toast.info(newComment,{position:toast.POSITION.BOTTOM_RIGHT})
        const notification = {id:Date.now() , message:newComment}
        addNotification(notification)
    }


    return (
        <div className='notifications'>
        <div>
            <button onClick={handleNewMessage}>Recevoire un nouveau message</button>
            <button onClick={handleNewComment}>Recevoire un nouveau commentaire</button>
        </div>
        {
            notifications.map((notification)=>(
                <div key={notification.id}>
                  <p>{notification.message}</p>
                  <button onClick={()=>removeNotification(notification.id)}>x</button>
                </div>
            ))
        }
        </div>
    );
}

export default Notifications;
