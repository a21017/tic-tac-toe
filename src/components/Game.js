import './Game.css';
import PlayingBoard from './PlayingBoard';
import ScoreBoard from './ScoreBoard';
import {useState} from 'react';

const Game = ()=>{

    const [gscore,setGscore] = useState({});
    const onGameEndHandler = (score)=>{
       setGscore(score);
    }

return(
<div className="game-container"> 
<div className="tic-tac-container">
<PlayingBoard onGameEnd={onGameEndHandler}/>
</div>
<div className="score-board-container">
    <ScoreBoard gamescore={gscore}/>
</div>
</div>
);

}

export default Game;