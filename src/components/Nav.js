import React from 'react';
import {Link} from 'react-router';

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
            <li><Link to={"list"}>Lista zwierząt</Link></li>
            <li><Link to={"statistics"}>Statystyki</Link></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to={"list"} onClick={this.closeNav}>Lista zwierząt</Link></li>
            <li><Link to={"statistics"} onClick={this.closeNav}>Statystyki</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
