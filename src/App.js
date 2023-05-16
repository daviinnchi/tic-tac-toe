import { useEffect, useReducer } from "react";
import { locations } from "./helpers/locations";
import Board from "./components/Board/Board";
import getAllIndexes from "./helpers/getAllIndexes";
import { reducer } from "./components/reducer";
import { GameInfo } from "./components/GameInfo";

export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    history: [Array(9).fill(null)],
    currentMove: 0,
    sortAsc: null,
    xMoves: [],
    oMoves: [],
  });
  const currentSquares = state.history[state.currentMove];
  function handlePlay(nextSquares) {
    dispatch({ type: "handlePlay", payload: nextSquares });
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
      <GameInfo 
        history={state.history}
        currentMove={state.currentMove}
        currentSquares={currentSquares}
        sortAsc={state.sortAsc}
        xMoves={state.xMoves}
        oMoves={state.oMoves}
        dispatch={dispatch}
      />
    </div>
  );
}
