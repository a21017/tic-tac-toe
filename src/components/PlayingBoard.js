import AppContext from '../context/app-context';
import './PlayingBoard.css';
import {React, useContext, useEffect, useState} from 'react';


const PlayingBoard = (props)=>{

    const context = useContext(AppContext);
    const socket = context.socket;
    
    const [board,setBoard]  = useState(Array(9).fill(null));
    const[score,setScore] = useState({1:0,2:0});
    const [turn,setTurn] = useState('O');

     useEffect(()=>{props.onGameEnd(score);
        // socket.emit('onturnplay',{updatedBoard:Array(9).fill(null),oppositePlayer:context.oppositePlayer,turn:turn,score:score});
            socket.emit('onscoreupdate',{oppositePlayer:context.oppositePlayer,score:score});
    },[score]);

     useEffect(()=>{
        socket.on('turnplayed',(updatedBoard,lTurn,score)=>{
            setBoard(updatedBoard);
            setTurn(lTurn);
            console.log('Turn played by opposite player');
            console.log('Board: ',updatedBoard);
        })

        socket.on('scoreupdated',(score)=>{
            setScore(score);
        })

        socket.on('clearedall',(updatedBoard,lTurn,score)=>{
            setBoard(updatedBoard);
            setTurn(lTurn);
            setScore(score);
            console.log('Turn played by opposite player');
            console.log('Board: ',updatedBoard);
        })
     },[socket])

     const clearAll=(updatedscore)=>{
        
        console.log('onturnplay event sender : '+context.loggedInUser+" receiver: "+context.oppositePlayer)
        socket.emit('onturnplay',{updatedBoard:Array(9).fill(null),oppositePlayer:context.oppositePlayer,turn:turn,score:updatedscore});
        setBoard(Array(9).fill(null));
        
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
        let updateScore = {...score};
        answers.forEach((ans)=>{
           if((board[ans[0]]===board[ans[1]])&&(board[ans[1]]===board[ans[2]])&&(board[ans[2]]===board[ans[0]])&&(board[ans[0]]!==null)){
            if(turn==='O'){

                updateScore = {...updateScore,1:updateScore[1]+1}
                setScore((prev)=>{
                    let cscore = prev[1];
                    let nScore = {...prev,1:cscore+1};
                    return nScore;
                
                });

                
            }
            else{
                updateScore = {...updateScore,2:updateScore[2]+1};
                setScore((prev)=>{
                    let cscore = prev[2];
                    let nScore = {...prev,2:cscore+1};
                    return nScore;
                });
            }

            
            clearAll(updateScore);
            
            
           }

//if draw condition

        
        })

        let flag = true;
for (let i=0 ;i<9;i++){
    if(!board[i])
    flag=false;
}
        
if(flag){
    clearAll(updateScore);
}

     }

    const onPlay = (e)=>{

        if(turn!==context.mySign)
        return;

        let clickedElement = e.target;
        let id = clickedElement.id;
        let updatedBoard = [...board];
        if(board && board[id]===null){
            updatedBoard[id]=turn;
            setBoard(updatedBoard);
            socket.emit('onturnplay',{updatedBoard:updatedBoard,oppositePlayer:context.oppositePlayer,turn:turn});
            console.log("Turn played by me");
            if(turn==='X')
            setTurn('O');
            else
            setTurn('X');

            checkWinner(updatedBoard);

        }

        console.log(board)


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