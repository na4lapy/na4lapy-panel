import React, {PropTypes}  from 'react';
import {Form, Field} from 'react-redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {saveNewPassword} from '../../actions/AuthActions';
import errTranslateDictionary from '../../errorTranslateDictionary';

class ChangePasswordForm extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    let oldPasswordClass = this.props.errors && this.props.errors.oldPassword ? 'invalid' : '';
    let newPasswordClass = this.props.errors && this.props.errors.newPassword ? 'invalid' : '';
    let repeatNewPasswordClass = this.props.errors && this.props.errors.repeatNewPassword ? 'invalid' : '';

    console.log(errTranslateDictionary[this.props.errors.oldPassword]);
    return(
      <Form model="passwordSettings" onSubmit={(passwordSettings) => this.props.onSubmit(passwordSettings)}>
      <h1>Zmiana hasła</h1>
        <div className="row">
          <Field model="passwordSettings.oldPassword" className="input-field col s8">
            <input name="passwordSettings.oldPassword" type="password" placeholder="Stare hasło" className={oldPasswordClass}/>
            <label htmlFor="passwordSettings.oldPassword" data-error={this.props.errors && this.props.errors.oldPassword ? errTranslateDictionary[this.props.errors.oldPassword] : ''} className="active" >Stare hasło</label>
          </Field>
        </div>
        <div className="row">
          <Field model="passwordSettings.newPassword" className="input-field col s8 active">
            <input name="passwordSettings.newPassword" type="password" placeholder="Nowe hasło" className={newPasswordClass}/>
            <label data-error={this.props.errors && this.props.errors.newPassword ? errTranslateDictionary[this.props.errors.newPassword] : ''} htmlFor="passwordSettings.newPassword" className="active" >Nowe hasło</label>
          </Field>
        </div>
        <div className="row">
          <Field model="passwordSettings.repeatNewPassword" className="input-field col s8 active">
            <input name="passwordSettings.repeatNewPassword" type="password" placeholder="Powtórz nowe hasło" className={repeatNewPasswordClass}/>
            <label data-error={this.props.errors && this.props.errors.repeatNewPassword ? errTranslateDictionary[this.props.errors.repeatNewPassword] : ''} htmlFor="passwordSettings.repeatNewPassword" className="active" >Powtórz nowe hasło</label>
          </Field>
        </div>
        <button className="btn" type="submit">Zapisz</button>
      </Form>
    );
  }
}

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  errors: PropTypes.object
};

function mapStateToProps(state) {
  return {
    passwordSettings: state.password_settings,
    errors: state.userAuth && state.userAuth.errors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(saveNewPassword, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePasswordForm);
