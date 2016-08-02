// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import AuthReducer from './AuthReducer';

 const rootReducer = combineReducers({
   userAuth: AuthReducer,
   routing: routerReducer
});

 export default rootReducer;
