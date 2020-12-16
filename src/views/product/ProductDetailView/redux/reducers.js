import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'ProductDetail';

const initialStates = freeze({
  isFetchingProduct: false,
  isFetchingProductFail: false,
  fetchProductMessage: '',
  data: {}
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
        data: action.payload.data
      });
    },
    [actions.fetchProductDetailSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingProduct: false,
        isFetchingProductFail: true,
        fetchProductMessage: action.payload.message,
        data: {}
      });
    }
  },
  initialStates
);
