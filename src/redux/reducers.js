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
import ProductDetail, {
  name as nameOfProductDetail
} from 'src/views/product/ProductDetailView/redux';
import NewProductDetail, {
  name as nameOfNewProductDetail
} from 'src/views/product/NewProductDetailView/redux';
import WarehouseItem, {
  name as nameOfWarehouseItem
} from 'src/views/warehouses/WarehouseItemView/redux';
import WarehouseTicket, {
  name as nameOfWarehouseTicket
} from 'src/views/warehouses/WarehouseTicketView/redux';
import Manufacturer, {
  name as nameOfManufacturer
} from 'src/views/manufacturer/ManufacturerListView/redux';
import Cart, { name as nameOfCart } from 'src/views/carts/redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'Login',
  storage,
  whiteList: ['Login']
};

const persistedLoginReducer = persistReducer(persistConfig, Login);

export default (history, asyncReducers) =>
  combineReducers({
    ...asyncReducers,
    router: connectRouter(history),
    [nameOfLogin]: persistedLoginReducer,
    [nameOfAccount]: Account,
    [nameOfProduct]: Product,
    [nameOfProductDetail]: ProductDetail,
    [nameOfNewProductDetail]: NewProductDetail,
    [nameOfCart]: Cart,
    [nameOfWarehouseItem]: WarehouseItem,
    [nameOfWarehouseTicket]: WarehouseTicket,
    [nameOfManufacturer]: Manufacturer,
    loadingBar: loadingBarReducer
  });
