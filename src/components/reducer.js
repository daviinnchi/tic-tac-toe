export const reducer = (state, action) => {
  switch (action.type) {
    case 'handlePlay':
        const nextHistory = [...state.history.slice(0, state.currentMove + 1), action.payload];
        return {
            history: nextHistory,
            currentMove: nextHistory.length - 1,    
        }
    case 'jump_to_move':
        console.log(state.history[action.payload])
        return {
            history: state.history,
            currentMove: action.payload,
        }
    case 'sort_history':
        return {
            history: state.history,
            currentMove: state.currentMove,
            sortAsc: action.payload,
        }        
}
};
