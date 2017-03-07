import axios from 'axios';
import API_URL from '../config';
import {actions} from 'react-redux-form';
import toast, {SAVE_SHELTER_MSG} from '../utils';

export const LOAD_SHELTER_REQUEST = 'LOAD_SHELTER_REQUEST';
export const LOAD_SHELTER_SUCCESS = 'LOAD_SHELTER_SUCCESS';
export const LOAD_SHELTER_FAILURE = 'LOAD_SHELTER_FAILURE';

export const SAVE_SHELTER_REQUEST = 'SAVE_SHELTER_REQUEST';
export const SAVE_SHELTER_SUCCESS = 'SAVE_SHELTER_SUCCESS';
export const SAVE_SHELTER_FAILURE = 'SAVE_SHELTER_FAILURE';

export function loadShelter() {

  const loadShelterRequest = () => {
    return {
      type: LOAD_SHELTER_REQUEST,
      isShelterLoaded: false,
      isFetching: true
    };
  };

  const loadShelterSuccess = (shelter) => {
    return {
      shelter,
      type: LOAD_SHELTER_SUCCESS,
      isShelterLoaded: true,
      isFetching: false
    };
  };

  const loadShelterFailure = (errors) => {
    return {
      errors,
      type: LOAD_SHELTER_SUCCESS,
      isShelterLoaded: false,
      isFetching: false
    };
  };

  return dispatch => {
    dispatch(loadShelterRequest());
    return axios.get(API_URL + 'shelter')
      .then((response) => {
        dispatch(loadShelterSuccess(response.data));
        dispatch(actions.change('shelter', response.data));
      }).catch((err) => {
        loadShelterFailure(err.response.data);
      });
    };

}

export function saveShelter(shelter) {

  const saveShelterRequest = () =>{
    return {
      type: SAVE_SHELTER_REQUEST,
      isFetching: true,
      isShelterSaved: false
    };
  };

  const saveShelterSuccess = () => {
    return {
      type: SAVE_SHELTER_SUCCESS,
      isFetching: false,
      isShelterSaved: true
    };
  };

  const saveShelterFailure = (errors) => {
    return {
      errors,
      type: SAVE_SHELTER_FAILURE,
      isFetching: false,
      isShelterSaved: false
    };
  };

  return dispatch => {
    dispatch(saveShelterRequest());

    let method = 'post';

    if(shelter.id) {
      method = 'patch';
    }

  return axios.request({
      method,
      url: API_URL + 'shelter',
      data: {
        ...shelter
      }
    }).then(() => {
      toast(SAVE_SHELTER_MSG);
      dispatch(saveShelterSuccess());
    }).catch((err) => {
      dispatch(saveShelterFailure(err.response.data));
    });

  };
}
