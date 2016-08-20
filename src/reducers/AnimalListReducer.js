import {
    GET_ANIMALS_REQUEST,
    GET_ANIMALS_SUCCESS,
    GET_ANIMALS_FAILURE
} from '../actions/AnimalActions';


export default function(state = {}, action) {
  switch(action.type){
    case GET_ANIMALS_REQUEST:
      return Object.assign({}, state,{
        ...action
      });
    case GET_ANIMALS_SUCCESS:
      return Object.assign({}, state, {
        ...action
      });
    case GET_ANIMALS_FAILURE:
      return Object.assign({}, state, {
        ...action
      });
    default:
      return state;
  }
}
