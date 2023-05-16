import { locations } from "../helpers/locations";
import getAllIndexes from "../helpers/getAllIndexes";

export const reducer = (state, action) => {
  switch (action.type) {
    case "handlePlay":
      const nextHistory = [
        ...state.history.slice(0, state.currentMove + 1),
        action.payload,
      ];
      return {
        history: nextHistory,
        currentMove: nextHistory.length - 1,
      };
    case "jump_to_move":
      return {
        history: state.history,
        currentMove: action.payload,
      };
    case "sort_history":
      return {
        history: state.history,
        currentMove: state.currentMove,
        sortAsc: action.payload,
      };
    case "new_X_move":
      return {
        history: state.history,
        currentMove: state.currentMove,
        xMoves: getAllIndexes(action.payload, "X").map((element) => {
          return locations[element];
        }),
        oMoves: state.oMoves,
      };
    case "new_O_move":
      return {
        history: state.history,
        currentMove: state.currentMove,
        oMoves: getAllIndexes(action.payload, "O").map((element) => {
          return locations[element];
        }),
        xMoves: state.xMoves,
      };
  }
};
