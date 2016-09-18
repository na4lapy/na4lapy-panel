import React, {PropTypes} from 'react';
import AnimalForm from '../components/AnimalList/AnimalForm';
import {connect} from 'react-redux';
import {getAnimals} from '../actions/AnimalActions';
import {bindActionCreators} from 'redux';
import {actions} from 'react-redux-form';


class AnimalAddPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(typeof this.props.animalId === 'undefined') {
      this.props.resetModel('animal');
    }
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
  getAnimals: PropTypes.func,
  resetModel: PropTypes.func
};

function mapStateToProps(state, ownProps){
  return {
    animalId: ownProps.params.animalId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAnimals: bindActionCreators(getAnimals, dispatch),
    resetModel: bindActionCreators(actions.reset, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalAddPage);
