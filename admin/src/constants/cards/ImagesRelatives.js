import axios from 'axios';
import React from 'react';

const ImagesRelatives = ({item}) => {
    const handledelete =()=>{
        axios.delete(`http://localhost:3003/products/imagerelates/${item._id}`)
        .then(res => res.data)
    }
    return (
        <div className='card-relative'>
            <img src={item.img}  alt=''/>
            <button className='btn-del-img-relat' onClick={()=>handledelete(item._id)}>supprimer</button>
        </div>
    );
}

export default ImagesRelatives