import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {TOKEN_KEY} from '../config';
import Nav from '../components/Nav';

import {logoutUser} from '../actions/AuthActions';

class AuthorizedMainLayout extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    this.redirectToLogin(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectToLogin(nextProps);
  }

  redirectToLogin(props){
    if(!localStorage.getItem(TOKEN_KEY) && !props.userAuth.isAuthenticated) {
      this.context.router.push("/");
    }
  }

  logout(){
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <div className="main-layout">
        <Nav/>
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
  dispatch: PropTypes.func.isRequired
};

AuthorizedMainLayout.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    userAuth: state.userAuth
  };
}

export default connect(mapStateToProps)(AuthorizedMainLayout);
