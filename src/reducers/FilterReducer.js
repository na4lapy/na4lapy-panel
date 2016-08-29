import {
  SET_FILTER
} from '../actions/FilterActions';


export default function(state = {}, action) {
  let newDictionary = {};
  newDictionary[action.name] = action.value;

  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, {
        ...newDictionary
      });
    default:
      return state;
  }
}
