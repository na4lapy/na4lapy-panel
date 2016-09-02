import React, {PropTypes} from 'react';

const FileRemovalModal = ({fileName, removeCallback, photosType}) => {
  return (
    <div id="removingFileModal" className="modal bottom-sheet">
     <div className="modal-content">
       <h4>Usuwanie zdjęcia</h4>
       <p>Czy na pewno chcesz usunąć zdjęcie {fileName}  ze zdjęć {photosType}?</p>
     </div>
     <div className="modal-footer">
       <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Zachowaj</a>
       <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={removeCallback}>Usuń</a>
     </div>
   </div>
  );

};

FileRemovalModal.propTypes = {
  removeCallback: PropTypes.func,
  fileName: PropTypes.string,
  photosType: PropTypes.string
};

export default FileRemovalModal;
