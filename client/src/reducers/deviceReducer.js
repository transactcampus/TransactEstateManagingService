import { FETCH_DEVICE } from '../actions/types';


export default function (state = [], action) {
    console.log(action);
    switch (action.type) {
        //if the action is fetch_device send the payload
        case FETCH_DEVICE:
            return action.payload;
        default:
            return state;
    }
}