import {
  LOAD_SHELTER_REQUEST,
  LOAD_SHELTER_SUCCESS,
  LOAD_SHELTER_FAILURE,

  SAVE_SHELTER_REQUEST,
  SAVE_SHELTER_SUCCESS,
  SAVE_SHELTER_FAILURE

} from '../actions/ShelterActions';


export default function(state = {}, action) {

  switch (action.type) {
    case LOAD_SHELTER_REQUEST:
      return {...state, ...action};
    case LOAD_SHELTER_SUCCESS:
      return {...state, ...action};
    case LOAD_SHELTER_FAILURE:
      return {...state, ...action};
    case SAVE_SHELTER_REQUEST:
      return {...state, ...action};
    case SAVE_SHELTER_SUCCESS:
      return {...state, ...action};
    case SAVE_SHELTER_FAILURE:
      return {...state, ...action};
    default:
      return state;
  }
}
