import React, {PropTypes} from 'react';
import FilterPanel from '../components/AnimalList/FilterPanel';
import Table from '../components/table/Table';
import * as animalActions from '../actions/AnimalActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ANIMALS_URL, ANIMALS_ADD_URL} from '../routes_urls';
import {push} from 'react-router-redux';
import {setFilter, resetFilter} from '../actions/FilterActions';
import {setSorting} from '../actions/SortingActions';
import AnimalSelector from '../selectors/AnimalSelector';
import AnimalRemovalModal from '../components/AnimalList/AnimalRemovalModal';
import FBAccountChooseModal from '../components/AnimalList/FBAccountChooseModal';
import Loader from '../components/Loader';
import _ from 'lodash';
import * as facebookActions from '../actions/FacebookActions';


 class AnimalListPage extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.onPublishClick = this.onPublishClick.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.onPostToFacebook = this.onPostToFacebook.bind(this);
    this.shouldRespondToFacebookStateInProps = this.shouldRespondToFacebookStateInProps.bind(this);
    this.onFbAccountChoosen = this.onFbAccountChoosen.bind(this);
    this.state = {
      animalToBeRemoved: null
    };
  }

  componentDidMount() {
    this.props.getAnimals();
    $('#removingAnimalModal').modal();
    $('#FBAccountChooseModal').modal();
  }

  componentWillReceiveProps(nextProps){
    if(this.shouldRespondToFacebookStateInProps(nextProps)) {
      $('#FBAccountChooseModal').modal('open');
    }
  }

  componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  onDeleteClick(event, id) {
    const animalToBeRemoved = _.find(this.props.animals, {id});
    this.setState({animalToBeRemoved: animalToBeRemoved}, () => {
      $('#removingAnimalModal').modal('open');
    });
  }

  onEditClick(event, idx) {
    this.props.push(ANIMALS_URL + '/' + idx);
  }

  onPostToFacebook(event, animal) {
    this.props.postAnimalToFacebook(animal);
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

  onFbAccountChoosen(account_token, account_id) {
    this.props.onFbAccountChoosen(account_token, account_id, this.props.facebookState.fb_animal);
  }

  resetFilters(event){
    event.preventDefault();
    this.props.resetFilters();
  }

  shouldRespondToFacebookStateInProps(props) {
    return props.facebookState && props.facebookState.accounts && props.facebookState.showPostAsPopup;
  }

  render() {
    let loaderMessage  = this.props.facebookState && this.props.facebookState.loaderMessage;
    return (<div ref={(ref) => this._div = ref}>
      <div className="main_wrapper">
        <h2 className="center">Liczba zwierząt - {this.props.animals.length}</h2>
        <FilterPanel setFilter={this.setFilter} animalFilter={this.props.animalFilter} resetFilters={this.resetFilters}/>
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
        onPostToFacebook={this.onPostToFacebook}
         />
       <div className="fixed-action-btn" onClick={() => this.onAddClick()}>
         <a className="btn-floating btn-large waves-effect waves-light light-blue" ><i className="material-icons">add</i></a>
      </div>
        <AnimalRemovalModal animal={this.state.animalToBeRemoved} removeCallback={this.props.deleteAnimal}/>
        <FBAccountChooseModal accounts={this.props.facebookState.accounts} chooseAccountCallback={this.onFbAccountChoosen} />}
      <Loader isShown={this.props.isFetching || this.props.isFbFetching} message={loaderMessage ? loaderMessage : "Proszę czekać..."} />
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
  animalFilter: PropTypes.object,
  resetFilters: PropTypes.func,
  resetModel: PropTypes.func,
  postAnimalToFacebook: PropTypes.func,
  logoutOutOfFacebook: PropTypes.func,
  facebookState: PropTypes.object,
  isFetching: PropTypes.bool,
  onFbAccountChoosen: PropTypes.func,
  isFbFetching: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    getAnimals: bindActionCreators(animalActions.getAnimals, dispatch),
    deleteAnimal: bindActionCreators(animalActions.deleteAnimal, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch),
    setSorting: bindActionCreators(setSorting, dispatch),
    saveAnimal: bindActionCreators(animalActions.saveAnimal, dispatch ),
    resetFilters: bindActionCreators(resetFilter, dispatch),
    postAnimalToFacebook: bindActionCreators(facebookActions.postAnimalToFacebook,dispatch),
    logoutOutOfFacebook: bindActionCreators(facebookActions.logoutOutOfFacebook, dispatch),
    onFbAccountChoosen: bindActionCreators(facebookActions.onFbAccountChoosen, dispatch)
  };
}

function mapStateToProps(state){
  return {
    sortingKey: state.sorting.sortingKey,
    sortingOrder: state.sorting.order,
    animals: AnimalSelector(state),
    animalFilter: state.animalFilter,
    isFetching: state.animalRequest.isFetching,
    facebookState: state.facebookState,
    isFbFetching: state.facebookState.isFetching
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalListPage);
