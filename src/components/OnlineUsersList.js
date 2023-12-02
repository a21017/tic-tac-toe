import React, { useContext } from 'react';
import './OnlineUsersList.css';
import AppContext from '../context/app-context';

const OnlineUsersList = (props) => {

  const context = useContext(AppContext);

  const onPlayerSelectedHandler = (socketId)=>{

    const socket = context.socket;

    socket.emit('onplayerrequested',socketId);
    console.log("Request Sent by : "+context.loggedInUser);

  }

  return (
    <ul>
    {props.onlinePlayers.map((player)=>{
        return <li onClick={onPlayerSelectedHandler.bind(this,player.socket_id,player.name)}>{player.name} <i className="fa fa-arrow-right"></i></li>
    })}
        
    </ul>
  )
}

export default OnlineUsersList