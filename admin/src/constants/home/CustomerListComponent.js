import React, { useContext } from 'react';
import { MyStore } from '../../context/myStore';
import UserCard from '../cards/UserCard';

const CustomerListComponent = () => {
    const {clients } = useContext(MyStore);

    return (
        <div className='customerListComponent'>
            <h2>Employeurs</h2>
            {
                clients.slice(0,5).map((client)=>(
                    <UserCard client={client} key={client._id}/>
                ))
            }
        </div>
    );
}

export default CustomerListComponent;
