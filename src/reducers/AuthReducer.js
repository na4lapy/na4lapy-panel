import {
  LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAILURE,
  TOKEN_ERROR,
  SAVE_NEW_PASSWORD_FAILURE,
  RESET_NEW_PASSWORD_ERRORS
 } from '../actions/AuthActions';

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
      });
    case LOGIN_SUCESS:
      return Object.assign({}, state,
      {
        isFetching: false,
        isAuthenticated: true,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state,
      {
        isFetching: false,
        isAuthenticated: false,
        errorDictionary: {email: 'Błędne hasło lub email', password: 'Błędne hasło lub email'}
      });
    case TOKEN_ERROR: {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        tokenError: 'Wylogowano z powodu wygaśnięcia sesji lub błędu tokenu'
      });
    }
    case SAVE_NEW_PASSWORD_FAILURE: {
      return Object.assign({}, state, {...action});
    }
    case RESET_NEW_PASSWORD_ERRORS: {
      return Object.assign({}, state, {
        errors: {}
      });
    }
    default:
      return state;
    }
  }
