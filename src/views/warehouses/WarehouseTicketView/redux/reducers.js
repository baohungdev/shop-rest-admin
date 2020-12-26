import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import _find from 'lodash/find';
import _unionBy from 'lodash/unionBy';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';

export const name = 'WarehouseTicket';

const makeInitialState = () => {
  return {
    newWarehouseTransaction: {
      manufacturerId: 0,
      warehouseTransactionItems: [],
      description: ''
    }
  };
};

const initialStates = freeze({
  tableDisplay: {
    limit: 10,
    page: 0,
    count: 0
  },
  searchForName: '',
  warehouseTransactions: [],
  selectedWarehouseTransactionType: 0, // import
  isFetchingWarehouseTransaction: false,
  fetchingWarehouseTransactionFail: false,
  fetchWarehouseTransactionFailMessage: '',
  manufacturers: [],
  products: [],
  isSendingToServer: false,
  isSendingToServerFail: false,
  sendToServerFailMessage: '',
  ...makeInitialState()
});

export default handleActions(
  {
    [actions.changeTabDisplay]: (state, action) => {
      return freeze({
        ...state,
        selectedWarehouseTransactionType: action.payload.type,
        isFetchingWarehouseTransaction: true,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.fetchWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: true,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.fetchWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: false,
        fetchingWarehouseTransactionFail: true,
        fetchWarehouseTransactionFailMessage: action.payload.message
      });
    },
    [actions.fetchWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: false,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: '',
        warehouseTransactions: action.payload.data,
        tableDisplay: {
          ...state.tableDisplay,
          page: action.payload.pagination.currentPage - 1,
          count: action.payload.pagination.count
        }
      });
    },
    [actions.setPage]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          page: action.payload.fetchParam.page
        },
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.setLimit]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          limit: action.payload.fetchParam.perpage
        },
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.setSearchForName]: (state, action) => {
      return freeze({
        ...state,
        searchForName: action.payload.name,
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.fetchManufacturers]: (state, action) => {
      return freeze({
        ...state,
        manufacturers: []
      });
    },
    [actions.fetchManufacturersSuccess]: (state, action) => {
      return freeze({
        ...state,
        manufacturers: action.payload.data
      });
    },
    [actions.fetchManufacturersFail]: (state, action) => {
      return freeze({
        ...state,
        manufacturers: []
      });
    },
    [actions.clearManufacturers]: (state, action) => {
      return freeze({
        ...state,
        manufacturers: []
      });
    },
    [actions.selectManufacturer]: (state, action) => {
      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          manufacturerId: action.payload
        }
      });
    },
    [actions.changeDescription]: (state, action) => {
      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          description: action.payload
        }
      });
    },
    [actions.fetchProducts]: (state, action) => {
      return freeze({
        ...state,
        products: []
      });
    },
    [actions.fetchProductsSuccess]: (state, action) => {
      return freeze({
        ...state,
        products: action.payload.data
      });
    },
    [actions.fetchProductsFail]: (state, action) => {
      return freeze({
        ...state,
        products: []
      });
    },
    [actions.clearProducts]: (state, action) => {
      return freeze({
        ...state,
        products: []
      });
    },
    [actions.selectProduct]: (state, action) => {
      const newProducts = JSON.parse(
        JSON.stringify(action.payload.newProducts)
      );
      newProducts.map(p => {
        const existedProduct = _find(
          _get(state, 'newWarehouseTransaction.warehouseTransactionItems', []),
          existedProduct => existedProduct.id === p.id
        );
        if (existedProduct) {
          p.quantity = existedProduct.quantity;
          p.cost = existedProduct.cost;
        } else {
          p.quantity = 1;
        }
      });

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.deleteItem]: (state, action) => {
      const existedProducts = _get(
        state,
        'newWarehouseTransaction.warehouseTransactionItems',
        []
      );
      const existedProductIndex = _findIndex(
        existedProducts,
        existedProduct => existedProduct.id === action.payload.id
      );

      let newProducts;

      if (existedProductIndex === existedProducts.length - 1) {
        newProducts = [...existedProducts.slice(0, existedProductIndex)];
      } else {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          ...existedProducts.slice(
            existedProductIndex + 1,
            existedProducts.length
          )
        ];
      }

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.changeItemQuantity]: (state, action) => {
      const existedProducts = _get(
        state,
        'newWarehouseTransaction.warehouseTransactionItems',
        []
      );
      const existedProductIndex = _findIndex(
        existedProducts,
        existedProduct => existedProduct.id === action.payload.id
      );

      const modifiedProduct = JSON.parse(
        JSON.stringify(existedProducts[existedProductIndex])
      );
      modifiedProduct.quantity =
        action.payload.quantity < 1 ? 1 : action.payload.quantity;

      let newProducts;

      if (existedProductIndex === existedProducts.length - 1) {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct
        ];
      } else {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct,
          ...existedProducts.slice(
            existedProductIndex + 1,
            existedProducts.length
          )
        ];
      }

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.changeItemCost]: (state, action) => {
      const existedProducts = _get(
        state,
        'newWarehouseTransaction.warehouseTransactionItems',
        []
      );
      const existedProductIndex = _findIndex(
        existedProducts,
        existedProduct => existedProduct.id === action.payload.id
      );

      const modifiedProduct = JSON.parse(
        JSON.stringify(existedProducts[existedProductIndex])
      );
      modifiedProduct.cost = action.payload.cost < 0 ? 0 : action.payload.cost;

      let newProducts;

      if (existedProductIndex === existedProducts.length - 1) {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct
        ];
      } else {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct,
          ...existedProducts.slice(
            existedProductIndex + 1,
            existedProducts.length
          )
        ];
      }

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.clearNewData]: (state, action) => {
      return freeze({
        ...state,
        ...makeInitialState()
      });
    },
    [actions.createNewWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: true,
        sendToServerFailMessage: '',
        isSendingToServerFail: false
      });
    },
    [actions.createNewWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: '',
        isSendingToServerFail: false
      });
    },
    [actions.createNewWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: action.payload.message,
        isSendingToServerFail: true
      });
    }
  },
  initialStates
);
