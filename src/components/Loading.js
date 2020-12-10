import React from 'react';
import 'src/assets/css/loading.css';

const Loading = props => {
  return (
    <div class="loading-container">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
