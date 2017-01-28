import React, {PropTypes} from 'react';
import AnimalForm from '../components/AnimalList/AnimalForm';
import {connect} from 'react-redux';
import {getAnimals} from '../actions/AnimalActions';
import {bindActionCreators} from 'redux';
import {actions} from 'react-redux-form';
import Loader from '../components/Loader';


class AnimalAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.loaderMessage = this.loaderMessage.bind(this);
    this.reloadAnimal = this.reloadAnimal.bind(this);
  }

  componentWillMount() {
    if(typeof this.props.animalId === 'undefined') {
      this.props.resetModel('animal');
    }
  }

  componentDidMount() {
    this.reloadAnimal();
  }

  componentWillUpdate(nextProps) {
   if (typeof nextProps.animalId === 'undefined') {
     this.props.resetModel('animal');
   }
  }

  reloadAnimal(){
    if(typeof this.props.animalId !== 'undefined') {
      this.props.getAnimals(this.props.animalId);
    }
  }

  loaderMessage() {
    const {animalRequest} = this.props;
    if (animalRequest.photoCount && animalRequest.photoCount != 0) {
      return "Trwa wysyłanie zdjęć: " + animalRequest.photoNumber + " z " + animalRequest.photoCount;
    } else {
      return "Proszę czekać...";
    }
  }

  render() {
    return (<div className="container">
        <AnimalForm reloadAnimal={this.reloadAnimal} />
         <Loader isShown={this.props.animalRequest.isFetching} message={this.loaderMessage()}/>
    </div>);
  }
}

AnimalAddPage.propTypes = {
  animalId: PropTypes.string,
  getAnimals: PropTypes.func,
  resetModel: PropTypes.func,
  animalRequest: PropTypes.object
};

function mapStateToProps(state, ownProps){
  return {
    animalId: ownProps.params.animalId,
    animalRequest: state.animalRequest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAnimals: bindActionCreators(getAnimals, dispatch),
    resetModel: bindActionCreators(actions.reset, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalAddPage);
