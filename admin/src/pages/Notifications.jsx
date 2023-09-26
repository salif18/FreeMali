import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import { MyStore } from '../context/myStore';
import CardNotification from '../constants/cards/cardNotification';
import axios from 'axios'
const Notifications = () => {
    const { isInLine,userId,setNotifications, notifications} = useContext(MyStore)
    

      // recuperer ses notification 
useEffect(()=>{
    axios
     .get(`http://localhost:3002/notifications/receiver/admin/${userId}`)
     .then((res)=> {
      setNotifications(res.data)
    })
     .catch((err)=>console.log(err))
  },[])
  
  
    return (
        <div className='notifications'>
        {!isInLine && <Navigate to='/login' replace={true} />}
        {
            notifications?.map((notification)=>(
                <CardNotification notification={notification} key={notification._id} />
            ))
          }
        </div>
    );
}

export default Notifications;
