
  const initialState = {isRunning: false, elapsedTime: 0};
  
  const stopwatchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_STOPWATCH':
        return {
          ...state,
          [action.payload]: { ...state[action.payload], isRunning: true },
        };
      case 'PAUSE_STOPWATCH':
        return {
          ...state,
          [action.payload]: { ...state[action.payload], isRunning: false },
        };
      case 'RESET_STOPWATCH':
        return {
          ...state,
          [action.payload]: { ...state[action.payload], elapsedTime: 0, isRunning: false },
        };
      case 'UPDATE_ELAPSED_TIME':
        return {
          ...state,
          [action.payload.id]: { ...state[action.payload.id], elapsedTime: action.payload.elapsedTime },
        };
      default:
        return state;
    }
  };
  
  export default stopwatchReducer;
