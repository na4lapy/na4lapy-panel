import React from 'react';
import TermsOfUse from './TermsOfUse';

class TermsOfUseModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    <div id="termsOfUseModal" className="modal modal-fixed-footer">
      <div className="modal-content">
      <TermsOfUse />
      </div>

    <div className="modal-footer">
      <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>;
  }

}


export default TermsOfUseModal;
