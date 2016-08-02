import axios from 'axios';
import { push } from 'react-router-redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

import API_URL, {TOKEN_KEY} from '../config';

export function loginUser(credentials) {
  return dispatch =>  {
    //dispatch login request started
    dispatch(requestLogin(credentials));
    return axios.post(API_URL + 'login',{
      email: credentials.email,
      password: credentials.password
    }).then(response => {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      dispatch(receiveLogin());
      dispatch(push('list'));
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

  function loginError(errorDictionary) {
    return {
      type: LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      errorDictionary
    };
  }

}
