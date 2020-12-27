import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Product';

const initialStates = freeze({
  isLoadingProducts: false,
  isLoadProductsFail: false,
  loadProductMessage: '',
  isLoadingCategories: false,
  isLoadingCategoriesFail: false,
  loadingCategoriesFailMessage: '',
  categories: [],
  selectedFilterCategories: [],
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
    [actions.searchProductSuccess]: (state, action) => {
      return freeze({
        ...state,
        isLoadingProducts: false,
        isLoadProductsFail: false,
        loadProductMessage: action.payload.message,
        products: action.payload.data,
        pagination: {
          total: action.payload.pagination.totalPage,
          current: action.payload.pagination.currentPage
        }
      });
    },
    [actions.searchProductFail]: (state, action) => {
      return freeze({
        ...state,
        isLoadingProducts: false,
        isLoadProductsFail: true,
        loadProductMessage: action.payload.message,
        products: [],
        pagination: {
          total: action.payload.pagination.totalPage,
          current: action.payload.pagination.currentPage
        }
      });
    },
    [actions.fetchCategories]: (state, action) => {
      return freeze({
        ...state,
        isLoadingCategories: true,
        isLoadingCategoriesFail: false,
        loadingCategoriesFailMessage: ''
      });
    },
    [actions.fetchCategoriesSuccess]: (state, action) => {
      return freeze({
        ...state,
        isLoadingCategories: false,
        isLoadingCategoriesFail: false,
        loadingCategoriesFailMessage: '',
        categories: action.payload.data
      });
    },
    [actions.fetchCategoriesFail]: (state, action) => {
      return freeze({
        ...state,
        isLoadingCategories: false,
        isLoadingCategoriesFail: true,
        loadingCategoriesFailMessage: action.payload.message
      });
    },
    [actions.selectFilterCategories]: (state, action) => {
      return freeze({
        ...state,
        selectedFilterCategories: action.payload
      });
    },
    //
    [actions.applyFilter]: (state, action) => {
      return freeze({ ...state, isLoadingProducts: true });
    },
    [actions.applyFilterSuccess]: (state, action) => {
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
    [actions.applyFilterFail]: (state, action) => {
      return freeze({
        ...state,
        isLoadingProducts: false,
        isLoadProductsFail: true,
        search: '',
        loadProductMessage: action.payload.message
      });
    }
  },
  initialStates
);
