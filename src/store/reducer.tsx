import { ReducerAction } from '../models/reducerAction';
import * as actionTypes from './constants';

const initialState = {
    username: '',
    userAccessToken: '',
    userRefreshToken: ''
};

function reducer(state = initialState, action: ReducerAction) {
    switch (action.type) {
        case actionTypes.SET_USER_NAME:
            return {
                ...state,
                username: action.payload
            };
        case actionTypes.SET_USER_ACCESS_TOKEN:
            return {
                ...state,
                userAccessToken: action.payload
            };
        case actionTypes.SET_USER_REFRESH_TOKEN:
            return {
                ...state,
                userRefreshToken: action.payload
            };
        default:
            return state;
    }
}

export default reducer;
