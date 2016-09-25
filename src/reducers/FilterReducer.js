import {
  SET_FILTER,
  RESET_FILTER
} from '../actions/FilterActions';

import {filterInitialState} from  '../initialStates';


export default function(state = {}, action) {
  let newDictionary = {};
  newDictionary[action.name] = action.value;

  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, {
        ...newDictionary
      });
    case RESET_FILTER:
      return Object.assign({}, state, {
        ...filterInitialState.animalFilter
      });
    default:
      return state;
  }
}
