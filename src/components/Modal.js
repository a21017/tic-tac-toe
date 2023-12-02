import React, { useContext } from 'react';
import './Modal.css';
import AppContext from '../context/app-context';

const Modal = ({open,onClose}) => {

  const context = useContext(AppContext);

  const onAccept = ()=>{

    //current game start
    //game state set {oppositionPlayer}
    //send socket server accepted event {accepterSocketId}
    context.setOpposition(context.incomingReq);
    const socket = context.socket;
    socket.emit('onaccepting',context.incomingReq.socketId);
    console.log("Accepted Request from : "+context.incomingReq.name);
    context.setSign('X');
    context.setAcceptor(true);
    onClose();

  }

  return (
    <>
    {open && 
        <div className="model-container">
        <div className="modal">
            <p>Game Requested by : {context.incomingReq.name}!</p>
            <div><button onClick={onAccept} >&#10004;</button></div>
            <div><button onClick={onClose} className="close-btn">&times;</button></div>
        </div>
    </div>
    }
    </>
    
  )
}

export default Modal