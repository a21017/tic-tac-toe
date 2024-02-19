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
    <>
      {props.onlinePlayers.length === 0 && <h3 className="text-center">No Players Online</h3>}
      <ul className="mt-4">
        {props.onlinePlayers.map((player, index) => {
          return (
            <li key={Math.random() * index} onClick={onPlayerSelectedHandler.bind(this, player.socket_id, player.name)} className="flex items-center cursor-pointer font-semibold mb-2 hover:text-blue-500">
              <IoGameController className="mr-2 text-xl" />
              {player.name}
            </li>
          );
        })}
      </ul>
    </>
  );
  
}

export default OnlineUsersList