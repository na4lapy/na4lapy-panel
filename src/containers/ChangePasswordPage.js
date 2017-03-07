import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from 'react-redux-form';
import {resetNewPasswordErrors} from '../actions/AuthActions';

import ChangePasswordForm from '../components/Settings/ChangePasswordForm';

class ChangePasswordPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.resetModel('passwordSettings');
    this.props.resetNewPasswordErrors();
  }

  render(){
    return (
      <div className="container">
        <ChangePasswordForm />
        //TODO: addLoader
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  resetModel: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetModel: bindActionCreators(actions.reset, dispatch),
    resetNewPasswordErrors: bindActionCreators(resetNewPasswordErrors, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ChangePasswordPage);
