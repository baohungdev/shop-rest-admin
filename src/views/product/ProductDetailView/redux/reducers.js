import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import { v4 as uuid } from 'uuid';
import * as actions from './actions';

export const name = 'ProductDetail';

const initialStates = freeze({
  isFetchingProduct: false,
  isFetchingProductFail: false,
  fetchProductMessage: '',
  isUploadingProductImages: false,
  isUploadingProductImagesFail: false,
  haveUpdatedProductSuccess: false,
  isFetchingCategories: false,
  isFetchingCategoriesFail: false,
  isUpdatingProductDetail: false,
  isUpdateProductDetailFail: false,
  isDeletingProduct: false,
  isDeleteProductFail: false,
  deleteProductFailMessage: true,
  updateProductDetailMessage: '',
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
    categoryId: 1,
    status: 0,
    children: [],
    cost: 0,
    isManageVariant: false
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
    },
    [actions.changeProductStatus]: (state, actions) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          status: Number(actions.payload)
        }
      });
    },
    [actions.changeProductName]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          name: action.payload
        }
      });
    },
    [actions.changeProductDescription]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          description: action.payload
        }
      });
    },
    [actions.changeProductPrice]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          price: Number(action.payload)
        }
      });
    },
    [actions.changeProductCost]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          cost: Number(action.payload)
        }
      });
    },
    [actions.changeProductQuantity]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          quantity: Number(action.payload)
        }
      });
    },
    [actions.changeProductManageVariant]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          isManageVariant: Boolean(action.payload)
        }
      });
    },
    [actions.addNewVariant]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          children: [
            ...state.view.children,
            {
              id: uuid(),
              isNew: true,
              name: '',
              price: 0,
              cost: 0,
              quantity: 0
            }
          ]
        }
      });
    },
    [actions.deleteVariant]: (state, action) => {
      return freeze({
        ...state,
        view: {
          ...state.view,
          children: state.view.children.filter(
            variant => variant.id !== action.payload.id
          )
        }
      });
    },

    [actions.changeVariantProperty]: (state, action) => {
      const matchedIndex = state.view.children.findIndex(
        variant => variant.id === action.payload.id
      );

      if (matchedIndex === -1) {
        return freeze({ ...state });
      }

      const matchedVariant = state.view.children[matchedIndex];

      const newVariant = {
        ...matchedVariant,
        [action.payload.property]: action.payload.value
      };

      const newChildren = [...state.view.children];
      newChildren[matchedIndex] = newVariant;

      return freeze({
        ...state,
        view: {
          ...state.view,
          children: newChildren
        }
      });
    },

    [actions.saveProduct]: (state, action) => {
      return freeze({
        ...state,
        isUpdatingProductDetail: true,
        isUpdateProductDetailFail: false,
        updateProductDetailMessage: '',
        haveUpdatedProductSuccess: false
      });
    },

    [actions.saveProductSuccess]: (state, action) => {
      return freeze({
        ...state,
        isUpdatingProductDetail: false,
        isUpdateProductDetailFail: false,
        updateProductDetailMessage: '',
        haveUpdatedProductSuccess: true
      });
    },
    [actions.saveProductFail]: (state, action) => {
      return freeze({
        ...state,
        isUpdatingProductDetail: false,
        isUpdateProductDetailFail: true,
        updateProductDetailMessage: action.payload.message,
        haveUpdatedProductSuccess: false
      });
    },
    [actions.deleteProduct]: (state, action) => {
      return freeze({
        ...state,
        isDeletingProduct: true,
        isDeleteProductFail: false,
        deleteProductFailMessage: ''
      });
    },
    [actions.deleteProductFail]: (state, action) => {
      return freeze({
        ...state,
        isDeletingProduct: false,
        isDeleteProductFail: true,
        deleteProductFailMessage: action.payload.message
      });
    },
    [actions.deleteProductSuccess]: (state, action) => {
      return freeze({
        ...state,
        isDeletingProduct: false,
        isDeleteProductFail: false,
        deleteProductFailMessage: ''
      });
    }
  },
  initialStates
);
