import React, { useContext } from 'react';
import './OnlineUsersList.css';
import AppContext from '../context/app-context';
import { IoGameController } from "react-icons/io5";

const OnlineUsersList = (props) => {

  const context = useContext(AppContext);

  const onPlayerSelectedHandler = (socketId)=>{

    const socket = context.socket;

    socket.emit('onplayerrequested',socketId);
    console.log("Request Sent by : "+context.loggedInUser);

  }

  return (
    <>{props.onlinePlayers.length===0 && <h3>No Players Online</h3>}
    <ul>
    {props.onlinePlayers.map((player,index)=>{
        return <>
        <li style={{display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',fontWeight:'600',marginLeft:'0px'}} key={Math.random()*index} onClick={onPlayerSelectedHandler.bind(this,player.socket_id,player.name)}><IoGameController style={{marginRight:'10px',fontSize:'25px'}} />{player.name}</li>
        </>
    })}
        
    </ul>
    </>
  )
}

export default OnlineUsersList