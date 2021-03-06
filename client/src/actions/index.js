import axios from 'axios'; //used to make ajax request
import {
    FETCH_USER,
    FETCH_DEVICE,
    FETCH_CATEGORY,
    FETCH_ONLINECOUNT,
    FETCH_OFFLINECOUNT,
    FETCH_TOTALCOUNT,
    FETCH_HISTORY,
    FETCH_HISTORY_DEVICE,
    LOGOUT
} from './types';

//fetchUser is a action creater
export const fetchUser = () => async dispatch => {

    //this is the action
    const res = await axios.get('/api/auth/current_user');
    //console.log(res);
    // we want to dispatch only after we get response from the above api request.
    //dispatch function 
    dispatch({ type: FETCH_USER, payload: res.data });

};

export const fetchDevice = () => async dispatch => {
    const res = await axios.get('/api/deviceprofile');
    //console.log(res);
    dispatch({ type: FETCH_DEVICE, payload: res.data });
};

export const fetchOnlineCount = () => async dispatch => {
    const res = await axios.get('/api/deviceprofile/onlinecount');
    dispatch({ type: FETCH_ONLINECOUNT, payload: res.data });
};

export const fetchOfflineCount = () => async dispatch => {
    const res = await axios.get('/api/deviceprofile/offlinecount');
    dispatch({ type: FETCH_OFFLINECOUNT, payload: res.data });
};

export const fetchCategory = () => async dispatch => {
    const res = await axios.get('/api/deviceprofile/analyticdata');
    console.log(res);
    dispatch({ type: FETCH_CATEGORY, payload: res.data });
}

export const fetchTotalCount = () => async dispatch => {
    const res = await axios.get('/api/deviceprofile/totalcount');
    console.log(res);
    dispatch({ type: FETCH_TOTALCOUNT, payload: res.data });
}

export const fetchHistory = () => async dispatch => {
    const res = await axios.get('/api/history');
    console.log(res);
    dispatch({ type: FETCH_HISTORY, payload: res.data });
}

export const fetchHistoryDevice = (deviceid) => async dispatch => {
    try {
        const res = await axios.get(`/api/history/${deviceid}`);
        console.log(res);
        dispatch({ type: FETCH_HISTORY_DEVICE, payload: res.data });
    } catch (error) {

    }

}

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
}