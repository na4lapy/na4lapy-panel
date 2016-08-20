import {
  SAVE_ANIMAL_REQUEST,
  SAVE_ANIMAL_SUCCESS,
  SAVE_ANIMAL_FAILURE,
} from '../actions/AnimalActions';


export default function(state = {}, action) {

  switch (action.type) {
    case SAVE_ANIMAL_REQUEST:
      return Object.assign({}, state, {
        ...action
      });
    case SAVE_ANIMAL_SUCCESS:
      return Object.assign({}, state, {
        ...action
      });
    case SAVE_ANIMAL_FAILURE:
      return Object.assign({}, state, {
        ...action
      });
    default:
      return state;
  }

}
