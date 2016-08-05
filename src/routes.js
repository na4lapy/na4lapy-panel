import React from 'react';
import {Route, IndexRoute } from 'react-router';


import {ANIMALS_URL, STATISTIC_URL, SHELTER_URL} from './routes_urls';

import LoginPage from './containers/LoginPage';
import AnimalListPage from './containers/AnimalListPage';
import StatisticsPage from './containers/StatisticsPage';

import App from './containers/App';
import AuthorizedMainLayout from './containers/AuthorizedMainLayout';
//import components/pages

export default (

  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route component={AuthorizedMainLayout} >
      <Route path={ANIMALS_URL} component={AnimalListPage} />
      <Route path={STATISTIC_URL} component={StatisticsPage} />
    </Route>

  </Route>
);
