import React from 'react'
import "./style.css";
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
	const navigate = useNavigate();

	const onLoginHandler = (e)=>{

		e.preventDefault();
		const name = e.target.elements.nameInput.value;
		const socket = io("https://socket-tictactoe-1cgb.onrender.com");
		socket.emit('onconnection',name);
		props.setAuthenticated();
		props.setSocket(socket);
		props.setLoggedUser(name);
		navigate('/');


	}

  return (
    <div className="name-tag">
		<div className="hello">
			<div id="hello">Hey!</div>
			<div id="my-name-is">Wanna Play?</div>
		</div>
		<form className="form" onSubmit={onLoginHandler}>
			<div><input type="text" name='nameInput' placeholder="Enter Name" required/></div>
			<div><button type="submit">Let's Play! <i className="fa fa-arrow-right"></i></button></div>
		</form>
		<div className="underbar"></div>
	</div>
  )
}

export default Login;