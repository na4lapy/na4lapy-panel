import React, {PropTypes} from 'react';
import FilterPanel from '../components/AnimalList/FilterPanel';
import Table from '../components/table/Table';
import * as animalActions from '../actions/AnimalActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ANIMALS_URL, ANIMALS_ADD_URL} from '../routes_urls';
import {push} from 'react-router-redux';

 class AnimalListPage extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  componentDidMount() {
    this.props.getAnimals();
  }

  onDeleteClick(event, idx) {
    this.props.deleteAnimal(idx);
  }

  onEditClick(event, idx) {
    this.props.push(ANIMALS_URL + '/' + idx);
  }

  onAddClick(){
    this.props.push(ANIMALS_ADD_URL);
  }

  render() {
    return (<div>
      <div className="main_wrapper">
        <h1>Lista zwierząt</h1>
        <FilterPanel />
      </div>
      <Table
        data={this.props.animals || []}
        headers={["Id", "Zdjęcie", "Imię", "Gatunek",  "Data urodzenia", "W schronisku od", "Rasa","Płeć", "Wielkość", "Status", "Edycja"]}
        onDeleteClick={this.onDeleteClick}
        onEditClick={this.onEditClick}
         />
       <div className="fixed-action-btn" onClick={() => this.onAddClick()}>
         <a className="btn-floating btn-large waves-effect waves-light light-blue" ><i className="material-icons">add</i></a>
      </div>

    </div>);
  }
}

AnimalListPage.propTypes = {
  deleteAnimal: PropTypes.func.isRequired,
  getAnimals: PropTypes.func.isRequired,
  push: PropTypes.func,
  animals: PropTypes.array
};

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    getAnimals: bindActionCreators(animalActions.getAnimals, dispatch),
    deleteAnimal: bindActionCreators(animalActions.deleteAnimal, dispatch)
  };
}

function mapStateToProps(state){
  return {
    animals: state.animalListState.animals
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalListPage);
