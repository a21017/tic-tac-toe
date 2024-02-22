import React from 'react'
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
	const navigate = useNavigate();

	const onLoginHandler = (e)=>{

		e.preventDefault();
		const name = e.target.elements.nameInput.value;
		const socket = io("https://socket-tictactoe-1cgb.onrender.com");
		// const socket = io("http://localhost:4000");
		socket.emit('onconnection',name);
		props.setAuthenticated();
		props.setSocket(socket);
		props.setLoggedUser(name);
		props.setLoading(true);
		navigate('/');

	}

	return (
		<div className="relative">
		  <div className="absolute inset-0 z-0">
			<img src='https://cdn.pixabay.com/photo/2017/01/05/09/21/tic-tac-toe-1954446_640.jpg' alt='bg-image' className="object-cover w-full h-full" />
		  </div>
		  <div className="flex flex-col justify-center items-center h-screen relative z-10">
			<div className="bg-black p-6 sm:p-12 rounded-xl shadow-md border">
			  <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-red-600">Welcome to Tic-Tac-Toe</h2>
			  <form className="flex flex-col items-center" onSubmit={onLoginHandler}>
				<input type="text" name='nameInput' placeholder="Enter Name" required className="bg-slate-300 text-center px-4 py-2 mb-4 w-full sm:w-60 border rounded-lg focus:outline-none focus:border-black text-lg sm:text-2xl"/>
				<button type="submit" className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-white hover:text-red-600 focus:outline-none w-full sm:w-auto">
				  Let's Play! <i className="fa fa-arrow-right ml-2"></i>
				</button>
			  </form>
			</div>
		  </div>
		</div>
	  );
}

export default Login;