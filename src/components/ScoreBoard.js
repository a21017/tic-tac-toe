import './ScoreBoard.css';

const ScoreBoard = (props)=>{
    console.log(props.gamescore)
    return(
<table>
    <caption>Score Table</caption>
    <thead>
        <tr>
            <th>Player 1</th>
            <th>Player 2</th>
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