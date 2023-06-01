import React from 'react';

const CommentCamarche = () => {
    return (
        <div className='comment'>
        <h1>Comment fonctionne notre plateforme FreeMali ?</h1>
        <div className='container-objets'>
            <div className='objets'>
             <img className='obj-img' src='https://cdn-icons-png.flaticon.com/512/3143/3143361.png' alt=''/>
             <p>Postez votre projet et explicitez votre besoin</p>
            </div>

            <div className='objets'>
             <img className='obj-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zqABU-HdMHZil_zVx2-i05jiVLfU218PX_jI9bIqI0HMArcAagD0DWSCgh_7Xcoukzs&usqp=CAU' alt=''/>
             <p>Parcourez les profils puis choisissez celui qui vous convient le mieux</p>
            </div>

            <div className='objets'>
             <img className='obj-img' src='https://www.simplilearn.com/ice9/free_resources_article_thumb/Syntax-of-interface-in-Java.png' alt=''/>
             <p>Servez-vous de l'interface  pour discuter et partager des fichiers</p>
            </div>

            <div className='objets'>
             <img className='obj-img' src='https://e7.pngegg.com/pngimages/54/114/png-clipart-computer-icons-payment-credit-card-credit-card-text-logo.png' alt=''/>
             <p>Avec notre système, vous ne payez qu'une fois le travail validé</p>
            </div>
        </div>
        </div>
    );
}

export default CommentCamarche;
