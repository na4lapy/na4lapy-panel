import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Field, Form, actions} from 'react-redux-form';
import {connect} from 'react-redux';
import ImageUploader from '../ImageUploader';
import {bindActionCreators} from 'redux';
import * as animalActions from '../../actions/AnimalActions';
import {deletePhoto} from '../../actions/PhotoActions';
import ErrorModal from '../ErrorModal';
import {MONTHS_FULL, MONTHS_SHORT, WEEKDAYS_FULL, WEEKDAYS_SHORT, TODAY, CLEAR, CLOSE} from '../../utils';
import {failedFilesMessage} from '../../config';
import {push} from 'react-router-redux';
import {ANIMALS_URL} from '../../routes_urls';




class AnimalForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.errorModalConfirmationCallback = this.errorModalConfirmationCallback.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.isAnimalNameValid = this.isAnimalNameValid.bind(this);
    this.state = {
      uploadedFileToBeRemoved: null
    };
    this.reloadAnimal = this.reloadAnimal.bind(this);
  }

  componentDidMount() {
    $('body').scrollTop(0);
    $('select').material_select();
    $('.datepicker').pickadate({
      monthsFull: MONTHS_FULL,
      monthsShort: MONTHS_SHORT,
      weekdaysFull: WEEKDAYS_FULL,
      weekdaysShort: WEEKDAYS_SHORT,
      today: TODAY,
      clear: CLEAR,
      close: CLOSE,

      format: 'yyyy-mm-dd'
    });

    $(ReactDOM.findDOMNode(this.refs.animal_gender)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_species)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_birthDate)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_admittanceDate)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_activity)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_training)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_vaccination)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_sterilization)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_status)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_size)).on('change',this.handleSelectChange);
    // Materialize.updateTextFields(); //eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.animalRequestErrors) {
      this.setState(
        {errorMessage: failedFilesMessage(nextProps.animalRequestErrors.failedFiles),
          failedFiles: nextProps.animalRequestErrors.failedFiles
        }, $('#error-modal').openModal());
    }
  }

  componentDidUpdate( ) {
      $('select').material_select();
  }

  handleSelectChange(e){
    let value = e.target.value;
    // if(e.target.classList.contains('datepicker')){
    //  value = moment(value, DATE_FORMAT).f;
    // }
    this.props.changeModel(e.target.name, value);
  }

  handleSubmit(animal){
    this.props.saveAnimal(animal);
  }

  onBackButtonClick() {
    this.props.push(ANIMALS_URL);
  }

  errorModalConfirmationCallback() {
    this.props.clearPhotoUploadError();
  }

  removePhoto(event,id) {

    this.setState({uploadedFileToBeRemoved: this.props.animal.photos[id]}, () => {
        $('#removingFileModal').openModal();
    });
  }

  reloadAnimal() {
    this.setState({failedFiles: null});
    this.props.reloadAnimal();
  }

  isAnimalNameValid(name) {
    return name && name.length > 0;
  }

  render() {
    let {animal} = this.props;
    let name = '';
    if (animal && animal.name) {
      name =  animal.name;
    } else {
      name = 'Zwierzę';
    }

    let {  fields  } = this.props.animalForm;
    return (
    <div>
      <Form model="animal" onSubmit={(animal) => this.handleSubmit(animal)}>
      <h1 className="center">{animal.id ? 'Edytuj ' + name : 'Dodaj zwierzę.'}</h1>
      <div className="row">
        <div className ="input-field col s12 m6" >
            <select  className="active" name="animal.gender" ref="animal_gender" value={animal.gender || 'UNKNOWN'} onChange={this.handleSelectChange} >
              <option value={"MALE"}>Samiec</option>
              <option value={"FEMALE"}>Samica</option>
              <option value={"UNKNOWN"}>Nieznana</option>
            </select>
          <label>Płeć</label>
        </div>
        <div className ="input-field col s12 m6" >
            <select  name="animal.species" ref="animal_species" value={animal.species || "DOG"} onChange={this.handleSelectChange} >
              <option value={"DOG"}>Pies</option>
              <option value={"CAT"}>Kot</option>
              <option value={"OTHER"}>Inne</option>
            </select>
          <label>Gatunek</label>
        </div>
      </div>
      <div className="row">
        <Field className="input-field col s12 m6" model="animal.name" validators={{
            required: (val) => {return val && val.length }
          }}>
          <input name="animal.name" type="text" placeholder="Imię"/>
          <label className="active" htmlFor="animal.name">Imię - <strong>wymagane!</strong></label>
            { !fields.name.valid &&
              <strong className="text-red">Imię jest wymagane</strong>
            }
        </Field>
        <Field className="input-field col s12 m6" model="animal.race">
          <input name="animal.race" type="text" placeholder="Rasa"/>
          <label className="active" htmlFor="animal.race">Rasa</label>
        </Field>
      </div>

      <div className="row">
        <div className="input-field col s12 m6">
          <input ref="animal_birthDate" name="animal.birthdate" type="date" className="datepicker" placeholder="yyyy-mm-dd" value={animal.birthDate}/>
          <label className="active" htmlFor="animal.birthdate">Data urodzenia</label>
        </div>
        <div className="input-field col s12 m6">
          <input ref="animal_admittanceDate" name="animal.addmittancedate" type="date" className="datepicker" placeholder="yyyy-mm-dd" value={animal.admittanceDate}/>
          <label htmlFor="animal.admittanceDate" className="active">Data przyjęcia do schroniska</label>
        </div>
      </div>
      <div className="row">
        <div className ="input-field col s12 m4" >
            <select  name="animal.activity" ref="animal_activity" defaultValue={animal.activity || 'UNKNOWN'} onChange={this.handleSelectChange} >
              <option value={"HIGH"}>Wysoka</option>
              <option value={"LOW"}>Niska</option>
              <option value={"UNKNOWN"}>Nieznana</option>
            </select>
          <label>Aktywność</label>
        </div>
        <div className ="input-field col s12 m4" >
            <select  name="animal.training" ref="animal_training" defaultValue={animal.training || 'UNKNOWN'} onChange={this.handleSelectChange} >
              <option value={"BASIC"}>Podstawowy</option>
              <option value={"ADVANCED"}>Zaawansowany</option>
              <option value={"NONE"}>Brak</option>
              <option value={"UNKNOWN"}>Nieokreślony</option>
            </select>
          <label >Trening</label>
        </div>
        <div className ="input-field col s12 m4" >
            <select  name="animal.size" ref="animal_size" defaultValue={animal.size || 'SMALL'} onChange={this.handleSelectChange} >
              <option value={"SMALL"}>Mały</option>
              <option value={"MEDIUM"}>Średni</option>
              <option value={"LARGE"}>Duży</option>
            </select>
          <label>Rozmiar</label>
        </div>
      </div>
      <div className="row">
        <div className ="input-field col s12 m6" >
            <select  name="animal.vaccination" ref="animal_vaccination" defaultValue={animal.vaccination || 'UNKNOWN'} onChange={this.handleSelectChange} >
              <option value={"BASIC"}>Podstawowe</option>
              <option value={"EXTENDED"}>Rozszerzone</option>
              <option value={"NONE"}>Brak</option>
              <option value={"UNKNOWN"}>Nieznane</option>
            </select>
          <label>Szczepienie</label>
        </div>
        <div className ="input-field col s12 m6" >
            <select  name="animal.sterilization" ref="animal_sterilization" defaultValue={animal.sterilization || 'UNKNOWN'} onChange={this.handleSelectChange} >
              <option value={"STERILIZED"}>Tak</option>
              <option value={"NOT_STERILIZED"}>Nie</option>
              <option value={"UNKNOWN"}>Nie wiadomo</option>
            </select>
          <label>Kastracja/Sterylizacja</label>
        </div>
      </div>
      <div className="row">
        <div className ="input-field col s12 m6" >
            <select  name="animal.animal_status" ref="animal_status" defaultValue={animal.status || 'UNPUBLISHED'} onChange={this.handleSelectChange} >
              <option value={"NEW"}>Nieopublikowany</option>
              <option value={"FOR_ADOPTION"}>Do adopcji</option>
              <option value={"ADOPTED"}>Adoptowany</option>
            </select>
          <label>Status</label>
        </div>
        <Field className="input-field col s12 m6" model="animal.chip">
          <input name="animal.chip" type="text" placeholder="Chip"/>
          <label htmlFor="animal.chip">Chip</label>
        </Field>
      </div>
      <div className="row">
        <Field className="input-field col s12" model="animal.description">
          <textarea id="animal.description" name="animal.description" className="materialize-textarea">{animal.description}</textarea>
        <label htmlFor="animal.description" className="activeD">Opis</label>
        </Field>

      <hr />

      <ImageUploader
        areImageUploadFinished={this.props.areImageUploadFinished}
        deletePhoto={this.props.deletePhoto}
        photos={animal.photos}
        animalId={animal.id}
        failedFiles={this.state.failedFiles || []}
        reloadAnimal={this.reloadAnimal}/>

      </div>
      <div className="row">
        <div className="center">
          <button className="btn large center" type="submit">
            Zapisz {animal.name}
         </button>
         <button className="btn large left" onClick={this.onBackButtonClick} type="button">
           Powrót do listy
         </button>
       </div>
     </div>
      </Form>
      <ErrorModal errorMessage={this.state.errorMessage} confirmationCallback={this.errorModalConfirmationCallback}/>
    </div>
    );
  }
}

AnimalForm.propTypes = {
  animal: PropTypes.object,
  saveAnimal: PropTypes.func.isRequired,
  changeModel: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func,
  clearPhotoUploadError: PropTypes.func,
  reloadAnimal: PropTypes.func
};

function mapStateToProps(state) {
  return {
    animalForm: state.animalForm,
    animal: state.animal,
    animalRequestErrors: state.animalRequest.errors,
    areImageUploadFinished: !state.animalRequest.isFetching
  };
}

function mapDispatchToProps(dispatch){
  return {
    saveAnimal: bindActionCreators(animalActions.saveAnimal, dispatch ),
    changeModel: bindActionCreators(actions.change, dispatch),
    deletePhoto: bindActionCreators(deletePhoto, dispatch),
    clearPhotoUploadError: bindActionCreators(animalActions.clearPhotoUploadError, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnimalForm);
