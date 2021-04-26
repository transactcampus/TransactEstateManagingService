import { combineReducers } from 'redux';
import authReducer from './authReducer';
import deviceReducer from './deviceReducer';
import historyReducer from './historyReducer';
export default combineReducers({
    auth: authReducer,
    deviceInfo: deviceReducer,
    deviceHistory: historyReducer
});