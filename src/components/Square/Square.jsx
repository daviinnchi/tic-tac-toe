import "./Square.css";

export const Square = ({ value, handleClick, isWinner }) => {
  return (
    <button
      className={isWinner ? "board_row board_row__square square_type_winner" : "board_row__square"}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};
