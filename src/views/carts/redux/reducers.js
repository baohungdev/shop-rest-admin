import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialStats = freeze({
  cartList: [],
  isFetchingCartList: false,
  isFetchingCartListFail: false,
  fetchCartListFailMessage: '',
  singleCart: {
    customer: {
      adresseses: [{}]
    },
    customerAddressIndex: 0
  },
  isFetchingCart: false,
  isFetchingCartFail: false,
  fetchCartFailMessage: '',
  tableDisplay: {
    limit: 10,
    page: 0,
    count: 0
  }
});

export const name = 'Cart';
export default handleActions(
  {
    [actions.fetchCarts]: (state, action) => {
      return freeze({
        ...state,
        isFetchingCartList: true,
        isFetchingCartListFail: false,
        fetchCartListFailMessage: ''
      });
    },
    [actions.fetchCartsSuccess]: (state, action) => {
      let page = action.payload.pagination.currentPage - 1;
      if (
        action.payload.pagination.currentPage >
        action.payload.pagination.totalPage
      ) {
        page = 0;
      }
      return freeze({
        ...state,
        isFetchingCartList: false,
        isFetchingCartListFail: false,
        fetchCartListFailMessage: '',
        cartList: action.payload.data,
        tableDisplay: {
          ...state.tableDisplay,
          page,
          count: action.payload.pagination.count
        }
      });
    },
    [actions.fetchCartsFail]: (state, action) => {
      return freeze({
        isFetchingCartList: false,
        isFetchingCartListFail: true,
        fetchCartListFailMessage: action.payload.message
      });
    },
    [actions.setPage]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          page: action.payload.fetchParam.page
        },
        isFetchingCartList: true,
        isFetchingCartListFail: false,
        fetchCartListFailMessage: ''
      });
    },
    [actions.setLimit]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          limit: action.payload.fetchParam.perpage
        },
        isFetchingCartList: true,
        isFetchingCartListFail: false,
        fetchCartListFailMessage: ''
      });
    },
    [actions.fetchCartDetail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingCart: true,
        isFetchingCartFail: false,
        fetchCartFailMessage: ''
      });
    },
    [actions.fetchCartDetailSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingCart: false,
        isFetchingCartFail: false,
        fetchCartFailMessage: '',
        singleCart: action.payload.data
      });
    },
    [actions.fetchCartDetailFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingCart: false,
        isFetchingCartFail: false,
        fetchCartFailMessage: action.payload.message
      });
    }
  },
  initialStats
);
