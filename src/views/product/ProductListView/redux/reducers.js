import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Product';

const initialStates = freeze({
  isLoadingProducts: false,
  isLoadProductsFail: false,
  loadProductMessage: '',
  search: '',
  pagination: {
    total: 1,
    current: 1
  },
  products: []
});

export default handleActions(
  {
    [actions.fetchProductList]: (state, action) => {
      return freeze({ ...state, isLoadingProducts: true });
    },
    [actions.fetchProductListSuccess]: (state, action) => {
      return freeze({
        ...state,
        isLoadingProducts: false,
        isLoadProductsFail: false,
        loadProductMessage: action.payload.message,
        products: action.payload.data,
        search: '',
        pagination: {
          total: action.payload.pagination.totalPage,
          current: action.payload.pagination.currentPage
        }
      });
    },
    [actions.fetchProductListFail]: (state, action) => {
      return freeze({
        ...state,
        isLoadingProducts: false,
        isLoadProductsFail: true,
        search: '',
        loadProductMessage: action.payload.message
      });
    },
    [actions.searchProduct]: (state, action) => {
      return freeze({
        ...state,
        isLoadingProducts: true,
        search: action.payload.search
      });
    },
    [actions.searchProductSuccess]: (state, action) => ({
      ...state,
      isLoadingProducts: false,
      isLoadProductsFail: false,
      loadProductMessage: action.payload.message,
      products: action.payload.data,
      pagination: {
        total: action.payload.pagination.totalPage,
        current: action.payload.pagination.currentPage
      }
    }),
    [actions.searchProductFail]: (state, action) => ({
      ...state,
      isLoadingProducts: false,
      isLoadProductsFail: true,
      loadProductMessage: action.payload.message,
      products: [],
      pagination: {
        total: action.payload.pagination.totalPage,
        current: action.payload.pagination.currentPage
      }
    })
  },
  initialStates
);
