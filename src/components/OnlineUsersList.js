import React, { useContext } from 'react';
import './OnlineUsersList.css';
import AppContext from '../context/app-context';
import { IoGameController } from "react-icons/io5";
import imageDownoad from '../assets/offlineUsers.svg';

const OnlineUsersList = (props) => {

  const context = useContext(AppContext);

  const onPlayerSelectedHandler = (socketId)=>{

    const socket = context.socket;

    socket.emit('onplayerrequested',socketId);
    console.log("Request Sent by : "+context.loggedInUser);

  }

  return (
    <>
      {props.onlinePlayers.length === 0 && 
      <div className="flex flex-col justify-center items-center">
      <img className='text-center w-[100px]' src={imageDownoad}></img>
      <h3 className="text-center text-xl font-semibold">No Players Online</h3>
      </div>
      }
      <ul className="mt-4">
        {props.onlinePlayers.map((player, index) => {
          return (
            <li key={Math.random() * index} onClick={onPlayerSelectedHandler.bind(this, player.socket_id, player.name)} className="flex items-center cursor-pointer font-semibold mb-2 hover:text-blue-500 text-3xl">
              <IoGameController className="mr-2 text-3xl" />
              {player.name}
            </li>
          );
        })}
      </ul>
    </>
  );
  
}

export default OnlineUsersList