import "./Square.css";

export const Square = ({ value, handleClick, isWinner }) => {
  return (
    <button
      className={isWinner ? "square-winner" : "square"}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};
