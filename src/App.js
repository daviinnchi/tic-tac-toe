import { useEffect, useState } from "react";
function Square({ value, squareId, clickHandler }) {
  return (
    <button className="square" onClick={clickHandler} id={squareId}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
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
        <div className="board-row">
          {squareIndex.map((index) => {
            return (
              <Square
                value={squares[index]}
                clickHandler={() => handleClick(index)}
                squareId={index}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [sortAsc, setSortAsc] = useState(null);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const locations = {
    0: "row 1 column 1 \n",
    1: "row 1 column 2 \n",
    2: "row 1 column 3 \n",
    3: "row 2 column 1 \n",
    4: "row 2 column 2 \n",
    5: "row 2 column 3 \n",
    6: "row 3 column 1 \n",
    7: "row 3 column 2 \n",
    8: "row 3 column 3 \n",
  };
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
      if (move === currentMove) {
        description = "You are at move #" + move;
      } else {
        description = "Go to move #" + move;
      }
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
      getAllIndexes(currentSquares, "X").map((element, index) => {
        return locations[element];
      })
    );
    setOMoves(
      getAllIndexes(currentSquares, "O").map((element, index) => {
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
          xIsNext={xIsNext}
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

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      for (let ch of lines[i]) {
        document.getElementById(ch).style.backgroundColor = "green";
      }
      return squares[a];
    }
  }
  return null;
}
