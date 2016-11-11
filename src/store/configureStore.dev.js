// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from '../reducers/index';


export default function configureStore(initialState = {animals:[]}) {
  const routingMiddleware = routerMiddleware(browserHistory);
  const store = createStore(rootReducer, initialState, compose(
    // Add other routingMiddleware on this line...
    applyMiddleware(thunk , routingMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
