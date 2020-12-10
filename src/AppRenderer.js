import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import App, { store, history } from './App';
import Loading from 'src/components/Loading';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

export { store, history };
