import { useEffect, useReducer, useState } from "react";
import { locations } from "./helpers/locations";
import Board from "./components/Board/Board";
import getAllIndexes from "./helpers/getAllIndexes";
import {reducer} from "./components/reducer";

export default function Game() {
  const [state, dispatch] = useReducer(reducer, {history: [Array(9).fill(null)], currentMove: 0, sortAsc: null})
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const currentSquares = state.history[state.currentMove];
  function handlePlay(nextSquares) {
    dispatch({type: 'handlePlay', payload: nextSquares});
  }
  function jumpTo(nextMove) {
    dispatch({type: 'jump_to_move', payload: nextMove});
  }
  const moves = state.history.map((squares, move) => {
    let description;
    if (move > 0) {
      move === state.currentMove
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
  if (!state.sortAsc) {
    moves.reverse();
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={state.currentMove}
        />
      </div>
      <div className="game-info">
        <button className="sort-btn" onClick={() => dispatch({type: 'sort_history', payload: true})}>
          Sort by ascending order
        </button>
        <button className="sort-btn" onClick={() => dispatch({type: 'sort_history', payload: false})}>
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
