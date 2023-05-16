export const reducer = (state, action) => {
  switch (action.type) {
    case 'handlePlay':
        const nextHistory = [...state.history.slice(0, state.currentMove + 1), state.nextSquares];
        return {
            history: state.nextHistory,
            currentMove: state.nextHistory.length - 1,    
        }
        
}
};
