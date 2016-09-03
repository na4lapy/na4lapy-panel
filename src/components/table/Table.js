import React, {PropTypes} from 'react';
import TableRow from './TableRow';

import {stickyTableHeaders} from 'sticky-table-headers'; //eslint-disable-line

class Table extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.tableHeaderClass = '';
    this.lastScrollTop = 0;

  }

  componentDidMount() {
    $('table').stickyTableHeaders();

  }

  render() {
    let that = this;
    return (
      <div  className="table_wrapper">

        <table id="orginalTable" className="responsive-table highlight striped centered" >
          <thead><tr>{this.props.headers.map((header, idx) => {
            let arrowClass = '';
            if(header.sortingKey == that.props.sortingKey){
              arrowClass = that.props.sortingOrder == 'DESC' ? 'desc' : 'asc';
            }
            return (header.label !== 'Edycja' && header.label !=='Zdjęcie')  ? <th key={idx} className={"sorting hvr-underline-from-center " + arrowClass} onClick={(event) => this.props.onHeaderClick(event, header.sortingKey)}>{header.label}</th> : <th key={idx} >{header.label}</th> ;
            })}
          </tr></thead>
          <tbody>
          {this.props.data.map((dataRow, idx) => {
              return (<TableRow
                              onPublishClick={that.props.onPublishClick}
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
  onHeaderClick: PropTypes.func
};

export default Table;
