import { FETCH_USER } from '../actions/types';


export default function (state = null, action) {
    console.log(action);
    switch (action.type) {
        //if the action is fetch_user send the payload
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}