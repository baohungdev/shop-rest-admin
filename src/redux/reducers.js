import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';

import Login, { name as nameOfLogin } from 'src/views/auth/redux';
import Product, {
  name as nameOfProduct
} from 'src/views/product/ProductListView/redux';
import Account, {
  name as nameOfAccount
} from 'src/views/account/AccountView/redux';

export default (history, asyncReducers) =>
  combineReducers({
    ...asyncReducers,
    router: connectRouter(history),
    [nameOfLogin]: Login,
    [nameOfAccount]: Account,
    [nameOfProduct]: Product,
    loadingBar: loadingBarReducer
  });
