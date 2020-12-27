import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchProductList = createAction(CONST.HANDLE_FETCH_PRODUCT_LIST);
export const fetchProductListSuccess = createAction(
  CONST.HANDLE_FETCH_PRODUCT_LIST_SUCCESS
);
export const fetchProductListFail = createAction(
  CONST.HANDLE_FETCH_PRODUCT_LIST_FAIL
);

export const searchProduct = createAction(CONST.HANDLE_SEARCH_PRODUCT);
export const searchProductSuccess = createAction(
  CONST.HANDLE_SEARCH_PRODUCT_SUCCESS
);
export const searchProductFail = createAction(CONST.HANDLE_SEARCH_PRODUCT_FAIL);
export const fetchCategories = createAction(CONST.HANDLE_FETCH_CATEGORIES);
export const fetchCategoriesSuccess = createAction(
  CONST.HANDLE_FETCH_CATEGORIES_SUCCESS
);
export const fetchCategoriesFail = createAction(
  CONST.HANDLE_FETCH_CATEGORIES_FAIL
);
export const selectFilterCategories = createAction(
  CONST.HANDLE_SELECT_FILTER_CATEGORIES
);

export const applyFilter = createAction(CONST.HANDLE_APPLY_FILTERS);
export const applyFilterFail = createAction(CONST.HANDLE_APPLY_FILTERS_FAIL);
export const applyFilterSuccess = createAction(
  CONST.HANDLE_APPLY_FILTERS_SUCCESS
);
