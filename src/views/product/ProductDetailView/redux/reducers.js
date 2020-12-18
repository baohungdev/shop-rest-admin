import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'ProductDetail';

const initialStates = freeze({
  isFetchingProduct: false,
  isFetchingProductFail: false,
  fetchProductMessage: '',
  isUploadingProductImages: false,
  isUploadingProductImagesFail: false,
  isFetchingCategories: false,
  isFetchingCategoriesFail: false,
  fetchCategoriesMessage: '',
  categories: [],
  uploadProductImagesMessage: '',
  data: {},
  view: {
    imageUrls: [],
    name: '',
    description: 'Mô tả sản phẩm',
    price: 0,
    quantity: 0,
    categoryId: null,
    cost: 0
  }
});

export default handleActions(
  {
    [actions.fetchProductDetail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingProduct: true,
        isFetchingProductFail: false,
        fetchProductMessage: ''
      });
    },
    [actions.fetchProductDetailSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingProduct: false,
        isFetchingProductFail: false,
        fetchProductMessage: '',
        data: action.payload.data,
        view: {
          ...state.view,
          ...action.payload.data
        }
        // view: action.payload.data
      });
    },
    [actions.fetchProductDetailFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingProduct: false,
        isFetchingProductFail: true,
        fetchProductMessage: action.payload.message,
        data: {}
      });
    },
    [actions.removeProductImage]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          imageUrls: state.view.imageUrls.filter(
            url => url !== action.payload.url
          )
        }
      });
    },
    [actions.uploadImageBatch]: state => {
      return freeze({
        ...state,
        isUploadingProductImages: true
      });
    },
    [actions.uploadImageBatchSuccess]: (state, actions) => {
      return freeze({
        ...state,
        isUploadingProductImages: false,
        isUploadingProductImagesFail: false,
        uploadProductImagesMessage: '',
        view: {
          ...state.view,
          imageUrls: [...state.view.imageUrls, ...actions.payload.data]
        }
      });
    },
    [actions.uploadImageBatchFail]: (state, actions) => {
      return freeze({
        ...state,
        isUploadingProductImages: false,
        isUploadingProductImagesFail: true,
        uploadProductImagesMessage: actions.payload.message
      });
    },
    [actions.fetchCategories]: state => {
      return freeze({
        ...state,
        isFetchingCategories: true,
        isFetchingCategoriesFail: false,
        fetchCategoriesMessage: '',
        categories: []
      });
    },
    [actions.fetchCategoriesSuccess]: (state, actions) => {
      return freeze({
        ...state,
        isFetchingCategories: false,
        isFetchingCategoriesFail: false,
        fetchCategoriesMessage: '',
        categories: [...actions.payload.data]
      });
    },
    [actions.fetchCategoriesFail]: (state, actions) => {
      return freeze({
        ...state,
        isFetchingCategories: false,
        isFetchingCategoriesFail: true,
        fetchCategoriesMessage: actions.payload.message,
        categories: []
      });
    },
    [actions.selectCategory]: (state, actions) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          categoryId: actions.payload
        }
      });
    }
  },
  initialStates
);
