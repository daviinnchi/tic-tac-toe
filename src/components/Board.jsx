import { Square } from "./Square";
import calculateWinner from "../helpers/calculateWinner";
import { getWinnerLine } from "../helpers/getWinnerLine";
const Board = ({ xIsNext, squares, onPlay, currentMove }) => {
  const winner = calculateWinner(squares);
  const winnerLine = getWinnerLine(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner[0];
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  if (!winner && currentMove === 9) {
    status = "It's a tie";
  }
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const squareIndexes = squares.map((element, index) => index);
  const columns = [
    squareIndexes.slice(0, 3),
    squareIndexes.slice(3, 6),
    squareIndexes.slice(6, 9),
  ];
  return (
    <>
      <div className="status">{status}</div>
      {columns.map((squareIndex) => (
        <div className="board-row" key={squareIndex}>
          {squareIndex.map((index) => {
            return (
              <Square
                isWinner={winnerLine ? winnerLine.includes(index) : false}
                key={index}
                value={squares[index]}
                handleClick={() => handleClick(index)}
                squareId={index}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Board;
