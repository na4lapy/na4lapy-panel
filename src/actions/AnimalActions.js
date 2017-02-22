import axios from 'axios';
import API_BASE_URL from '../config';
import {push} from 'react-router-redux';
import {actions} from 'react-redux-form';
import {ANIMALS_URL} from '../routes_urls';
import toast, {SAVE_ANIMAL_MSG, DELETE_ANIMAL_MSG} from '../utils';

let API_URL_REMOVE_ALL = API_BASE_URL + 'files/removeall/';

export const SAVE_ANIMAL_REQUEST = 'SAVE_ANIMAL_REQUEST';
export const SAVE_ANIMAL_SUCCESS = 'SAVE_ANIMAL_SUCCESS';
export const SAVE_ANIMAL_FAILURE = 'SAVE_ANIMAL_FAILURE';

export const GET_ANIMALS_REQUEST = 'GET_ANIMALS_REQUEST';
export const GET_ANIMALS_SUCCESS = 'GET_ANIMALS_SUCCESS';
export const GET_ANIMALS_FAILURE = 'GET_ANIMALS_FAILURE';

export const DELETE_ANIMALS_REQUEST = 'DELETE_ANIMALS_REQUEST';
export const DELETE_ANIMALS_SUCCESS = 'DELETE_ANIMALS_SUCCESS';
export const DELETE_ANIMALS_FAILURE = 'DELETE_ANIMALS_FAILURE';

export const PHOTO_RESOLVED = 'PHOTO_RESOLVED';

/* SAVING ANIMAL FORM OBJECT TO THE API */
//TODO: refactor needed
export function saveAnimal(animal) {
  return dispatch => {
    let method = 'post';
    let url = API_BASE_URL + 'animals';
    if(animal.id) {
      method = 'patch';
    }
    dispatch(saveAnimalRequest());
    return axios.request({
      method,
      url,
      data: {
        ...animal
      },
    }).then(response => {
      //save newly created photos
      let isUploadedPhotoProfile = animal.photos.filter((photo) => {return  photo.profil; }).length == 1;
      let shouldMarkFirstPhotoProfile = typeof animal.tempPhotos == "undefined" || animal.tempPhotos.length == 0;
      updatePhotosInAPI(animal.photos, shouldMarkFirstPhotoProfile, dispatch);
      if (animal.tempPhotos && animal.tempPhotos.length != 0) {

        sendPhotosToAPI(animal.tempPhotos,response.data.id, dispatch, isUploadedPhotoProfile);
      } else {
        dispatch(saveAnimalSuccess());
        toast(SAVE_ANIMAL_MSG);
        dispatch(push(ANIMALS_URL));
      }
    });
    // .catch((err) => {
    //   // dispatch(saveAnimalFailure());
    //   toast(err);
    // });
  };

  function saveAnimalRequest(){
    return {
      type: SAVE_ANIMAL_REQUEST,
      isFetching: true,
      isAnimalSaved: false
    };
  }
}

function sendPhotosToAPI(animalPhotos,animalId, dispatch, isUploadedPhotoProfile) {

    //update animal array to make first animalPhoto profile
    if  (animalPhotos.filter((item) => {
      return item.profil;
    }).length == 0 && !isUploadedPhotoProfile) {
      animalPhotos[0].profil = true;
    }
    //init dispatch

    //if successCounter == animalPhotosl.length that means every photo was uploaded
    let successCounter = 0;

    animalPhotos.map(file => {
      return axios.post(
        API_BASE_URL + 'files/upload/' + file.name,
        file,
        {
            params: {
              animalId: animalId,
              profil: file.profil
            },
            headers: {
              'Content-Type': file.type
            }
        }).then(() => {
          successCounter++;
          if (successCounter == animalPhotos.length) {
            dispatch(saveAnimalSuccess());
            toast(SAVE_ANIMAL_MSG);
            dispatch(push(ANIMALS_URL));
          }
        }).catch(() => {
          });
        });
  }

  function saveAnimalSuccess(){
    return {
      type: SAVE_ANIMAL_SUCCESS,
      isFetching: false,
      isAnimalSaved: true
    };
  }

function updatePhotosInAPI(animalPhotos, shouldMarkFirstPhotoProfile, dispatch) {

  let count = 0;
  if (animalPhotos.length > 0 && shouldMarkFirstPhotoProfile && animalPhotos.filter((item) => {return item.profil;}).length == 0) {
    animalPhotos[0].profil = true;
  }

  animalPhotos.map(photo => {
    return axios.patch(API_BASE_URL + 'files/' + photo.id + "?profil="+photo.profil).then(() => {
      count++;
      if (count == animalPhotos.length) {
        dispatch(saveAnimalSuccess());
        dispatch(push(ANIMALS_URL));
      }
    }).catch(() => {

    });
  });
}

export function clearPhotoUploadError() {
  return {
    type: SAVE_ANIMAL_FAILURE,
    isFetching: false,
    isAnimalSaved: false,
    errors: null
  };
}

export function getAnimals(id){
  return dispatch => {
    dispatch(getAnimalsRequest());
    let url = API_BASE_URL + 'animals';
    if(typeof id !== 'undefined'){
      url += '/' + id;
    }
    return axios.get(url)
    .then(response => {
      if(typeof id !== 'undefined'){
        dispatch(actions.change('animal', response.data));
        dispatch(getAnimalsSuccess([]));
      } else {
        dispatch(getAnimalsSuccess(response.data.data));
      }
    }).catch((err) => {
      dispatch(getAnimalsFailure(err.response.data));
    });
  };

  function getAnimalsRequest(){
    return {
      type: GET_ANIMALS_REQUEST,
      isFetching: true,
      areAnimalsLoaded: false
    };
  }

  function getAnimalsSuccess(animals) {
    return {
      type: GET_ANIMALS_SUCCESS,
      isFetching: false,
      areAnimalsLoaded: true,
      animals,
    };
  }

  function getAnimalsFailure(errors){
    return {
      type: GET_ANIMALS_FAILURE,
      isFetching: false,
      areAnimalsLoaded: false,
      errors
    };
  }
}

export function deleteAnimal (id) {
  return dispatch => {

    dispatch(deleteAnimalRequest());
    //remove all photos of given animal
    axios.delete(API_URL_REMOVE_ALL + id).then(() => {
      //remove the animal
        axios.delete(API_BASE_URL + 'animals/' + id).then(() => {
          dispatch(deleteAnimalSuccess());
          toast(DELETE_ANIMAL_MSG);
          dispatch(getAnimals());
        }).catch((err) => {
          dispatch(deleteAnimalFailure(err.response.data));
        });
    } ).catch( (err) => {
      dispatch(deleteAnimalFailure(err.response.data));
    });

  };

  function deleteAnimalRequest(){
    return {
      type: DELETE_ANIMALS_REQUEST,
      isAnimalDeleted: false,
      isFetching: true
    };
  }

  function deleteAnimalSuccess() {
      return {
        type: DELETE_ANIMALS_SUCCESS,
        isAnimalDeleted: true,
        isFetching: false
      };
    }

  function deleteAnimalFailure(errors) {
    return {
        type: DELETE_ANIMALS_FAILURE,
        isAnimalDeleted: false,
        isFetching: false,
        errors,
      };
    }
}
