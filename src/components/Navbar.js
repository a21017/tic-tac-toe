const Navbar = (props) => {
  return (
    <div className="bg-black h-16 flex items-center justify-between px-6 lg:px-12 font-bold text-yellow-500 w-full">
      <div className="flex items-center">
        <span className="mr-6 font-nabla text-lg lg:text-2xl cursor-pointer">Tic-Tac_Toe</span>
        <span className="mr-6 font-nabla text-lg lg:text-2xl cursor-pointer hover:text-red-600 hover:font-normal" onClick={props.onQuit}>Quit</span>
      </div>
      <span className="font-nabla text-lg lg:text-3xl">{props.name}</span>
    </div>
  );
};

export default Navbar;
