import { useState, useContext, useEffect } from "react";
import Game from "./Game";
import Navbar from "./Navbar";
import Modal from "./Modal";
import "./MainScreen.css";
import AppContext from "../context/app-context";
const MainScreen = (props) => {
  const [modalOpen, setOpen] = useState(false);

  const context = useContext(AppContext);

  useEffect(() => {
    if (context.incomingReq) setOpen(true);
  }, [context.incomingReq]);

  return (
    <div className="relative">
      <Modal
        open={modalOpen}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div className="absolute inset-0">
        <Navbar name={props.name} onQuit={props.onQuit} />
        <Game onlinePlayers={props.onlinePlayers} />
      </div>
    </div>
  );
};

export default MainScreen;
