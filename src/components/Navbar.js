import './Navbar.css';

const Navbar = (props) => {
  return (
    <div className="nav-bar">
      <ul className="nav-list">
        <li className="nav-item">Tic-Tac_Toe</li>
        <li className='nav-item' onClick={()=>{props.onQuit()}}>Quit</li>
        <li className="nav-item" style={{position:'absolute',right:'10px'}}>{props.name}</li>
      </ul>
    </div>
  );
};

export default Navbar;
