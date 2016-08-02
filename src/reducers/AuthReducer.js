import {
  LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAILURE } from '../actions/AuthActions';

  export default function(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
  switch (action.type) {

    case LOGIN_REQUEST:
      return Object.assign({}, state,
      {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCESS:
      return Object.assign({}, state,
      {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      console.log(action);
      return Object.assign({}, state,
      {
        isFetching: false,
        isAuthenticated: false,
        errorDictionary: action.errorDictionary ? action.errorDictionary : {email: 'Błędne hasło lub email', password: 'Błędne hasło lub email'}
      });
    default:
      return state;
    }
  }
