import {TOAST_DURATION} from './config';
import 'materialize-css/dist/js/materialize.js';

export default function toast(message) {
  Materialize.toast(message, TOAST_DURATION); //eslint-disable-line
}

export const SAVE_SHELTER_MSG = 'Dane schroniska zostały zapisane';
export const DELETE_ANIMAL_MSG = 'Zwierzę usunięto';
export const SAVE_ANIMAL_MSG = 'Zwierzę zapisano';

export const FACEBOOK_CONNECT_MSG = "Łączenie z facebookiem";
export const FACEBOOK_UPLOAD_MSG = "Publikowanie na facebooku";
export const FACEBOOK_DONE_MSG = "Zwierzę opublikowano na facebooku";

export const SAVE_PASSWORD_SUCCESS_MESSAGE = "Hasło zmienione pomyślnie";

export const MONTHS_FULL = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
export const MONTHS_SHORT = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];

export const WEEKDAYS_FULL = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
export const WEEKDAYS_SHORT = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob'];

export const TODAY = "Dziś";
export const CLEAR = "Wyczyść";
export const CLOSE = "Zamknij";


export function getCookie(cookiename)
  {
  // Get name followed by anything except a semicolon
  let cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : ""); //eslint-disable-line
  }

  export function deleteAllCookies() {
    let cookies = document.cookie.split(";");
    debugger;

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
