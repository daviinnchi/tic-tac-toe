import React, { useEffect } from "react";

export const GameInfo = ({history, currentMove, currentSquares, sortAsc, xMoves, oMoves, dispatch}) => {
  function jumpTo(nextMove) {
    dispatch({ type: "jump_to_move", payload: nextMove });
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
    dispatch({ type: "new_X_move", payload: currentSquares });
    dispatch({ type: "new_O_move", payload: currentSquares });
  }, [currentSquares]);
  if (!sortAsc) {
    moves.reverse();
  }
  return (
    <>
      <div className="game-info">
        <button
          className="sort-btn"
          onClick={() => dispatch({ type: "sort_history", payload: true })}
        >
          Sort by ascending order
        </button>
        <button
          className="sort-btn"
          onClick={() => dispatch({ type: "sort_history", payload: false })}
        >
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
    </>
  );
};
