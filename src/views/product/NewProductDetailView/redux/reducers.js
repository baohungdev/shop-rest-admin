import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import { v4 as uuid } from 'uuid';
import * as actions from './actions';
import ApiErrorCode from 'src/constants/apiErrorCode';

export const name = 'AddProductDetail';

const makeInitialStates = () => ({
  isUploadingProductImages: false,
  isUploadingProductImagesFail: false,
  haveAddedProductSuccess: false,
  isFetchingCategories: false,
  isFetchingCategoriesFail: false,
  isAddingProductDetail: false,
  isAddProductDetailFail: false,
  isDeletingProduct: false,
  isDeleteProductFail: false,
  deleteProductFailMessage: true,
  addProductDetailMessage: '',
  fetchCategoriesMessage: '',
  categories: [],
  uploadProductImagesMessage: '',
  data: {},
  add: {
    imageUrls: [],
    name: '',
    description: 'Mô tả sản phẩm',
    price: 0,
    quantity: 0,
    categoryId: 0,
    status: 0,
    children: [],
    cost: 0,
    isManageVariant: false,
    tags: [],
    features: [],
    isDiscount: false,
    priceBeforeDiscount: 0,
    height: 0,
    weight: 0,
    width: 0,
    length: 0
  }
});

const initialStates = freeze(makeInitialStates());

export default handleActions(
  {
    [actions.removeProductImage]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          imageUrls: state.add.imageUrls.filter(
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
        add: {
          ...state.add,
          imageUrls: [...state.add.imageUrls, ...actions.payload.data]
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
        add: {
          ...state.add,
          categoryId: Number(actions.payload)
        }
      });
    },
    [actions.changeProductStatus]: (state, actions) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          status: Number(actions.payload)
        }
      });
    },
    [actions.changeProductName]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          name: action.payload
        }
      });
    },
    [actions.changeProductDescription]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          description: action.payload
        }
      });
    },
    [actions.changeProductPrice]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          price: Number(action.payload)
        }
      });
    },
    [actions.changeProductCost]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          cost: Number(action.payload)
        }
      });
    },
    [actions.changeProductQuantity]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          quantity: Number(action.payload)
        }
      });
    },
    [actions.changeProductManageVariant]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          isManageVariant: Boolean(action.payload)
        }
      });
    },
    [actions.addNewVariant]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          children: [
            ...state.add.children,
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
        add: {
          ...state.add,
          children: state.add.children.filter(
            variant => variant.id !== action.payload.id
          )
        }
      });
    },

    [actions.changeVariantProperty]: (state, action) => {
      const matchedIndex = state.add.children.findIndex(
        variant => variant.id === action.payload.id
      );

      if (matchedIndex === -1) {
        return freeze({ ...state });
      }

      const matchedVariant = state.add.children[matchedIndex];

      const newVariant = {
        ...matchedVariant,
        [action.payload.property]: action.payload.value
      };

      const newChildren = [...state.add.children];
      newChildren[matchedIndex] = newVariant;

      return freeze({
        ...state,
        add: {
          ...state.add,
          children: newChildren
        }
      });
    },

    [actions.addProduct]: (state, action) => {
      return freeze({
        ...state,
        isAddingProductDetail: true,
        isAddProductDetailFail: false,
        addProductDetailMessage: '',
        haveAddedProductSuccess: false
      });
    },

    [actions.addProductSuccess]: (state, action) => {
      return freeze({
        ...state,
        isAddingProductDetail: false,
        isAddProductDetailFail: false,
        addProductDetailMessage: '',
        haveAddedProductSuccess: true
      });
    },
    [actions.addProductFail]: (state, action) => {
      return freeze({
        ...state,
        isAddingProductDetail: false,
        isAddProductDetailFail: true,
        addProductDetailMessage: action.payload.message,
        haveAddedProductSuccess: false
      });
    },
    [actions.clearProductData]: (state, action) => {
      return freeze(makeInitialStates());
    },
    [actions.createCategory]: (state, action) => {
      return freeze({
        ...state,
        isFetchingCategories: true,
        isFetchingCategoriesFail: false,
        fetchCategoriesMessage: ''
      });
    },
    [actions.createCategorySuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingCategories: false,
        isFetchingCategoriesFail: false,
        fetchCategoriesMessage: ''
      });
    },
    [actions.createCategoryFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingCategories: false,
        isFetchingCategoriesFail: true,
        fetchCategoriesMessage: action.payload.message
      });
    },
    [actions.changeDimension]: (state, action) => {
      return freeze({
        ...state,
        add: {
          ...state.add,
          [action.payload.property]: action.payload.value
        }
      });
    },
    [actions.changeTags]: (state, action) => {
      let tags = [...state.add.tags];

      if (action.payload.type === 'add') {
        tags.push(action.payload.value);
      }

      if (action.payload.type === 'remove') {
        tags = tags.filter((tag, index) => index !== action.payload.index);
      }

      return freeze({
        ...state,
        add: {
          ...state.add,
          tags
        }
      });
    }
  },
  initialStates
);
