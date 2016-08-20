import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import {TOKEN_KEY} from './config';
import axios from 'axios';
import {push} from 'react-router-redux';
/* eslint-disable */
import configureStore from './store/configureStore';
/* eslint-enable */
import { syncHistoryWithStore } from 'react-router-redux';

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import './styles/index.sass';

import routes from './routes';

const store = configureStore({});

const history = syncHistoryWithStore(browserHistory, store);

axios.defaults.validateStatus = status => {
  return (status >= 200 && status < 400) || status == 401;
};
axios.interceptors.response.use(response => {
  if(response.status == 401) {
    localStorage.removeItem(TOKEN_KEY);
    store.dispatch(push('/'));
  }
  return response;
});
//
axios.interceptors.request.use(config => {

  let token = localStorage.getItem(TOKEN_KEY);
  if (token && token.length >= 0 ) {
    config.headers['X-Auth-Token'] = token;
  }
  return config;
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
