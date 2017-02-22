import React, {PropTypes} from 'react';

const ErrorModal = ({errorMessage, confirmationCallback}) => {
  return (
    <div id="error-modal" className="modal bottom-sheet">
     <div className="modal-content">
       <h4>Wystąpił błąd!</h4>
       <p>{errorMessage}</p>
     </div>
     <div className="modal-footer">
       <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={confirmationCallback}>OK</a>
     </div>
   </div>
  );

};

ErrorModal.propTypes = {
  errorMessage: PropTypes.string,
  confirmationCallback: PropTypes.func
};

export default ErrorModal;
