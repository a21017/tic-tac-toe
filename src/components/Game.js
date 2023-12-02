import AppContext from "../context/app-context";
import "./Game.css";
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

  return (
    <div className="game-container">
      {!context.oppositePlayer ? (
        <OnlineUsersList onlinePlayers={props.onlinePlayers}/>
      ) : (
        <>
          <div className="tic-tac-container">
            <PlayingBoard onGameEnd={onGameEndHandler} />
          </div>
          <div className="score-board-container">
            <ScoreBoard gamescore={gscore} />
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
