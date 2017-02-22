import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import axios from 'axios';
import {syncHistoryWithStore, push} from 'react-router-redux';
/* eslint-disable */
import configureStore from './store/configureStore';
/* eslint-enable */

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import './styles/index.sass';
import {REJECT_AUTH_HTTP_CODE, AUTH_COOKIE_KEY} from './config';

import routes from './routes';
import {filterInitialState} from './initialStates';

import {getCookie} from './utils';

const store = configureStore(filterInitialState);

const history = syncHistoryWithStore(browserHistory, store);

axios.defaults.validateStatus = status => {
  return (status >= 200 && status < 400) ;
};

axios.interceptors.request.use(config => {
  config.withCredentials = true;
  let token = getCookie(AUTH_COOKIE_KEY);
  if (token && token.length >= 0 ) {
      config.headers[AUTH_COOKIE_KEY] = token;
  }
  return config;
});

axios.interceptors.response.use( (response) => {
  return response;
}, (error) => {
  let response = error.response;
  //Unauthorized, token expired
  if (response.status === REJECT_AUTH_HTTP_CODE) {
    store.dispatch(push("/"));
    return Promise.reject(error);
  }
  return response;
}

);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
