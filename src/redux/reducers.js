import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';

import Login, { name as nameOfLogin } from '../views/auth/redux';

export const loginReducers = {
  [nameOfLogin]: Login,
};

export default (history, asyncReducers) => combineReducers({
  ...asyncReducers,
  router: connectRouter(history),
  loadingBar: loadingBarReducer,
});
