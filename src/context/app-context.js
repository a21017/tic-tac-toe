import { createContext } from "react";

const AppContext = createContext({
    socket:null,
    setSocket:()=>{},
    loggedInUser:null,
    oppositePlayer:null,
    incomingReq:null,
    mySign:null,
    acceptor:false,
    playersLoading:false
})

export default AppContext;