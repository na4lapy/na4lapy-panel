export const POST_ANIMAL_TO_FACEBOOK = 'POST_ANIMAL_TO_FACEBOOK';
export const ASK_ABOUT_PAGE = 'ASK_ABOUT_PAGE';
export const FB_REQUEST_START = 'FB_REQUEST_START';
export const FB_REQUEST_SUCCESS = 'FB_REQUEST_SUCCESS';
const UNATHORIZED_STATUS = "not_authorized";
const UNKNOWN_STATUS = "unknown";
import API_BASE_URL from '../config';
import toast, {FACEBOOK_CONNECT_MSG, FACEBOOK_UPLOAD_MSG, FACEBOOK_DONE_MSG} from '../utils';
let API_URL_FILES = API_BASE_URL + 'files/';

export function postAnimalToFacebook(animal) {
  return dispatch => {

    /* 1. Check login status
      2. If logged post Animal
      3. If not logged login and postAnimal */
      dispatch(fbRequestStart(FACEBOOK_CONNECT_MSG));
      FB.getLoginStatus((response) => { //eslint-disable-line
          statusChangeCallback(response, animal,dispatch);
      });
  };
}

function statusChangeCallback(response, animal, dispatch){
  if (response.status === UNATHORIZED_STATUS || response.status === UNKNOWN_STATUS) {
      FB.login((response) => { //eslint-disable-line
        dispatch(fbRequestSuccess());
        promptUserChooseAccount(dispatch, animal);
      }, {scope: 'manage_pages,publish_pages'});
  } else {
    dispatch(fbRequestSuccess());
    promptUserChooseAccount(dispatch, animal);
  }

  function promptUserChooseAccount(dispatch, animal) {
    FB.api('/me/accounts', function(response) { //eslint-disable-line
      if (response.data && response.data.length > 0){
        dispatch(fbRequestSuccess());
        // console.log("let user choose accounts");
        dispatch(letUserChooseAccount(response.data, animal));
      }
    });
  }


  function letUserChooseAccount(accounts, animal) {
    return {
      type: ASK_ABOUT_PAGE,
      showPostAsPopup: true,
      fb_animal: animal,
      accounts
    };
  }
}

export function onFbAccountChoosen(token, id, animal) {
  return dispatch => {
      dispatch(fbRequestStart(FACEBOOK_UPLOAD_MSG));
      let uploadedPhotoCount = 0;
      let unpublishedPhotoFBids = [];
     animal.photos.map((photo) => {
       FB.api( //eslint-disable-line
         id + '/photos?debug=all',
         'post',
         {
           access_token: token,
           published: false,
           url: API_URL_FILES  + photo.fileName
         }, function (response) {
            if (response.id) {
              uploadedPhotoCount++;
              unpublishedPhotoFBids.push(response.id);
              if(uploadedPhotoCount == animal.photos.length) {
                FB.api( //eslint-disable-line
                  id + "/feed",
                  "post",
                  {
                    access_token: token,
                    message: animal.description,
                    attached_media: unpublishedPhotoFBids.map((photoId) => { return {media_fbid: photoId}; })
                  },
                  function() {
                    dispatch(fbRequestSuccess());
                    toast(FACEBOOK_DONE_MSG);
                  }
                );
              }
            }
         }
      );
     });
  };
}

export function logoutOutOfFacebook() {
  return () => {
     FB.getLoginStatus(function(response) { //eslint-disable-line
      FB.logout(function(response) { //eslint-disable-line
      });
    });
  };
}

function fbRequestStart(message){
  return {
    type: FB_REQUEST_START,
    isFetching: true,
    loaderMessage: message,
    showPostAsPopup: false
  };
}

function fbRequestSuccess(){
  return {
    type: FB_REQUEST_SUCCESS,
    isFetching: false,
    showPostAsPopup: false
  };
}
