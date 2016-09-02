import React, {PropTypes} from 'react';
import TableRow from './TableRow';

class Table extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.tableHeaderClass = '';
    this.state = {
      tableHeaderClass: ''
    };
    this.lastScrollTop = 0;

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event){
    // let scrollTop = event.srcElement.body.scrollTop;
    // if(scrollTop > 200 & scrollTop > this.lastScrollTop) {
    //   this.setState({tableHeaderClass: 'fixed'});
    // } else if (scrollTop < 200 && scrollTop < this.lastScrollTop){
    //   this.setState({tableHeaderClass: ''});
    // }
    // this.lastScrollTop = scrollTop;
  }

  render() {
    let that = this;
    return (
      <div  className="table_wrapper">

        <table className="responsive-table highlight striped centered" >
          <thead className={this.state.tableHeaderClass}><tr>{this.props.headers.map((header, idx) => {
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
