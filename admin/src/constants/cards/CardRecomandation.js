import React, { useContext } from 'react';
import { format } from 'timeago.js'
import { MyStore } from '../../context/myStore';
const CardRecomandation = ({item}) => {
    const { users } = useContext(MyStore);
    const auteur = users.filter((it) => it._id === item.userId);
    const aut = auteur[0];

    return (
        <div className='recom'>

            <div className='img-recom'>
              <p>{aut?.profile.prenom}</p>
              <img src={aut?.profile.photo} alt='' />
              
            </div>

            <div className='recom-contenu'>
                <div className='text-recom'>
                  <p>{item.contenue}</p>
                </div>
                <p>{format(item.createdAt)}</p>
            </div>

        </div>
    );
}

export default CardRecomandation;
