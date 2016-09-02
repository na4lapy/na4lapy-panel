import React, {PropTypes} from 'react';

const AnimalRemovalModal = ({animal, removeCallback}) => {
  return (
    <div id="removingAnimalModal" className="modal bottom-sheet">
     <div className="modal-content">
       <h4>Usuwanie zwierzęcia</h4>
       <p>Czy na pewno chcesz usunąć <b>{animal &&  animal.name}</b> ze zwierząt?</p>
     </div>
     <div className="modal-footer">
       <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Zachowaj</a>
       <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => removeCallback(animal.id)}>Usuń</a>
     </div>
   </div>
  );

};

AnimalRemovalModal.propTypes = {
  removeCallback: PropTypes.func,
  animal: PropTypes.object,
  photosType: PropTypes.string
};

export default AnimalRemovalModal;
