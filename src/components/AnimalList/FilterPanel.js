import React, {PropTypes} from 'react';

export default class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $('select').material_select();
  }

  render(){
    return (
      <div className="row">
        <form>
          <div className="input-field col s3">
              <input  id="first_name" type="text" />
              <label htmlFor="first_name">Szukaj</label>
          </div>
          <div className="input-field col s3">
            <select>
              <option value="1">Pies</option>
              <option value="2">Kot</option>
              <option value="3">Inny</option>
            </select>
            <label>Gatunek</label>
          </div>
          <div className="input-field col s3">
            <select>
              <option value="1">Samiec</option>
              <option value="2">Suczka</option>
            </select>
            <label>Płeć</label>
          </div>
          <div className="input-field col s3">
            <select>
              <option value="1">Mały</option>
              <option value="2">Średni</option>
              <option value="3">Wielki</option>
            </select>
            <label>Wielkość</label>
          </div>
        </form>
      </div>
    );
  }
}


FilterPanel.propTypes = {
  children: PropTypes.object
};
