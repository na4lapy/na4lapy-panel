import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
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

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
