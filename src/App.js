import { useEffect, useState } from "react";
import { locations } from "./helpers/locations";
import Board from "./components/Board/Board";
import getAllIndexes from "./helpers/getAllIndexes";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [sortAsc, setSortAsc] = useState(null);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      move === currentMove
        ? (description = "You are at move #" + move)
        : (description = "Go to move #" + move);
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  useEffect(() => {
    setXMoves(
      getAllIndexes(currentSquares, "X").map((element) => {
        return locations[element];
      })
    );
    setOMoves(
      getAllIndexes(currentSquares, "O").map((element) => {
        return locations[element];
      })
    );
  }, [currentSquares]);
  if (!sortAsc) {
    moves.reverse();
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
        />
      </div>
      <div className="game-info">
        <button className="sort-btn" onClick={() => setSortAsc(true)}>
          Sort by ascending order
        </button>
        <button className="sort-btn" onClick={() => setSortAsc(false)}>
          Sort by descending order
        </button>
        <ol>{moves}</ol>
        <div className="moves-info">
          'X' player moves <br /> {xMoves}
        </div>
        <div className="moves-info">
          'O' player moves <br /> {oMoves}
        </div>
      </div>
    </div>
  );
}
