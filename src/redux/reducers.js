import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';

import Login, { name as nameOfLogin } from '../views/auth/redux';

export default (history, asyncReducers) =>
  combineReducers({
    ...asyncReducers,
    router: connectRouter(history),
    [nameOfLogin]: Login,
    loadingBar: loadingBarReducer
  });
