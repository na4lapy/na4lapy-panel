import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ShelterForm from '../components/Shelter/ShelterForm';
import {loadShelter, saveShelter} from '../actions/ShelterActions';

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
      </div>
    );
  }
}


ShelterDetailPage.propTypes = {
  shelter: PropTypes.object,
  loadShelter: PropTypes.func,
  onSubmit: PropTypes.func
};


function mapStateToProps(state){
  return {
    shelter: state.shelterState.shelter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadShelter: bindActionCreators(loadShelter, dispatch),
    onSubmit: bindActionCreators(saveShelter, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShelterDetailPage);
