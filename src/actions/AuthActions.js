import axios from 'axios';
import { push } from 'react-router-redux';
import {ANIMALS_URL} from '../routes_urls';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

import {TOKEN_KEY} from '../config';

let AUTH_URL = 'https://api.na4lapy.org/';

export function loginUser(credentials) {
  return dispatch =>  {
    //dispatch login request started
    dispatch(requestLogin(credentials));
    return axios.post(AUTH_URL + 'login',{
      email: credentials.email,
      password: credentials.password
    }).then(response => {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      dispatch(receiveLogin());
      dispatch(push(ANIMALS_URL));
    }).catch((error) => {
      dispatch(loginError(error.response.data));
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

export function logoutUser(){

  return dispatch => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(logoutRequest());
    return axios.post(AUTH_URL + 'logout',{
      token: localStorage.getItem(TOKEN_KEY)
    }).then( () => {
      dispatch(logoutSuccess());
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

  function logoutFailure(errorData) {
    return {
      type: LOGOUT_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      errors: errorData.response
    };
  }
}
