export const startStopwatch = id => ({
    type: 'START_STOPWATCH',
    payload: id,
  });
  
  export const pauseStopwatch = id => ({
    type: 'PAUSE_STOPWATCH',
    payload: id,
  });
  
  export const resetStopwatch = id => ({
    type: 'RESET_STOPWATCH',
    payload: id,
  });

  export const updateElapsedTime = (id, elapsedTime) => ({
    type: 'UPDATE_ELAPSED_TIME',
    payload: { id, elapsedTime },
  });