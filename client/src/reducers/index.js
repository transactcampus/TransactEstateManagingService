import { combineReducers } from 'redux';
import authReducer from './authReducer';
import deviceReducer from './deviceReducer';
export default combineReducers({
    auth: authReducer,
    deviceInfo: deviceReducer
});