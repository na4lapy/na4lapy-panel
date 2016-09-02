import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Field, Form, actions} from 'react-redux-form';
import {connect} from 'react-redux';
import ImageUploader from '../ImageUploader';
import {bindActionCreators} from 'redux';
import * as animalActions from '../../actions/AnimalActions';
import moment from 'moment';
import {DATE_FORMAT} from '../../config';
import {deletePhoto} from '../../actions/PhotoActions';


class AnimalForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.state = {
      uploadedFileToBeRemoved: null
    };
  }

  componentDidMount() {
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
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

  handleSubmit(animal){
    this.props.saveAnimal(animal);
  }

  handleSelectChange(e){
    let value = e.target.value;
    if(e.target.classList.contains('datepicker')){
     value = moment(value, DATE_FORMAT).valueOf();
    }
    this.props.changeModel(e.target.name, value);
  }

  removePhoto(event,id) {

    this.setState({uploadedFileToBeRemoved: this.props.animal.photos[id]}, () => {
        $('#removingFileModal').openModal();
    });
  }

  render() {
    let {animal} = this.props;
    return (
      <Form model="animal" onSubmit={(animal) => this.handleSubmit(animal)}>
      <div className="row">
        <div className ="input-field col s12 m6" >
            <select  name="animal.gender" ref="animal_gender" defaultValue={animal.gender} onChange={this.handleSelectChange} >
              <option value={"MALE"}>Samiec</option>
              <option value={"FEMALE"}>Samica</option>
              <option value={"UNKNOWN"}>Nieznana</option>
            </select>
          <label>Płeć</label>
        </div>
        <div className ="input-field col s12 m6" >
            <select  name="animal.species" ref="animal_species" defaultValue={animal.species} onChange={this.handleSelectChange} >
              <option value={"DOG"}>Pies</option>
              <option value={"CAT"}>Kot</option>
              <option value={"OTHER"}>Inne</option>
            </select>
          <label>Gatunek</label>
        </div>
      </div>
      <div className="row">
        <Field className="input-field col s12 m6" model="animal.name">
          <input name="animal.name" type="text" placeholder="Imię"/>
          <label htmlFor="animal.name">Imię</label>
        </Field>
        <Field className="input-field col s12 m6" model="animal.race">
          <input name="animal.race" type="text" placeholder="Rasa"/>
          <label htmlFor="animal.race">Rasa</label>
        </Field>
      </div>

      <div className="row">
        <div className="input-field col s12 m6">
          <input ref="animal_birthDate" name="animal.birthDate" type="date" className="datepicker" />
          <label htmlFor="animal.birthDate">Data urodzenia</label>
        </div>
        <div className="input-field col s12 m6">
          <input ref="animal_admittanceDate" name="animal.admittanceDate" type="date" className="datepicker" />
          <label htmlFor="animal.admittanceDate">Data przyjęcia do schroniska</label>
        </div>
      </div>
      <div className="row">
        <div className ="input-field col s12 m4" >
            <select  name="animal.activity" ref="animal_activity" defaultValue={animal.activity} onChange={this.handleSelectChange} >
              <option value={"HIGH"}>Wysoka</option>
              <option value={"LOW"}>Niska</option>
              <option value={"UNKNOWN"}>Nieznana</option>
            </select>
          <label>Aktywność</label>
        </div>
        <div className ="input-field col s12 m4" >
            <select  name="animal.training" ref="animal_training" defaultValue={animal.training} onChange={this.handleSelectChange} >
              <option value={"BASIC"}>Podstawowy</option>
              <option value={"ADVANCED"}>Zaawansowany</option>
              <option value={"NONE"}>Brak</option>
              <option value={"UNKNOWN"}>Nieokreślony</option>
            </select>
          <label>Trening</label>
        </div>
        <div className ="input-field col s12 m4" >
            <select  name="animal.size" ref="animal_size" defaultValue={animal.size} onChange={this.handleSelectChange} >
              <option value={"SMALL"}>Mały</option>
              <option value={"MEDIUM"}>Średni</option>
              <option value={"LARGE"}>Duży</option>
            </select>
          <label>Rozmiar</label>
        </div>
      </div>
      <div className="row">
        <div className ="input-field col s12 m6" >
            <select  name="animal.vaccination" ref="animal_vaccination" defaultValue={animal.vaccination} onChange={this.handleSelectChange} >
              <option value={"BASIC"}>Podstawowe</option>
              <option value={"EXTENDED"}>Rozszerzone</option>
              <option value={"NONE"}>Brak</option>
              <option value={"UNKNOWN"}>Nieznane</option>
            </select>
          <label>Szczepienie</label>
        </div>
        <div className ="input-field col s12 m6" >
            <select  name="animal.sterilization" ref="animal_sterilization" defaultValue={animal.sterilization} onChange={this.handleSelectChange} >
              <option value={"STERILIZED"}>Sterylizowany</option>
              <option value={"NOT_STERILIZED"}>Nie sterylizowany</option>
              <option value={"UNKNOWN"}>Nieokreślony</option>
            </select>
          <label>Sterylizacja</label>
        </div>
      </div>
      <div className="row">
        <div className ="input-field col s12 m6" >
            <select  name="animal.status" ref="animal_status" defaultValue={animal.status} onChange={this.handleSelectChange} >
              <option value={"UNPUBLISHED"}>Nieopublikowany</option>
              <option value={"FOR_ADOPTION"}>Do adopcji</option>
              <option value={"ADOPTED"}>Adoptowany</option>
              <option value={"DELETED"}>Usunięty</option>
            </select>
          <label>Status</label>
        </div>
        <Field className="input-field col s12 m6" model="animal.chip">
          <input name="animal.chip" type="text" placeholder="Chip"/>
          <label htmlFor="animal.chip">Chip</label>
        </Field>
        <hr />

      <ImageUploader deletePhoto={this.props.deletePhoto} photos={this.props.animal.photos} animalId={this.props.animal.id}/>

      </div>
      <div className="row">
        <div className="center">
          <button className="btn-large center" type="submit">
            Zapisz {animal.name}
         </button>
       </div>
     </div>
      </Form>
    );
  }
}

AnimalForm.propTypes = {
  animal: PropTypes.object,
  saveAnimal: PropTypes.func.isRequired,
  changeModel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    animal: state.animal
  };
}

function mapDispatchToProps(dispatch){
  return {
    saveAnimal: bindActionCreators(animalActions.saveAnimal, dispatch ),
    changeModel: bindActionCreators(actions.change, dispatch),
    deletePhoto: bindActionCreators(deletePhoto, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnimalForm);
