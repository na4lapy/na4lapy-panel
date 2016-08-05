import React from 'react';
import FilterPanel from '../components/AnimalList/FilterPanel';
import AnimalTable from '../components/AnimalList/AnimalTable';


export default class AnimalListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="container">
      <h1>Lista zwierząt</h1>
      <FilterPanel />
      <AnimalTable />

    </div>);
  }
}

AnimalListPage.propTypes = {

};
