import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import {browserHistory} from 'react-router';
import { routerMiddleware } from 'react-router-redux';



export default function configureStore(initialState = {animals:[]}) {
  const routingMiddleware = routerMiddleware(browserHistory);
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk , routingMiddleware)));

  return store;
}
