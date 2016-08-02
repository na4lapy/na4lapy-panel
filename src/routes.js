import React from 'react';
import {Route, IndexRoute } from 'react-router';

import LoginPage from './containers/LoginPage';
import AnimalListPage from './containers/AnimalListPage';

import App from './containers/App';
// import MainLayout from './containers/MainLayout';
//import components/pages

export default (

  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />

    <Route path="list" component={AnimalListPage} />

  </Route>
);
