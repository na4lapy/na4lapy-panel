import { SET_SORTING } from '../actions/SortingActions';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SORTING:
        if(action.sortingKey === state.sortingKey && state.order == 'DESC') {
          action.order = 'ASC';
        } else {
          action.order = 'DESC';
        }
        return {...action};
    default:
      return state;
  }
}
