import React, {PropTypes} from 'react';

const FBAccountChooseModal = ({accounts, chooseAccountCallback}) => {

  function closeModal() {
    $('#FBAccountChooseModal').modal('close');
  }

  return (
    <div id="FBAccountChooseModal" className="modal bottom-sheet">
      <div className="modal-content">
      <h3>Łączenie z kontem FB</h3>
      <h4>Dla którego konta chcesz opublikować zwierzę?</h4>
      {accounts && accounts.map((account) => {
        return (
          <div key={account.id} className="row">
            <div className="col s3">{account.name}</div>
            <div className="col s3"><button className="btn" onClick={() => {closeModal(); chooseAccountCallback(account.access_token,account.id); }}>Wybierz</button></div>
          </div>
        );
        })
      }
      <div className="modal-footer">
        <input type="checkbox" id="test5" />
        <button onClick={closeModal} className="modal-action waves-effect text-red btn-flat">Anuluj</button>
      </div>
      </div>
    </div>
  );
};

FBAccountChooseModal.propTypes = {
  accounts: PropTypes.array,
  chooseAccountCallback: PropTypes.func
};

export default FBAccountChooseModal;
