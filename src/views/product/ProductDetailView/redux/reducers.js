import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'ProductDetail';

const initialStates = freeze({
  isFetchingProduct: false,
  isFetchingProductFail: false,
  fetchProductMessage: '',
  data: {},
  view: {
    imageUrls: []
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
        view: action.payload.data
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
    }
  },
  initialStates
);
