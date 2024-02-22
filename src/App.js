
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
  const [playersLoading,setLoading] = useState(false);


  console.log("PlayersLoading",playersLoading);

  const onQuit = ()=>{

     socket.emit('onGameQuit',{oppositePlayer:oppositePlayer});
  } 

  useEffect(()=>{

    if(socket){
      socket.on('getOnlinePlayers',(onlinePlayers)=>{
        setOnlinePlayers(onlinePlayers.filter((player)=>player.socket_id!==socket.id))

        if(oppositePlayer && !onlinePlayers.find((player)=>player.socket_id===oppositePlayer.socketId)){
          setOpposition(null);
        }

        setLoading(false);

      })

      socket.on('gamerequest',(request)=>{
        setIncomingRequest({name:request.senderName,socketId:request.senderSocketId})
      })

      socket.on('requestaccepted',(acceptedResponse)=>{
        setOpposition({name:acceptedResponse.senderName,socketId:acceptedResponse.senderSocketId});
        setSign('O');
      })

      socket.on('gameQuit',({oppositePlayer,quitPlayer})=>{

        if(!oppositePlayer){
          socket.disconnect();
          setLoggedUser(null);
          setSocket(null);
          setAuthenticated(false);
          setIncomingRequest(null);
          setOpposition(null);
          setSign(null);
          return;
        }

        if(socket.id===quitPlayer){
          console.log("Leaving: ",quitPlayer);
          socket.disconnect();
          setLoggedUser(null);
          setSocket(null);
          setAuthenticated(false);
          setIncomingRequest(null);
          setOpposition(null);
          setSign(null);
        }
        else{

          setIncomingRequest(null);
          setOpposition(null);
          setSign(null);
        }
      })
    
    }

    

  },[socket,oppositePlayer]);

  return (
    <AppContext.Provider value={{playersLoading:playersLoading,socket:socket,acceptor:acceptor,setAcceptor:setAcceptor,mySign:mySign,setSign:setSign,setSocket:setSocket,loggedInUser:loggedUser,oppositePlayer:oppositePlayer,setOpposition:setOpposition,incomingReq:incomingReq}}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <MainScreen onlinePlayers={onlinePlayers} name={loggedUser} onQuit={onQuit}/> : <Navigate to="/login" />}
        />
        <Route path="login" element={<Login setLoading={(boolean)=>{setLoading(boolean)}} setLoggedUser={(user)=>{setLoggedUser(user)}} setSocket={(socket)=>{setSocket(socket)}} setAuthenticated={()=>{setAuthenticated(true)}}/>} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
    
  );
}

export default App;
