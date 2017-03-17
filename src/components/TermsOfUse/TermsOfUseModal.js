import React, {PropTypes} from 'react';
import TermsOfUse from './TermsOfUse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAreTermsOfUseAccepted} from '../../actions/AuthActions';

class TermsOfUseModal extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAreTermsOfUseAccepted();
  }

  render(){
    return(
      <div id="termsOfUseModal" className="modal modal-fixed-footer">
        <div className="modal-content">
        <TermsOfUse />
        </div>

      <div className="modal-footer">
        <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
  );
  }
}

TermsOfUse.propTypes = {
  getAreTermsOfUseAccepted: PropTypes.func
}


const mapDispatchToProps = (dispatch) => {
  return {
    areTermsOfUseAccepted: bindActionCreators(getAreTermsOfUseAccepted,dispatch)
  };
};

export default connect(null, mapDispatchToProps)(TermsOfUseModal);
