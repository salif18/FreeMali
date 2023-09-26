import React from 'react';
import Notify from '../constants/card/Notify';
import { useContext } from 'react';
import { MyStore } from '../context/myStore';

const Notifications = () => {
    const {notifications} = useContext(MyStore)
    
    
    return (
        <div className='notifications'>
          {
            notifications.map((notification)=>(
                <Notify notification={notification} key={notification._id} />
            ))
          }
        </div>
    );
}

export default Notifications;
