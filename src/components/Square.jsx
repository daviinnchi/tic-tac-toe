export const Square = ({ value, squareId, handleClick }) => {
  return (
    <button className="square" onClick={handleClick} id={squareId}>
      {value}
    </button>
  );
};
