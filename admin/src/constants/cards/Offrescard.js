import React, { useContext } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink} from 'react-router-dom';
import { format } from 'timeago.js';
import { MyStore } from '../../context/myStore';

const Offrescard = ({item}) => {
const {users} = useContext(MyStore)
    
  //recuperer les infos sur auteurs dans la list de tous les users
  const user = users.filter((user)=> user._id === item.userId);
  const auteur = user[0]

    return (
      <tr>
        <td className='name-tab'><img src={auteur?.profile.photo} alt='' /></td>
        <td className='name-tab'>{auteur?.profile.prenom} {auteur?.profile.nom}</td>
        <td className='name-tab'>{item.contenu.slice(0,55)}</td>
        <td className='name-tab'>{format(item.createdAt)}</td>
        <td className='name-tab'> 
        <button className='btnview'>
         <NavLink to={`/offres/${item._id}`}><VisibilityIcon style={{fontSize:20}}/></NavLink>
        </button>
        </td>
       </tr>
        
    );
}

export default Offrescard;
