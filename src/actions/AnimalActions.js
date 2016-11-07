import axios from 'axios';
import API_BASE_URL from '../config';
import {push} from 'react-router-redux';
import {actions} from 'react-redux-form';
import {ANIMALS_URL} from '../routes_urls';
import toast, {SAVE_ANIMAL_MSG, DELETE_ANIMAL_MSG} from '../utils';

export const SAVE_ANIMAL_REQUEST = 'SAVE_ANIMAL_REQUEST';
export const SAVE_ANIMAL_SUCCESS = 'SAVE_ANIMAL_SUCCESS';
export const SAVE_ANIMAL_FAILURE = 'SAVE_ANIMAL_FAILURE';

export const GET_ANIMALS_REQUEST = 'GET_ANIMALS_REQUEST';
export const GET_ANIMALS_SUCCESS = 'GET_ANIMALS_SUCCESS';
export const GET_ANIMALS_FAILURE = 'GET_ANIMALS_FAILURE';

export const DELETE_ANIMALS_REQUEST = 'DELETE_ANIMALS_REQUEST';
export const DELETE_ANIMALS_SUCCESS = 'DELETE_ANIMALS_SUCCESS';
export const DELETE_ANIMALS_FAILURE = 'DELETE_ANIMALS_FAILURE';

/* SAVING ANIMAL FORM OBJECT TO THE API */

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
      if(animal.tempPhotos && animal.tempPhotos.length != 0){
        axios.all(animal.tempPhotos.map(file => {
          return axios.post(
            API_BASE_URL + 'files/upload/' + file.name,
            file,
            {
                params: {
                  animalId: response.data.id
                },
                headers: {
                  'Content-Type': file.type
                }
            });
        })
      ).then(() => {
        dispatch(saveAnimalSuccess());
        toast(SAVE_ANIMAL_MSG);
        dispatch(push(ANIMALS_URL));
      }).catch((err) => {
        dispatch(saveAnimalFailure(err.resposne.data));
      });
    } else {
        toast(SAVE_ANIMAL_MSG);
        dispatch(getAnimals());
        dispatch(saveAnimalSuccess());
        dispatch(push(ANIMALS_URL));
      }
    });
  };


  function saveAnimalRequest(){
    return {
      type: SAVE_ANIMAL_REQUEST,
      isFetching: true,
      isAnimalSaved: false
    };
  }

  function saveAnimalSuccess(){
    return {
      type: SAVE_ANIMAL_SUCCESS,
      isFetching: false,
      isAnimalSaved: true
    };
  }

  function saveAnimalFailure(errors){
    return {
      type: SAVE_ANIMAL_FAILURE,
      isFetching: false,
      isAnimalSaved: false,
      errors
    };
  }
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
    axios.delete(API_BASE_URL + 'animals/' + id).then(() => {
      dispatch(deleteAnimalSuccess());
      toast(DELETE_ANIMAL_MSG);
      dispatch(getAnimals());
    }).catch((err) => {
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
        errors
      };
    }
}
