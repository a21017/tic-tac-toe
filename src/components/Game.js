import AppContext from "../context/app-context";
import Loader from "./Loader/Loader";
// import "./Game.css";
import OnlineUsersList from "./OnlineUsersList";
import PlayingBoard from "./PlayingBoard";
import ScoreBoard from "./ScoreBoard";
import { useContext, useState } from "react";

const Game = (props) => {
  const [gameStarted, setGameStatus] = useState(false);
  const context = useContext(AppContext);
  const [gscore, setGscore] = useState({});
  const onGameEndHandler = (score) => {
    setGscore(score);
  };

  console.log("Inside Game :",context.playersLoading);

  return (
    <div className="flex lg:justify-center md:justify-center sm:justify-center sm:items-center xs:items-start xs:justify-center items-center min-h-screen w-screen min-w-screen bg-opacity-25 bg-gray-700">
    {context.playersLoading ? (<Loader/>) :
      (!context.oppositePlayer ? (
            <OnlineUsersList onlinePlayers={props.onlinePlayers} />
      ) : (
        <>
        <div className="flex flex-col sm:flex-row h-full w-full justify-evenly xs:mt-6">
          <div className="sm:mr-4 mb-4 sm:mb-0 xs:flex xs:justify-center">
            <div className="w-full sm:w-80 xs:w-80 xs:h-60 h-64">
              <PlayingBoard onGameEnd={onGameEndHandler} />
            </div>
          </div>
        <div>
            <ScoreBoard gamescore={gscore} />
         </div>
         </div>
        </>
      ))
    }
    </div>
  );
};

export default Game;
