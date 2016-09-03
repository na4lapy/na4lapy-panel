import {TOAST_DURATION} from './config';

export default function toast(message) {
  Materialize.toast(message, TOAST_DURATION); //eslint-disable-line
}

export const SAVE_SHELTER_MSG = 'Dane schroniska zostały zapisane';
export const DELETE_ANIMAL_MSG = 'Zwierzę usunięto';
export const SAVE_ANIMAL_MSG = 'Zwierzę zapisano';

export const MONTHS_FULL = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
export const MONTHS_SHORT = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];

export const WEEKDAYS_FULL = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
export const WEEKDAYS_SHORT = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob'];

export const TODAY = "Dziś";
export const CLEAR = "Wyczyść";
export const CLOSE = "Zamknij";
