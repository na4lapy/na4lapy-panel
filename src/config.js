export default  process.env.NODE_ENV === 'development' ? 'https://api.na4lapy.org/shelter/' : 'https://api.na4lapy.org/shelter/';
export const TOKEN_KEY = 'token';
export const DATE_FORMAT = 'DD MMM, YYYY';
export const TOAST_DURATION = 2000;

export const failedFilesMessage = (failedFiles) => {
  let message = "Wystąpił błąd przy przesyłaniu następujących plików: ";
  message += failedFiles.join(", ");

  message += ". Może są za duże? Spróbuj zmniejszyć ich rozmiar.";
  return message;
};
