import React ,{useContext} from 'react';
import { MyStore } from '../../context/myStore';
import { format } from 'timeago.js';

const ReponseCourierCard = ({re}) => {
    const { users,  profil } = useContext(MyStore);

    const aut = users.filter((ite) => ite._id === re.userId);
    const auteur = aut[0]

    return (
        <div className='zone-repse'>
        <div className='photo-nom'>
           <img src={profil.userId === re.userId ? profil.photo : auteur?.profile.photo } alt='' />
           {profil.userId === re.userId ? <p>{profil.prenom}</p> : <p>{auteur?.profile.prenom}</p>}
        </div>
         <p>{re.reponse}</p>
         <p><span>{format(re.date)}</span></p>
      </div>
    );
}

export default ReponseCourierCard;
