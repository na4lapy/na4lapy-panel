import axios from 'axios';
import { push } from 'react-router-redux';
import {ANIMALS_URL} from '../routes_urls';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SAVE_NEW_PASSWORD_REQUEST = 'SAVE_NEW_PASSWORD_REQUEST';
export const SAVE_NEW_PASSWORD_FAILURE = 'SAVE_NEW_PASSWORD_FAILURE';
export const SAVE_NEW_PASSWORD_SUCCESS = 'SAVE_NEW_PASSWORD_SUCCESS';
export const RESET_NEW_PASSWORD_ERRORS = 'RESET_NEW_PASSWORD_ERRORS';

export const TOKEN_ERROR = 'TOKEN_ERROR';

import BASE_URL from '../config';

import toast, {deleteAllCookies, SAVE_PASSWORD_SUCCESS_MESSAGE} from '../utils';

let AUTH_URL = BASE_URL + 'auth/'
export function loginUser(credentials) {
  return dispatch =>  {
    //dispatch login request started
    dispatch(requestLogin(credentials));
    return axios.post(AUTH_URL + 'login',{
      email: credentials.email,
      password: credentials.password
    }
  ).then(() => {
      dispatch(receiveLogin());
      dispatch(push(ANIMALS_URL));

    }).catch(() => {
      dispatch(loginError());
    });
  };

    function requestLogin (creds) {
      return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
      };
  }

  function receiveLogin () {
    return {
      type: LOGIN_SUCESS,
      isFetching: false,
      isAuthenticated: true,
    };
  }

  function loginError(errors) {
    return {
      type: LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      errors
    };
  }
}


export function logoutDueToTokenError() {
  return {
    type:TOKEN_ERROR
  };
}

export function logoutUser(){

  return dispatch => {
    dispatch(logoutRequest());

    return axios.post(AUTH_URL + 'logout',{
    }).then( () => {
      dispatch(logoutSuccess());
      deleteAllCookies();
      dispatch(push("/"));
    }).catch((err) => {
      dispatch(logoutFailure(err));
    });

  };

  function logoutRequest() {
    return {
      type: LOGOUT_REQUEST,
      isFetching: true,
      isAuthenticated: true
    };
  }

  function logoutSuccess() {
    return {
      type: LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false,
    };
  }

  function logoutFailure() {
    return {
      type: LOGOUT_FAILURE,
      isFetching: false,
      isAuthenticated: false,
    };
  }
}

export function saveNewPassword(passwordSettings){
  return dispatch => {
    dispatch(saveNewPasswordRequest());
    return axios.post(AUTH_URL + 'change_password', {
      ...passwordSettings
    }).then(() => {
      dispatch(saveNewPasswordSuccess());
      toast(SAVE_PASSWORD_SUCCESS_MESSAGE);
    }).catch((err) => {
      dispatch(saveNewPasswordFailure(err));
    });
  };

  function saveNewPasswordRequest() {
    return {
      type: SAVE_NEW_PASSWORD_REQUEST,
      isFetching: true,
      isPasswordChanged: false
    };
  }

  function saveNewPasswordFailure(errors) {
    return {
      type: SAVE_NEW_PASSWORD_FAILURE,
      isFetching: false,
      isPasswordChanged: false,
      errors
    };
  }

  function saveNewPasswordSuccess() {
    return {
      type: SAVE_NEW_PASSWORD_SUCCESS,
      isFetching: false,
      isPasswordChanged: true
    }
  }
}

export function resetNewPasswordErrors() {
    return {
      type: RESET_NEW_PASSWORD_ERRORS
  }
}
