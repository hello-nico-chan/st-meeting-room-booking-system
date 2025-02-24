import { ReducerAction } from '../models/reducerAction';
import * as actionTypes from './constants';

const initialState = {
    userId: localStorage.getItem('userId') || '',
    username: localStorage.getItem('username') || '',
    userIsAdmin: localStorage.getItem('isAdmin') || '',
    userAccessToken: localStorage.getItem('accessToken') || '',
    userRefreshToken: localStorage.getItem('refreshToken') || ''
};

function reducer(state = initialState, action: ReducerAction) {
    switch (action.type) {
        case actionTypes.SET_USER_ID:
            localStorage.setItem('userId', action.payload);
            return {
                ...state,
                userId: action.payload
            };
        case actionTypes.SET_USER_NAME:
            localStorage.setItem('username', action.payload);
            return {
                ...state,
                username: action.payload
            };
        case actionTypes.SET_USER_IS_ADMIN:
            localStorage.setItem('isAdmin', action.payload);
            return {
                ...state,
                userIsAdmin: action.payload
            };
        case actionTypes.SET_USER_ACCESS_TOKEN:
            localStorage.setItem('accessToken', action.payload);
            return {
                ...state,
                userAccessToken: action.payload
            };
        case actionTypes.SET_USER_REFRESH_TOKEN:
            localStorage.setItem('refreshToken', action.payload);
            return {
                ...state,
                userRefreshToken: action.payload
            };
        case actionTypes.SIGN_OUT:
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return {
                ...initialState
            };
        default:
            return state;
    }
}

export default reducer;
