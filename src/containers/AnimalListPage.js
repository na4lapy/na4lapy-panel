import React, {PropTypes} from 'react';
import FilterPanel from '../components/AnimalList/FilterPanel';
import Table from '../components/table/Table';
import * as animalActions from '../actions/AnimalActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ANIMALS_URL, ANIMALS_ADD_URL} from '../routes_urls';
import {push} from 'react-router-redux';
import {setFilter} from '../actions/FilterActions';
import {setSorting} from '../actions/SortingActions';
import AnimalSelector from '../selectors/AnimalSelector';
import AnimalRemovalModal from '../components/AnimalList/AnimalRemovalModal';
import _ from 'lodash';


 class AnimalListPage extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.onPublishClick = this.onPublishClick.bind(this);

    this.state = {
      animalToBeRemoved: null
    };
  }

  componentDidMount() {
    this.props.getAnimals();
  }

  onDeleteClick(event, id) {
    const animalToBeRemoved = _.find(this.props.animals, {id});
    this.setState({animalToBeRemoved: animalToBeRemoved}, () => {
      $('#removingAnimalModal').openModal();
    });
  }

  onEditClick(event, idx) {
    this.props.push(ANIMALS_URL + '/' + idx);
  }

  onAddClick(){
    this.props.push(ANIMALS_ADD_URL);
  }

  setFilter(e) {
    this.props.setFilter(e.target.name, e.target.value);
  }

  onHeaderClick(e, header) {
    this.props.setSorting(header);
  }

  onPublishClick(id) {
    let animalToBePublished = _.find(this.props.animals, {id});
    animalToBePublished.status = 'FOR_ADOPTION';
    this.props.saveAnimal(animalToBePublished);
  }

  render() {
    return (<div>
      <div className="main_wrapper">
        <h2 className="center">Liczba zwierząt - {this.props.animals.length}</h2>
        <FilterPanel setFilter={this.setFilter} animalFilter={this.props.animalFilter}/>
      </div>
      <Table
        data={this.props.animals || []}
        headers={[
          {label:"Id", sortingKey:"id"},
          {label: "Zdjęcie"},
          {label:"Imię", sortingKey:"name"},
          {label:"Gatunek", sortingKey:"species"},
          {label: "Data urodzenia", sortingKey:"birthDate"},
          {label: "W schronisku od", sortingKey:"admittanceDate"},
          {label: "Rasa", sortingKey:"race"},
          {label:"Płeć", sortingKey:"gender"},
          {label: "Wielkość", sortingKey: "size"},
          {label: "Status", sortingKey: "status"},
          {label: "Edycja"}]}
        sortingOrder={this.props.sortingOrder}
        sortingKey={this.props.sortingKey}
        onDeleteClick={this.onDeleteClick}
        onEditClick={this.onEditClick}
        onHeaderClick={this.onHeaderClick}
        onPublishClick={this.onPublishClick}
         />
       <div className="fixed-action-btn" onClick={() => this.onAddClick()}>
         <a className="btn-floating btn-large waves-effect waves-light light-blue" ><i className="material-icons">add</i></a>
      </div>
      <AnimalRemovalModal animal={this.state.animalToBeRemoved} removeCallback={this.props.deleteAnimal}/>

    </div>);
  }
}

AnimalListPage.propTypes = {
  deleteAnimal: PropTypes.func.isRequired,
  getAnimals: PropTypes.func.isRequired,
  push: PropTypes.func,
  setFilter: PropTypes.func,
  setSorting: PropTypes.func,
  saveAnimal: PropTypes.func,
  animals: PropTypes.array,
  sortingKey: PropTypes.string,
  sortingOrder: PropTypes.string,
  animalFilter: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    getAnimals: bindActionCreators(animalActions.getAnimals, dispatch),
    deleteAnimal: bindActionCreators(animalActions.deleteAnimal, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch),
    setSorting: bindActionCreators(setSorting, dispatch),
    saveAnimal: bindActionCreators(animalActions.saveAnimal, dispatch ),

  };
}

function mapStateToProps(state){
  return {
    sortingKey: state.sorting.sortingKey,
    sortingOrder: state.sorting.order,
    animals: AnimalSelector(state),
    animalFilter: state.animalFilter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalListPage);
