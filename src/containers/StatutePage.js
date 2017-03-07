import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class StatutePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Regulamin</h1>
    );
  }
}

export default connect(null, null)(StatutePage);
