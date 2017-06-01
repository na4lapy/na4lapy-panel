import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Nav from '../components/Nav';
import {bindActionCreators} from 'redux';
import {logoutUser} from '../actions/AuthActions';

class AuthorizedMainLayout extends React.Component{
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({ //eslint-disable-line
        appId      : '942037912599059',
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView(); //eslint-disable-line
    };

    (function(d, s, id){
       let js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  logout = () => {
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
