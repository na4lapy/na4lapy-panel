import React, {PropTypes} from 'react';
import AnimalForm from '../components/AnimalList/AnimalForm';
import {connect} from 'react-redux';
import {getAnimals} from '../actions/AnimalActions';
import {bindActionCreators} from 'redux';

class AnimalAddPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(typeof this.props.animalId !== 'undefined') {
      this.props.getAnimals(this.props.animalId);
    }
  }

  render() {
    return (<div className="container">
      <AnimalForm />
    </div>);
  }
}

AnimalAddPage.propTypes = {
  animalId: PropTypes.number,
  getAnimals: PropTypes.func
};

function mapStateToProps(state, ownProps){
  return {
    animalId: ownProps.params.animalId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAnimals: bindActionCreators(getAnimals, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalAddPage);
