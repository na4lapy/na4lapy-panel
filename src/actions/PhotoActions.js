export const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
export const DELETE_PHOTO_FAILURE = 'DELETE_ANIMALS_FAILURE';

export const DELETE_ALL_PHOTOS_REQUEST = 'DELETE_ALL_PHOTOS_REQUEST';

import API_BASE_URL from '../config';
import axios from 'axios';
import {getAnimals} from './AnimalActions';
let API_URL_FILES = API_BASE_URL + 'files/';

export function deletePhoto(animalId,id) {
  return dispatch => {

    dispatch(deletePhotoRequest());
    axios.delete(API_URL_FILES + id).then(() => {
      dispatch(deletePhotoSuccess());
      dispatch(getAnimals(animalId));
    }).catch((err) => {
      dispatch(deletePhotoFailure(err.resonse.data));
    });
  };

  function deletePhotoRequest(){
    return {
      type: DELETE_PHOTO_REQUEST,
      isFetching: true,
      isPhotoDeleted: false
    };
  }

  function deletePhotoSuccess(){
    return {
      type: DELETE_PHOTO_SUCCESS
    };
  }

  function deletePhotoFailure(error){
    return {
      type: DELETE_PHOTO_FAILURE,
      error
    };
  }
}
