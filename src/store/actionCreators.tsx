import * as actionTypes from './constants';

export const setUserId = (userId: string) => {
    return {
        type: actionTypes.SET_USER_ID,
        payload: userId
    };
};

export const setUserName = (username: string) => {
    return {
        type: actionTypes.SET_USER_NAME,
        payload: username
    };
};

export const setUserAccessToken = (accessToken: string) => {
    return {
        type: actionTypes.SET_USER_ACCESS_TOKEN,
        payload: accessToken
    };
};

export const setUserRefreshToken = (refreshToken: string) => {
    return {
        type: actionTypes.SET_USER_REFRESH_TOKEN,
        payload: refreshToken
    };
};

export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT
    };
};
