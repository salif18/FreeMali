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
            width: '330px',
            top:'53%',
            left:'auto',
            right:'-12%',
            bottom:"auto",
            marginLeft:"-10%",
            transform:"translate(-50%, -50%)",
            border:'none',
            boxShadow:'5px 5px 5px 5px #d0d0d0',
            height:'550px',
            borderRadius:'10px'

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
