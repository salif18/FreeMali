import React from 'react';
import Modal from 'react-modal';
import '../../styles/modal.css'
import {CSSTransition}  from 'react-transition-group';
import { useContext } from 'react';
import Notify from '../card/Notify';
import { MyStore } from '../../context/myStore';

const MyModal = ({isOpen, onClose}) => {
    //if(!isOpen) return null
    const {notifications} = useContext(MyStore)
    const customStyles = {
        content:{
            top:'61%',
            left:'auto',
            right:'-20%',
            bottom:"auto",
            marginLeft:"-50%",
            transform:"translate(-50%, -50%)",
        
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
             <div className='close' onClick={onClose}><span>&times;</span> </div>
            </div>
            <div className='notifications'>
            <h2>Notifications</h2>
            {
              notifications.map((notification)=>(
                  <Notify notification={notification} />
              ))
            }
          </div>
        </Modal>
        </CSSTransition>
        </div>
    );
}

export default MyModal;
