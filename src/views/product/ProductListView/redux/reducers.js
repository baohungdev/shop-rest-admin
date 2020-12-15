import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Product';

const initialStates = freeze({
  isLoadingProducts: false,
  isLoadProductsFail: false,
  loadProductMessage: '',
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
        products: action.payload.data
      });
    },
    [actions.fetchProductListFail]: (state, action) => {
      return freeze({
        ...state,
        isLoadingProducts: false,
        isLoadProductsFail: true,
        loadProductMessage: action.payload.message
      });
    }
  },
  initialStates
);
