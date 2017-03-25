import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {ANIMALS_URL, SHELTER_URL, ANIMALS_ADD_URL, CHANGE_PASSWORD_URL, STATUTE_URL} from '../routes_urls';
import logo from '../img/logo.jpg'; //eslint-disable-line

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
     $(".button-collapse").sideNav();
  }

  closeNav(){
    $('.button-collapse').sideNav('hide');
  }

  render(){
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={ANIMALS_URL}><img className="logo" src={logo} /></Link>
          <div className="help">
            <a href="mailto:pomoc@na4lapy.org?Subject=Zgłoszenie%20problemu%20z%20panelem%20WWW" target="_top">Obsługa klienta: pomoc@na4lapy.org</a>
          </div>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to={ANIMALS_ADD_URL}>Dodaj zwierzę</Link></li>
            <li><Link to={ANIMALS_URL}>Lista zwierząt</Link></li>
            <li><Link to={SHELTER_URL}>Dane schroniska</Link></li>
            <li><Link to={CHANGE_PASSWORD_URL}>Zmiana hasła</Link></li>
            <li><Link to={STATUTE_URL}>Regulamin</Link></li>
            <li><a href="#" onClick={this.props.logoutUser}>Wyloguj</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to={ANIMALS_URL} onClick={this.closeNav}>Lista zwierząt</Link></li>
            <li><Link to={SHELTER_URL} onClick={this.closeNav}>Dane schroniska</Link></li>
            <li><Link to={CHANGE_PASSWORD_URL} onClick={this.closeNav}>Zmiana hasła</Link></li>
            <li><a href="#" onClick={this.props.logoutUser}>Wyloguj</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  logoutUser: PropTypes.func
};
