import {
  SAVE_ANIMAL_REQUEST,
  SAVE_ANIMAL_SUCCESS,
  SAVE_ANIMAL_FAILURE,
  GET_ANIMALS_REQUEST,
  GET_ANIMALS_SUCCESS,
  GET_ANIMALS_FAILURE,
  PHOTO_RESOLVED
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
    case GET_ANIMALS_REQUEST:
      return Object.assign({}, state, {
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
    case PHOTO_RESOLVED:
      return Object.assign({}, state, {
        ...action
      });
    default:
      return state;
  }

}
