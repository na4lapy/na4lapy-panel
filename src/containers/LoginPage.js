import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/AuthActions';
import {ANIMALS_URL} from '../routes_urls';
import Loader from '../components/Loader';

class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        email: '',
        password: ''
    };
    //bind UI events
    this.onInputChange = this.onInputChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userAuth.isAuthenticated) {
      this.context.router.push(ANIMALS_URL);
    }
    Materialize.updateTextFields(); //eslint-disable-line
  }

  onInputChange(event) {
      event.preventDefault();
      this.setState({[event.target.name] : event.target.value });
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.props.dispatch(loginUser({email:this.state.email, password: this.state.password}));
  }

  render() {
    let formClass = "";
    let emailClass = formClass;
    let passwordClass = formClass;
    if(this.props.errorDictionary && this.props.errorDictionary.email) {
      emailClass+= " invalid";
    }

    if (this.props.errorDictionary && this.props.errorDictionary.password) {
      passwordClass+= " invalid";
    }

    return (

      <div className="container ">
          <form className="col s12" onSubmit={this.onLoginSubmit}>
            <div className="row">
              <div className="logo-wrapper">
                <img className="logo login" src="../img/logo.jpg" />
              </div>
              <h1 className="center">Na 4 Łapy </h1>
              <h2 className="center">Panel Administracyjny</h2>
              <div className="valign-wrapper">
              </div>
                <div className="input-field col s12">
                  <input value={this.state.email} name="email" id="email" type="email" className={emailClass} onChange={this.onInputChange} placeholder="Email"/>
                  <label className="closer-error" data-error={this.props.errorDictionary ? this.props.errorDictionary.email : ''} htmlFor="email"></label>
                </div>
                <div className="input-field col s12 mt-50">
                  <input name="password" value={this.state.password} id="password" type="password" className={passwordClass} onChange={this.onInputChange} placeholder="Hasło"/>
                  <label className="closer-error" data-error={this.props.errorDictionary ? this.props.errorDictionary.password : ''} htmlFor="password"></label>
                </div>
                <div className="col s12 mt-50">
                  <button className="btn btn-large waves-effect waves-light" type="submit" name="action">Zaloguj się
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
          <Loader isShown={this.props.userAuth.isFetching} message={"Trwa logowanie"}/>
      </div>
    );
  }
}

LoginPage.propTypes  = {
  dispatch: PropTypes.func.isRequired,
  errorDictionary: PropTypes.object,
  userAuth: PropTypes.object
};

LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userAuth: state.userAuth,
    errorDictionary: state.userAuth.errorDictionary
  };
}

export default connect(mapStateToProps)(LoginPage);
