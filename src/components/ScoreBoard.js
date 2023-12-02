import { useContext } from 'react';
import './ScoreBoard.css';
import AppContext from '../context/app-context';

const ScoreBoard = (props)=>{
    console.log(props.gamescore)
    const context = useContext(AppContext);
    return(
<table>
    <caption>Score Table</caption>
    <thead>
        <tr>
            <th>{context?.mySign==='O'?context.loggedInUser:context.oppositePlayer.name}</th>
            <th>{context?.mySign==='X'?context.loggedInUser:context.oppositePlayer.name}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
           <td>{props.gamescore[1]}</td>
           <td>{props.gamescore[2]}</td>
        </tr>
       
    </tbody>
   
</table>
    );
}

export default ScoreBoard;