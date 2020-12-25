import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'WarehouseTicket';

const initialStates = freeze({
  tableDisplay: {
    limit: 10,
    page: 0,
    count: 0
  },
  searchForName: '',
  warehouseTransactions: [],
  selectedWarehouseTransactionType: 0, // import
  isFetchingWarehouseTransaction: false,
  fetchingWarehouseTransactionFail: false,
  fetchWarehouseTransactionFailMessage: ''
});

export default handleActions(
  {
    [actions.changeTabDisplay]: (state, action) => {
      return freeze({
        ...state,
        selectedWarehouseTransactionType: action.payload
      });
    },
    [actions.fetchWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: true,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.fetchWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: false,
        fetchingWarehouseTransactionFail: true,
        fetchWarehouseTransactionFailMessage: action.payload.message
      });
    },
    [actions.fetchWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: false,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: '',
        warehouseTransactions: action.payload.data,
        tableDisplay: {
          ...state.tableDisplay,
          page: action.payload.pagination.currentPage - 1,
          count: action.payload.pagination.count
        }
      });
    },
    [actions.setPage]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          page: action.payload.fetchParam.page
        },
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.setLimit]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          limit: action.payload.fetchParam.perpage
        },
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.setSearchForName]: (state, action) => {
      return freeze({
        ...state,
        searchForName: action.payload.name,
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    }
  },
  initialStates
);
