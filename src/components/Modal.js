import React, { useContext } from "react";
import AppContext from "../context/app-context";

const Modal = ({ open, onClose }) => {
  const context = useContext(AppContext);

  const onAccept = () => {
    context.setOpposition(context.incomingReq);
    const socket = context.socket;
    socket.emit("onaccepting", context.incomingReq.socketId);
    console.log("Accepted Request from : " + context.incomingReq.name);
    context.setSign("X");
    context.setAcceptor(true);
    onClose();
  };

  return (
    <>
      {open && 
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-slate-300 h-screen w-screen">
          <div className="modal bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-center sm:space-x-4">
            <p className="font-bold text-lg sm:text-2xl mb-4 sm:mb-0">
              Game Requested by : {context.incomingReq.name}!
            </p>
            <div>
              <button
                onClick={onAccept}
                className="bg-green-200 hover:bg-green-600 hover:text-white text-black font-bold py-2 px-4 rounded mb-2 sm:mb-0"
              >
                ✔️ Accept
              </button>
              <button
                onClick={onClose}
                className="bg-red-200 hover:bg-red-600 text-black hover:text-white font-bold py-2 px-4 rounded"
              >
                ❌ Reject
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;
