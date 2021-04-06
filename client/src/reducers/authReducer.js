import { FETCH_USER, LOGOUT } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        //if the action is fetch_user send the payload
        case FETCH_USER:
            return {
                ...state,
                // isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}