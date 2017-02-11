import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    $(ReactDOM.findDOMNode(this.refs.animal_species)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_gender)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_size)).on('change',this.handleSelectChange);
    $(ReactDOM.findDOMNode(this.refs.animal_status)).on('change',this.handleSelectChange);
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  handleSelectChange(e){
    this.props.setFilter(e);
  }



  renderResetFilters() {
    if(this.props.animalFilter) {
      let {name, species, gender, size, status} = this.props.animalFilter;
        if (name.length >0 || species !== 'ANY' || gender !== 'ANY' || size !== 'ANY' || status !== 'ANY') {
          return (<div className="center-align"><button className="btn" type="reset" onClick={this.props.resetFilters}>Resetuj filtry</button></div>);
        }
    }
  }


  render(){
    return (
        <form>
        <div className="row">
          <div className="input-field col s3">
              <input value={this.props.animalFilter && this.props.animalFilter.name} name="name" type="text" placeholder="Imię" onChange={this.props.setFilter}/>
              <label htmlFor="first_name" className="active">Szukaj</label>
          </div>
          <div className="input-field col s3" >
            <select ref="animal_species" name="species" value={this.props.animalFilter && this.props.animalFilter.species} readOnly>
              <option value="ANY">Wszystkie</option>
              <option value="DOG">Pies</option>
              <option value="CAT">Kot</option>
              <option value="OTHER">Inny</option>
            </select>
            <label>Gatunek</label>
          </div>
          <div className="input-field col s2" >
            <select ref="animal_gender" name="gender" value={this.props.animalFilter && this.props.animalFilter.gender} readOnly>
              <option value="ANY">Wszystkie</option>
              <option value="MALE">Samiec</option>
              <option value="FEMALE">Suczka</option>
              <option value="UNKNOWN">Nieznany</option>
            </select>
            <label>Płeć</label>
          </div>
          <div className="input-field col s2">
            <select ref="animal_size" name="size" value={this.props.animalFilter && this.props.animalFilter.size} readOnly>
              <option value="ANY">Wszystkie</option>
              <option value="SMALL">Mały</option>
              <option value="MEDIUM">Średni</option>
              <option value="LARGE">Duży</option>
            </select>
            <label>Wielkość</label>
          </div>
          <div className="input-field col s2">
            <select ref="animal_status" name="animal_status" value={this.props.animalFilter && this.props.animalFilter.animal_status} readOnly>
              <option value="ANY">Wszystkie</option>
              <option value="NEW">Nieopublikowany</option>
              <option value="FOR_ADOPTION">Do adpocji</option>
              <option value="ADOPTED">Adoptowany</option>
            </select>
            <label>Status</label>
          </div>
      </div>
      {this.renderResetFilters()}
    </form>
    );
  }
}


FilterPanel.propTypes = {
  children: PropTypes.object,
  setFilter: PropTypes.func,
  resetFilters: PropTypes.func,
  animalFilter: PropTypes.object
};
