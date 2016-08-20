// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import {modelReducer, formReducer} from 'react-redux-form';
 import {animalInitialState} from '../initialStates';
 import AnimalListReducer from './AnimalListReducer';
 import AuthReducer from './AuthReducer';

 const rootReducer = combineReducers({
   userAuth: AuthReducer,
   routing: routerReducer,
   animalListState: AnimalListReducer,
   animal:  modelReducer('animal', animalInitialState),
   animalForm: formReducer('animal', animalInitialState)
});

 export default rootReducer;
