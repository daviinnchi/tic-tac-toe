export const Square = ({ value, squareId, handleClick, isWinner }) => {
  return (
    <button
      className={isWinner ? "square-winner" : "square"}
      onClick={handleClick}
      id={squareId}
    >
      {value}
    </button>
  );
};
