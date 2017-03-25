export default __DEV__ ? 'http://localhost:8123/' : 'https://api.na4lapy.org/'; //eslint-disable-line
export const DATE_FORMAT = 'DD MMM, YYYY';
export const TOAST_DURATION = 2000;
export const FILE_SIZE_LIMIT_IN_MB = 3;
export const REJECT_AUTH_HTTP_CODE = 403;
export const UNPROCESSABLE_ENTITY_HTTP_CODE = 422;
export const AUTH_COOKIE_KEY = 'kitura-session-id';

export const failedFilesMessage = (failedFiles) => {
  let message = "Wystąpił błąd przy przesyłaniu następujących plików: ";
  message += failedFiles.join(", ");

  message += ". Może są za duże? Spróbuj zmniejszyć ich rozmiar.";
  return message;
};

export const loaderOptions = {
  color: '#2FA59A',
  opacity: 0.25
};
