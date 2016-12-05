import React, {PropTypes} from 'react';
const Loader = ({isShown, message = "Proszę czekać..."}) => {
  const progressStyle = {display: isShown ? "block" : "none"};
  return (

  <div className="progress-overlay" style={progressStyle}>
    <div className="progress-wrapper">
        <div className="center-progress">
          <h3>{message} </h3>
          <div className="progress">
              <div className="indeterminate"></div>
          </div>
      </div>
    </div>
  </div>
  );
};


Loader.propTypes = {
  isShown: PropTypes.bool,
  message: PropTypes.string
};

export default Loader;
