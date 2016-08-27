export const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
export const DELETE_PHOTO_FAILURE = 'DELETE_ANIMALS_FAILURE';
import API_URL from '../config';
import axios from 'axios';
import {getAnimals} from './AnimalActions';

export function deletePhoto(animalId,id) {
  return dispatch => {

    dispatch(deletePhotoRequest());
    axios.delete(API_URL + 'v1/files/' + id).then(() => {
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
