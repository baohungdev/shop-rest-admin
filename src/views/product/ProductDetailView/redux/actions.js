import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchProductDetail = createAction(
  CONST.HANDLE_FETCH_PRODUCT_DETAIL
);

export const fetchProductDetailSuccess = createAction(
  CONST.HANDLE_FETCH_PRODUCT_DETAIL_SUCCESS
);

export const fetchProductDetailFail = createAction(
  CONST.HANDLE_FETCH_PRODUCT_DETAIL_FAIL
);

export const removeProductImage = createAction(
  CONST.HANDLE_REMOVE_PRODUCT_IMAGE
);

export const uploadImageBatch = createAction(
  CONST.HANDLE_UPLOAD_PRODUCT_IMAGES
);

export const uploadImageBatchSuccess = createAction(
  CONST.HANDLE_UPLOAD_PRODUCT_IMAGES_SUCCESS
);

export const uploadImageBatchFail = createAction(
  CONST.HANDLE_UPLOAD_PRODUCT_IMAGES_FAIL
);

export const fetchCategories = createAction(CONST.HANDLE_FETCH_CATEGORIES);
export const fetchCategoriesSuccess = createAction(
  CONST.HANDLE_FETCH_CATEGORIES_SUCCESS
);
export const fetchCategoriesFail = createAction(
  CONST.HANDLE_FETCH_CATEGORIES_FAIL
);
