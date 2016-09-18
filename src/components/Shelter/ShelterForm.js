import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Form, Field, actions} from 'react-redux-form';
import {bindActionCreators} from 'redux';
import {voivodeships} from '../../initialStates';
import {connect} from 'react-redux';

class ShelterForm extends React.Component {

  constructor(props){
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount(){
    $('select').material_select();
    $(ReactDOM.findDOMNode(this.refs.shelter_voivodeship)).on('change',this.handleSelectChange);
  }

  componentWillReceiveProps() {
    Materialize.updateTextFields(); //eslint-disable-line
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  handleSelectChange(e){
    let value = e.target.value;
    this.props.changeModel(e.target.name, value);
  }

  render () {
    let {shelter} = this.props;
    return (
      <Form model="shelter" onSubmit={(shelter) => this.props.onSubmit(shelter)}>
        <h1>Dane schroniska</h1>

        <div className="row">
          <Field model="shelter.name" className="input-field col s8 active">
            <input name="shelter.name" type="text" placeholder="Nazwa schroniska"/>
            <label htmlFor="animal.name" className="active" >Nazwa schroniska</label>
          </Field>
          <Field model="shelter.phoneNumber" className="input-field col s4">
            <input name="shelter.phoneNumber" type="text" placeholder="Numer telefonu"/>
            <label htmlFor="animal.phoneNumber" className="active">Numer telefonu</label>
          </Field>
        </div>

        <div className="row">
          <Field model="shelter.street" className="input-field col s6">
            <input name="shelter.street" type="text" placeholder="Ulica"/>
            <label htmlFor="shelter.street" className="active">Ulica</label>
          </Field>
          <Field model="shelter.buildingNumber" className="input-field col s2">
            <input name="shelter.buildingNumber" type="text" placeholder="Nr budynku"/>
            <label htmlFor="shelter.buildingNumber" className="active">Nr budynku</label>
          </Field>
          <Field model="shelter.email" className="input-field col s4">
            <input name="shelter.email" type="email" placeholder="Email"/>
            <label htmlFor="shelter.email" className="active">Email</label>
          </Field>
        </div>

        <div className="row">
          <Field model="shelter.city" className="input-field col s6">
            <input name="shelter.city" type="text" placeholder="Miasto"/>
            <label htmlFor="shelter.city" className="active">Miasto</label>
          </Field>
          <Field model="shelter.postalCode" className="input-field col s2">
            <input name="shelter.postalCode" type="text" placeholder="Kod pocztowy"/>
            <label htmlFor="shelter.postalCode" className="active">Kod pocztowy</label>
          </Field>
          <Field model="shelter.website" className="input-field col s4">
            <input name="shelter.website" type="text" placeholder="Adres www"/>
            <label htmlFor="shelter.website" className="active">Adres www</label>
          </Field>
        </div>

        <div className="row">
          <div className="input-field col s8">
            <select name="shelter.voivodeship" value={shelter.voivodeship} ref="shelter_voivodeship" onChange={this.handleSelectChange}>
              {voivodeships.map((voivodeship, index) =>
                <option key={index} value={voivodeship}>{voivodeship}</option>
              )}
            </select>
            <label className="active">Województwo</label>
          </div>
          <Field model="shelter.accountNumber" className="input-field col s4">
            <input name="shelter.accountNumber" type="text" placeholder="Numer konta bankowego"/>
            <label htmlFor="shelter.accountNumber" className="active">Numer konta bankowego</label>
          </Field>
        <div className="row">
          <Field model="shelter.adoptionRules" className="input-field col s12">
            <textarea id="AdoptionRules" className="materialize-textarea" placeholder="Regulamin adopcji"/>
            <label htmlFor="AdoptionRules" className="active">Regulamin adopcji</label>
          </Field>
        </div>
        </div>
        <button className="btn" type="submit">Zapisz</button>
      </Form>
    );
  }
}

ShelterForm.propTypes = {
  changeModel: PropTypes.func,
  onSubmit: PropTypes.func,
  shelter: PropTypes.object
};

function mapStateToProps(state) {
  return {
    shelter: state.shelter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeModel: bindActionCreators(actions.change, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ShelterForm);
