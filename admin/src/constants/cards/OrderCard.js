import React, { useContext } from 'react';
import { format } from 'timeago.js';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { MyStore } from '../../context/myStore';

const OrderCard = ({item}) => {
    const { users } = useContext(MyStore);
    const user = users.filter((user)=> user._id === item.userId);
    const auteur = user[0]

    return (
        <tr className='lignes' key={item._id}>
                    
                    <td className='titles'><img style={{width:50,height:50, borderRadius:'100%'}} src={auteur?.profile.photo} alt=''/></td>
                    <td className='titles'>{auteur?.profile.prenom}</td>
                    <td className='titles'>{format(item.createdAt)}</td>
                    <td className='titles'><RemoveRedEyeIcon style={{fontSize:26}}/></td>
        </tr>
    );
}

export default OrderCard;
