import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { MyStore } from '../../context/myStore';
import CardOffres from '../card/Offres';
import { Swiper , SwiperSlide} from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css'
import { useNavigate } from 'react-router';

const QuelquesOffre = () => {
  const {domaineURL,offres,getOffres,isInLine } = useContext(MyStore)
  const url = `${domaineURL}/offres`;
  const navigate = useNavigate()
  
  // recuperation des offres du cotes server
  useEffect(() => {
    axios
      .get(url, Headers)
      .then((res) => {
        res && getOffres(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

    return (
        <section className='slider'>
            <h1 className='h1' onClick={()=> isInLine ? navigate('/offres'):navigate('/connecter')}>Offres d'emploi &#8594;</h1>

            <div className='container-slider'>
            <Swiper 
              className='swiper'
              modules={[Pagination]}
              slidesPerView={2}
              pagination={{clickable:true}}
              
             >
            {
                offres.slice(0,10).map((item) => (
                 <SwiperSlide className='swiper-slider ' key={item._id}>
                   <CardOffres item={item} key={item._id} />
                 </SwiperSlide>
                ))
            }
            </Swiper>
            </div>
        </section>
    );
}

export default QuelquesOffre;
