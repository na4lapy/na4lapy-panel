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
  }

  handleSelectChange(e){
    this.props.setFilter(e);
  }

  render(){
    return (
      <div className="row">
        <form>
          <div className="input-field col s3">
              <input  name="name" type="text" onChange={this.props.setFilter}/>
              <label htmlFor="first_name">Szukaj</label>
          </div>
          <div className="input-field col s3" >
            <select ref="animal_species" name="species">
              <option value="ANY">Wszystkie</option>
              <option value="DOG">Pies</option>
              <option value="CAT">Kot</option>
              <option value="OTHER">Inny</option>
            </select>
            <label>Gatunek</label>
          </div>
          <div className="input-field col s3" >
            <select ref="animal_gender" name="gender">
              <option value="ANY">Wszystkie</option>
              <option value="MALE">Samiec</option>
              <option value="FEMALE">Suczka</option>
              <option value="UNKNOWN">Nieznan</option>
            </select>
            <label>Płeć</label>
          </div>
          <div className="input-field col s3">
            <select ref="animal_size" name="size">
              <option value="ANY">Wszystkie</option>
              <option value="SMALL">Mały</option>
              <option value="MEDIUM">Średni</option>
              <option value="LARGE">Wielki</option>
            </select>
            <label>Wielkość</label>
          </div>
        </form>
      </div>
    );
  }
}


FilterPanel.propTypes = {
  children: PropTypes.object,
  setFilter: PropTypes.func
};
