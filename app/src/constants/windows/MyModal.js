import React from 'react';
import Modal from 'react-modal';
import '../../styles/modal.css'
import {CSSTransition}  from 'react-transition-group';
import { useContext } from 'react';
import Notify from '../card/Notify';
import { MyStore } from '../../context/myStore';

const MyModal = ({isOpen, onClose}) => {
    
    const {notifications} = useContext(MyStore)
    
    const customStyles = {
        content:{
            width: '330px',
            top:'53%',
            left:'auto',
            right:'-12%',
            bottom:"auto",
            marginLeft:"-10%",
            transform:"translate(-50%, -50%)",
            border:'none',
            boxShadow:'-5px 5px 5px -5px #bcbcbc',
            height:'550px',
            borderRadius:'10px',
            '@media(max-width: 900px)': {
                width: '90%', // Ajustez la largeur pour occuper la majeure partie de l'écran
                left: 'auto',
                marginRight: 'auto',
                transform: 'translate( -50%,0)', // Réinitialisez la translation horizontale
                height: '80vh', // Utilisez une hauteur en pourcentage pour s'adapter à l'écran
              },

        }
    }

    return (
        <div >
        <CSSTransition 
        in={isOpen}
        timeout={300}
        classNames='modal'
        unmountOnExit
        >
        <Modal  isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div className='header-modal'>
             
            </div>
            <div className='notifications'>
            <h2>Notifications</h2>
            {
              notifications.map((notification)=>(
                  <Notify notification={notification} key={notification._id} />
              ))
            }
          </div>
        </Modal>
        </CSSTransition>
        </div>
    );
}

export default MyModal;
// <span className='close' onClick={onClose}>&times;</span>