import calculateWinner from "./calculateWinner"

export const getWinnerLine = (squares) => {
    const winner = calculateWinner(squares);
    if (winner){
        return winner.slice(1);
    }
}