import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {TOKEN_KEY} from '../config';
import Nav from '../components/Nav';
import {bindActionCreators} from 'redux';
import {logoutUser} from '../actions/AuthActions';

class AuthorizedMainLayout extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    this.redirectToLogin(this.props);
  }

  componentWillReceiveProps() {
    this.redirectToLogin();
  }

  redirectToLogin(){
    if(!localStorage.getItem(TOKEN_KEY)) {
      this.context.router.push("/");
    }
  }

  logout(){
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="main-layout">
        <Nav logoutUser={this.logout}/>
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}


AuthorizedMainLayout.propTypes = {
  children: PropTypes.object,
  userAuth: PropTypes.object,
  logoutUser: PropTypes.func.isRequired
};

AuthorizedMainLayout.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userAuth: state.userAuth
  };
}

function mapDispatchToProps(dispatch){
  return {
    logoutUser: bindActionCreators(logoutUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedMainLayout);
