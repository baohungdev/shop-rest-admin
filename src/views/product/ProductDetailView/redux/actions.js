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

export const selectCategory = createAction(CONST.HANDLE_SELECT_CATEGORY);
export const changeProductStatus = createAction(CONST.HANDLE_CHANGE_STATUS);

export const changeProductName = createAction(CONST.HANDLE_CHANGE_NAME);
export const changeProductDescription = createAction(
  CONST.HANDLE_CHANGE_DESCRIPTION
);
export const changeProductPrice = createAction(CONST.HANDLE_CHANGE_PRICE);
export const changeProductCost = createAction(CONST.HANDLE_CHANGE_COST);
export const changeProductQuantity = createAction(CONST.HANDLE_CHANGE_QUANTITY);
export const changeProductManageVariant = createAction(
  CONST.HANDLE_CHANGE_MANAGE_VARIANT
);

export const addNewVariant = createAction(CONST.HANDLE_ADD_NEW_VARIANT);
export const deleteVariant = createAction(CONST.HANDLE_DELETE_VARIANT);

export const changeVariantProperty = createAction(
  CONST.HANDLE_CHANGE_VARIANT_PROPERTY
);

export const saveProduct = createAction(CONST.HANDLE_SAVE_PRODUCT);

export const saveProductSuccess = createAction(
  CONST.HANDLE_SAVE_PRODUCT_SUCCESS
);

export const saveProductFail = createAction(CONST.HANDLE_SAVE_PRODUCT_FAIL);

export const deleteProduct = createAction(CONST.HANDLE_DELETE_PRODUCT);
export const deleteProductSuccess = createAction(
  CONST.HANDLE_DELETE_PRODUCT_SUCCESS
);
export const deleteProductFail = createAction(CONST.HANDLE_DELETE_PRODUCT_FAIL);
