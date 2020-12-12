import React from 'react';
import 'src/assets/css/loading.css';

const Spinner = ({ small = false }) => {
  const ldsRingStyles = small
    ? {
        width: '32px',
        height: '32px'
      }
    : {};
  const divStyles = small
    ? {
        width: '25.6px',
        height: '25.6px',
        margin: '3.2px',
        borderWidth: '3.2px'
      }
    : {};

  return (
    <div className="lds-ring" style={ldsRingStyles}>
      <div style={divStyles}></div>
      <div style={divStyles}></div>
      <div style={divStyles}></div>
      <div style={divStyles}></div>
    </div>
  );
};

const Loading = props => {
  return (
    <div className="loading-container">
      <Spinner />
    </div>
  );
};

export { Spinner };

export default Loading;
