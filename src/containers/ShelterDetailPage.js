import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ShelterForm from '../components/Shelter/ShelterForm';
import {loadShelter, saveShelter} from '../actions/ShelterActions';
import Loader from '../components/Loader';

class ShelterDetailPage extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
      this.props.loadShelter(1);
  }

  render () {
    return (
      <div className="container">
        <ShelterForm onSubmit={this.props.onSubmit}/>
        <Loader isShown={this.props.isFetching} />
      </div>
    );
  }
}


ShelterDetailPage.propTypes = {
  shelter: PropTypes.object,
  loadShelter: PropTypes.func,
  onSubmit: PropTypes.func,
  isFetching: PropTypes.bool
};


function mapStateToProps(state){
  return {
    shelter: state.shelterState.shelter,
    isFetching: state.shelterState.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadShelter: bindActionCreators(loadShelter, dispatch),
    onSubmit: bindActionCreators(saveShelter, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShelterDetailPage);
