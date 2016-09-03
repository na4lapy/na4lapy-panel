import {TOAST_DURATION} from './config';

export default function toast(message) {
  Materialize.toast(message, TOAST_DURATION); //eslint-disable-line
}


export const SAVE_SHELTER_MSG = 'Dane schroniska zostały zapisane';
export const DELETE_ANIMAL_MSG = 'Zwierzę usunięto';
export const SAVE_ANIMAL_MSG = 'Zwierzę zapisano';
