import React,{PropTypes} from 'react';
import AnimalDictionary from '../../animal_dictionary';
import API_BASE_URL from '../../config';
let API_URL_FILES = API_BASE_URL + 'files/';

class TableRow extends React.Component {

  constructor(props) {
    super(props);
  }

  renderImage(){
    let photoName = this.props.dataRow.photos.filter((photo) => photo.profil).map((p) => p.fileName)[0];
    //if no profile photo fallback to first available photo
    if (!photoName && this.props.dataRow.photos && typeof this.props.dataRow.photos[0] != 'undefined') {
      photoName = this.props.dataRow.photos[0].fileName;
    }
    if(this.props.dataRow.photos && typeof this.props.dataRow.photos[0] != 'undefined') {
      return (<img className="animal_photo" onClick={(event) => this.props.onEditClick(event, this.props.dataRow.id)} src={API_URL_FILES + photoName} />);
    }
  }

  renderPublishButton() {
    if (this.props.dataRow.status == 'NEW') {
      return (<button className="btn blue lighten-1" onClick={() => this.props.onPublishClick(this.props.dataRow.id)}>Opublikuj</button>);
    }
  }

  render(){
    return (
    <tr>
      <td>{this.props.dataRow.id}</td>
      <td className="animal_photo_row">{this.renderImage()}</td>
      <td>{this.props.dataRow.name}</td>
      <td>{AnimalDictionary.species[this.props.dataRow.species]}</td>
      <td>{this.props.dataRow.birthdate}</td>
      <td>{this.props.dataRow.admittancedate}</td>
      <td>{this.props.dataRow.race}</td>
      <td>{AnimalDictionary.gender[this.props.dataRow.gender]}</td>
      <td>{AnimalDictionary.size[this.props.dataRow.size]}</td>
      <td>{AnimalDictionary.status[this.props.dataRow.animal_status]}</td>
      <td>
          <button className="btn" onClick={(event) => this.props.onPostToFacebook(event,this.props.dataRow)}>Facebook</button>
          <button className="btn" onClick={(event) => this.props.onEditClick(event, this.props.dataRow.id)}>Edycja</button>
          <button className="btn red darken-1" onClick={(event) => this.props.onDeleteClick(event, this.props.dataRow.id)}>Usuń</button>
          {this.renderPublishButton()}
      </td>

    </tr>
    );
  }
}

TableRow.propTypes = {
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onPublishClick: PropTypes.func,
  dataRow: PropTypes.object.isRequired,
  onPostToFacebook: PropTypes.func,

};


export default TableRow;
