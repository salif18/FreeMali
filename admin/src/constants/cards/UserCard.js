import React, { useContext } from 'react';
import { MyStore } from '../../context/myStore';

const UserCard = ({client}) => {
    const {defaultImage } = useContext(MyStore)
    return (
        <div className='userCard'>
            <div>
            <img src={client ? client.profile.photo :defaultImage} alt='' />
            </div>
            <div className='infos'>
              <p>{client.profile.prenom}</p>
              <p>{client.numero}</p>
            </div>
        </div>
    );
}

export default UserCard;
