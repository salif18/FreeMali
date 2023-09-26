import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../../context/myStore';
import axios from 'axios'
import { useNavigate } from "react-router";

const Images = () => {
    const navigate = useNavigate()
    const {userId ,domaineURL} = useContext(MyStore)
    const [images, setImages] = useState([])


    useEffect(()=>{
         axios.get(`${domaineURL}/images/user/${userId}`)
         .then((res) =>{
            setImages(res.data)
         })
         .catch((err) => console.log(err))
    },[])

    return (
        <div className='image'>
        
        {images
           .map((image)=>(
          <div onClick={()=>navigate(`/postes/${image._id}/image`)}>
          <img src={image.photo} alt=''/>
         </div>
        ))}
        
        </div>
    );
}

export default Images;
