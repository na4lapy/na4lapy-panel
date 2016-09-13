import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/AuthActions';
import {ANIMALS_URL} from '../routes_urls';

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
            <h1 className="center">Admin pieseł</h1>
            <div className="valign-wrapper">
              <img className="valign circle responsive-img piesel" alt="pieseł" src="../img/pieseł.jpg" />
            </div>
              <div className="input-field col s12">
                <input value={this.state.email} name="email" id="email" type="email" className={emailClass} onChange={this.onInputChange}/>
                <label data-error={this.props.errorDictionary ? this.props.errorDictionary.email : ''} htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12 mt-50">
                <input name="password" value={this.state.password} id="password" type="password" className={passwordClass} onChange={this.onInputChange}/>
                <label data-error={this.props.errorDictionary ? this.props.errorDictionary.password : ''} htmlFor="password">Hasło</label>
              </div>
              <div className="col s12 mt-50">
                <button className="btn btn-large waves-effect waves-light" type="submit" name="action">Zaloguj się
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes  = {
  dispatch: PropTypes.func.isRequired,
  errorDictionary: PropTypes.object
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