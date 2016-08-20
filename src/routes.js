import React from 'react';
import {Route, IndexRoute } from 'react-router';


import {
    ANIMALS_URL,
    ANIMALS_ADD_URL,
    STATISTIC_URL,
} from './routes_urls';

//import components/pages
import LoginPage from './containers/LoginPage';
import AnimalListPage from './containers/AnimalListPage';
import StatisticsPage from './containers/StatisticsPage';
import AnimalAddPage from './containers/AnimalAddPage';

import App from './containers/App';
import AuthorizedMainLayout from './containers/AuthorizedMainLayout';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route component={AuthorizedMainLayout} >
      <Route path={ANIMALS_URL} >
        <IndexRoute component={AnimalListPage} />
        <Route path={ANIMALS_ADD_URL} component={AnimalAddPage} />
        <Route path={ANIMALS_URL + '/:animalId'} component={AnimalAddPage}/>
      </Route >
      <Route path={STATISTIC_URL} component={StatisticsPage} />
    </Route>

  </Route>
);
