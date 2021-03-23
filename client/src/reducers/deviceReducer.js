import { FETCH_DEVICE, FETCH_CATEGORY } from '../actions/types';

const initialState = {
    devicesInfos: [],
    devicesCategory: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        //if the action is fetch_device send the payload
        case FETCH_DEVICE:
            return {
                ...state,
                devicesInfos: payload
            };
        case FETCH_CATEGORY:
            return {
                ...state,
                devicesCategory: payload
            };
        default:
            return state;
    }
}