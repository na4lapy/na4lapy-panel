import React from 'react';
import {Link} from 'react-router';
import {ANIMALS_URL, STATISTIC_URL, SHELTER_URL} from '../routes_urls';

class Nav extends React.Component {

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
          <a href="#!" className="brand-logo">Logo</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to={ANIMALS_URL}>Lista zwierząt</Link></li>
            <li><Link to={STATISTIC_URL}>Statystyki</Link></li>
            <li><Link to={SHELTER_URL}>Statystyki</Link></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to={ANIMALS_URL} onClick={this.closeNav}>Lista zwierząt</Link></li>
            <li><Link to={STATISTIC_URL} onClick={this.closeNav}>Statystyki</Link></li>
            <li><Link to={SHELTER_URL} onClick={this.closeNav}>Statystyki</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
