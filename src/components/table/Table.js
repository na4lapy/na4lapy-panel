import React, {PropTypes} from 'react';
import TableRow from './TableRow';

class Table extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let that = this;
    return (
      <div  className="table_wrapper">
        <table className="responsive-table highlight striped">
          <thead><tr>{this.props.headers.map((header, idx) => {
            return <th key={idx}>{header}</th>;
            })}
          </tr></thead>
          <tbody>
          {this.props.data.map((dataRow, idx) => {
              return (<TableRow
                               onDeleteClick={that.props.onDeleteClick}
                               onEditClick={that.props.onEditClick}
                               dataRow={dataRow}
                               key={idx}
                               shouldRenderCheckbox={that.props.shouldRenderCheckbox}
                               />
                           );})}
          </tbody>
        </table>
    </div>
    );
  }

}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
};

export default Table;
