import {
    ASK_ABOUT_PAGE,
    FB_REQUEST_START,
    FB_REQUEST_SUCCESS
  } from '../actions/FacebookActions';


export default function(state = {}, action) {
  switch (action.type) {
    case ASK_ABOUT_PAGE:
      return Object.assign({}, state, {
        ...action
      });
    case FB_REQUEST_START:
      return Object.assign({}, state, {
        ...action
      });
    case FB_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        ...action
      });
    default:
      return state;
  }
}
