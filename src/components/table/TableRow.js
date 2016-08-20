import React,{PropTypes} from 'react';

class TableRow extends React.Component {

  constructor(props) {
    super(props);

  }

  renderImage(){
    if(typeof this.props.dataRow.photos[0] != 'undefined') {
      return (<img className="animal_photo" src={'http://localhost:9000/v1/files/' + this.props.dataRow.photos[0].fileName} />);
    }
  }

  render(){
    return (
    <tr>
      <td>{this.props.dataRow.id}</td>
      <td className="animal_photo_row">{this.renderImage()}</td>
      <td>{this.props.dataRow.name}</td>
      <td>{this.props.dataRow.species}</td>
      <td>{this.props.dataRow.birthDate}</td>
      <td>{this.props.dataRow.admittanceDate}</td>
      <td>{this.props.dataRow.race}</td>
      <td>{this.props.dataRow.gender}</td>
      <td>{this.props.dataRow.size}</td>
      <td>{this.props.dataRow.status}</td>
      <td><button className="btn" onClick={(event) => this.props.onEditClick(event, this.props.dataRow.id)}>Edycja</button>
          <button className="btn red darken-1" onClick={(event) => this.props.onDeleteClick(event, this.props.dataRow.id)}>Usuń</button>
      </td>

    </tr>
    );
  }
}

TableRow.propTypes = {
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  dataRow: PropTypes.object.isRequired,

};


export default TableRow;
