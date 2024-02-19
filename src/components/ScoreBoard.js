import { useContext } from 'react';
import AppContext from '../context/app-context';

const ScoreBoard = (props) => {
    const context = useContext(AppContext);

    return (
        <div className="bg-gray-200 rounded-lg shadow-md p-10 lg:p-14 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Score Table</h2>
            <table className="w-full border-collapse text-lg lg:text-xl">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-4 px-8 font-semibold">{context?.mySign === 'O' ? context.loggedInUser : context.oppositePlayer.name}</th>
                        <th className="border border-gray-300 py-4 px-8 font-semibold">{context?.mySign === 'X' ? context.loggedInUser : context.oppositePlayer.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 py-4 px-8 text-center">{props.gamescore[1]}</td>
                        <td className="border border-gray-300 py-4 px-8 text-center">{props.gamescore[2]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ScoreBoard;
