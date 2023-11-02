import './PlayingBoard.css';
import {React, useEffect, useState} from 'react';


const PlayingBoard = (props)=>{

    
    const [board,setBoard]  = useState(Array(9).fill(null));
    const[score,setScore] = useState({1:0,2:0});
     const [turn,setTurn] = useState('X');

     useEffect(()=>{props.onGameEnd(score);},[score])

     const clearAll=()=>{
        
        
        setBoard(Array(9).fill(null));
        setTurn('X');


     }

     const checkWinner=(board)=>{
        const answers = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        let tiles = document.querySelectorAll('.tile');
        
        answers.forEach((ans)=>{
           if((board[ans[0]]===board[ans[1]])&&(board[ans[1]]===board[ans[2]])&&(board[ans[2]]===board[ans[0]])&&(board[ans[0]]!==null)){
            if(turn==='O'){

                
                setScore((prev)=>{
                    let cscore = prev[1];
                    let nScore = {...prev,1:cscore+1};
                    return nScore;
                
                });

                
            }
            else{
                setScore((prev)=>{
                    let cscore = prev[2];
                    let nScore = {...prev,2:cscore+1};
                    return nScore;
                });
            }

            
            clearAll();
            
            
           }

//if draw condition
let flag = true;
for (let i=0 ;i<9;i++){
    if(!board[i])
    flag=false;
}
        
if(flag){
    clearAll();
}
        
        })

     }

    const onPlay = (e)=>{
        let clickedElement = e.target;
        let id = clickedElement.id;
        let updatedBoard = [...board];
        if(board[id]===null){
            updatedBoard[id]=turn;
            setBoard(updatedBoard);

            if(turn==='X')
            setTurn('O');
            else
            setTurn('X');
        }

        console.log(board)

        checkWinner(updatedBoard);
        // if(clickedElement.innerHTML===''){
        //     clickedElement.innerText=turn;
        
        // let winner = checkWinner(board);
        // console.log(winner)
        // if(winner==='X'){
        //             setScore((prev)=>{
        //             let cscore = prev[1];
        //             let nScore = {...prev,1:cscore+1};
        //             return nScore;});
                    
        // }
        // else if(winner==='O'){
        //     setScore((prev)=>{
        //         let cscore = prev[2];
        //         let nScore = {...prev,2:cscore+1};
        //         return nScore;});
                
        // }
        
        // console.log(score);
        
        // turn = turn==='X'?'O':'X';
        // }

    }


    return <div className="board">
        <div className="tile bt-0 bl-0" onClick={onPlay} id="0">{board[0]}</div>
        <div className="tile bt-0" onClick={onPlay} id="1">{board[1]}</div>
        <div className="tile br-0 bt-0" onClick={onPlay} id="2">{board[2]}</div>
        <div className="tile bl-0" onClick={onPlay} id="3">{board[3]}</div>
        <div className="tile" onClick={onPlay} id="4">{board[4]}</div>
        <div className="tile br-0" onClick={onPlay} id="5">{board[5]}</div>
        <div className="tile bl-0 bb-0" onClick={onPlay} id="6">{board[6]}</div>
        <div className="tile bb-0" onClick={onPlay} id="7">{board[7]}</div>
        <div className="tile br-0 bb-0" onClick={onPlay} id="8">{board[8]}</div>
    </div>
}

export default PlayingBoard;