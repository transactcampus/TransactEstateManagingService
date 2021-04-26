import { FETCH_HISTORY, FETCH_HISTORY_DEVICE } from '../actions/types';

const initialState = {
    deviceshistory: [],
    devicehistory: [],
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        //if the action is fetch_device send the payload
        case FETCH_HISTORY:
            return {
                ...state,
                deviceshistory: payload
            };
        case FETCH_HISTORY_DEVICE:
            return {
                ...state,
                devicehistory: payload
            };
        default:
            return state;
    }
}