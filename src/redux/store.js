// store.js
import { createStore } from 'redux';
import stopwatchReducer from './reducers';

const store = createStore(stopwatchReducer);

export default store;