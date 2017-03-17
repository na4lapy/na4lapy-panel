import React from 'react';
import {connect} from 'react-redux';
import TermsOfUse from '../components/TermsOfUse/TermsOfUse';

class TermsOfUsePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TermsOfUse />
    );
  }
}

export default connect(null, null)(TermsOfUsePage);
