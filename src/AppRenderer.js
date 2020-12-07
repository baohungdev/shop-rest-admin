import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './redux/store';
import App from './App';

export const { store, history } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <App />
        </Router>
      </Suspense>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
