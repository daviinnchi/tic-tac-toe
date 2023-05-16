import { Square } from "../Square/Square";
import calculateWinner from "../../helpers/calculateWinner";
import { getWinnerLine } from "../../helpers/getWinnerLine";
import { xIsNext } from "../../helpers/xIsNext";
import "./Board.css";
const Board = ({ onPlay, currentMove, squares }) => {
  const winner = calculateWinner(squares);
  const winnerLine = getWinnerLine(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner[0];
  } else {
    status = "Next player: " + (xIsNext(currentMove) ? "X" : "O");
  }
  if (!winner && currentMove === 9) {
    status = "It's a tie";
  }
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext(currentMove) ? "X" : "O";
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
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Board;
