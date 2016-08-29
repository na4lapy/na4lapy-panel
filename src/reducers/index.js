// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import {modelReducer, formReducer} from 'react-redux-form';
 import {animalInitialState} from '../initialStates';
 import AnimalListReducer from './AnimalListReducer';
 import AuthReducer from './AuthReducer';
 import FilterReducer from './FilterReducer';

 const rootReducer = combineReducers({
   userAuth: AuthReducer,
   routing: routerReducer,
   animalListState: AnimalListReducer,
   animalFilter: FilterReducer,
   animal:  modelReducer('animal', animalInitialState),
   animalForm: formReducer('animal', animalInitialState)
});

 export default rootReducer;
