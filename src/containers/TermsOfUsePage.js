import React from 'react';
import {connect} from 'react-redux';
import TermsOfUse from '../components/TermsOfUse/TermsOfUse';

class TermsOfUsePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <TermsOfUse />
      </div>
    );
  }
}

export default connect(null, null)(TermsOfUsePage);
