
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainScreen from './components/MainScreen';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import AppContext from './context/app-context';


function App() {

  const [isAuthenticated,setAuthenticated] = useState(false);
  const [loggedUser,setLoggedUser] = useState(null);
  const [onlinePlayers,setOnlinePlayers] = useState([]);
  const [socket,setSocket] = useState(null);
  const [incomingReq,setIncomingRequest] = useState(null);
  const [oppositePlayer,setOpposition] = useState(null);
  const [mySign,setSign] = useState(null);
  const [acceptor,setAcceptor] = useState(false);

  const onQuit = ()=>{

    socket.disconnect();
    setSocket(null);
    setAuthenticated(false);
  }

  useEffect(()=>{

    return ()=>{
      if(socket)
      onQuit();
    }
  },[])

  useEffect(()=>{

    if(socket){
      socket.on('getOnlinePlayers',(onlinePlayers)=>{
        setOnlinePlayers(onlinePlayers.filter((player)=>player.socket_id!==socket.id))
        console.log(onlinePlayers.filter((player)=>player.socket_id!==socket.id))
      })

      socket.on('gamerequest',(request)=>{
        setIncomingRequest({name:request.senderName,socketId:request.senderSocketId})
        // alert(`User : ${request.senderName} has requested a game !`)
      })

      socket.on('requestaccepted',(acceptedResponse)=>{
        setOpposition({name:acceptedResponse.senderName,socketId:acceptedResponse.senderSocketId});
        setSign('O');
      })
    }


  },[socket]);

  return (
    <AppContext.Provider value={{socket:socket,acceptor:acceptor,setAcceptor:setAcceptor,mySign:mySign,setSign:setSign,setSocket:setSocket,loggedInUser:loggedUser,oppositePlayer:oppositePlayer,setOpposition:setOpposition,incomingReq:incomingReq}}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <MainScreen onlinePlayers={onlinePlayers} name={loggedUser} onQuit={onQuit}/> : <Navigate to="/login" />}
        />
        <Route path="login" element={<Login setLoggedUser={(user)=>{setLoggedUser(user)}} setSocket={(socket)=>{setSocket(socket)}} setAuthenticated={()=>{setAuthenticated(true)}}/>} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
    
  );
}

export default App;
