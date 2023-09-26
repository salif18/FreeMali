import React from 'react';
import { useNavigate } from 'react-router';
import {format} from 'timeago.js'
const Opportunites = ({offre}) => {
    const navigate = useNavigate()
    const {_id ,sujet, contenu ,userId, budget, commentaires, createdAt } = offre
    

    return (
        <div className='opportinute' key={_id}>

            <div className='img-infos-auteur'>
               <p>Date de poste <span>{format(createdAt)}</span></p>
               <h2>{sujet}</h2>
            </div>

            <div className='contenu-offre'>
              <p>{contenu}</p>
              <p>Offre Client <span> {budget} Fcfa</span></p>
            </div>
            
            <div className='commentaire'>
               {
                commentaires
                 .filter((item) => item.accept === true)
                 .map((item) => (
                <>
                    <div className='candidat' key={item._id}>
                       <p>Offre prestataire  <span> {item.budgetOffre} Fcfa</span></p>
                       <p>Offre prestataire {item.accept === true && <span>accepté</span>}</p>
                       <p>Date de proposition <span>{format(item.date)}</span></p>
                    </div>
                    <div className='btn-grp'>
                    <button className='btn' 
                       onClick={()=>navigate(`/clients/${userId}`)}
                    >
                       Contacter auteur
                    </button>
                    <button className='btn' 
                      onClick={()=>navigate(`/prestataires/${item.userId}`)}
                    >
                      Contacter prestataire
                    </button>
                   </div>
                </>
                ))
               }
            </div>
             
        </div>
    );
}

export default Opportunites;