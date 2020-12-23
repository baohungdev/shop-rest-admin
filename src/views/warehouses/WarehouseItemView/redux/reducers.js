import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'WarehouseItem';

const initialStates = freeze({
  isFetchingWarehouseItems: false,
  isFetchWarehouseItemsFail: false,
  fetchWarehouseItemsFailMessage: '',
  tableDisplay: {
    limit: 10,
    page: 0,
    count: 0
  },
  searchForName: '',
  warehouseItems: []
});

export default handleActions(
  {
    [actions.fetchWarehouseItems]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseItems: true,
        isFetchWarehouseItemsFail: false,
        fetchWarehouseItemsFailMessage: '',
        warehouseItems: []
      });
    },

    [actions.fetchWarehouseItemsFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseItems: false,
        isFetchWarehouseItemsFail: true,
        fetchWarehouseItemsFailMessage: action.payload.message,
        warehouseItems: []
      });
    },

    [actions.fetchWarehouseItemsSuccess]: (state, action) => {
      let page = action.payload.pagination.currentPage - 1;
      if (
        action.payload.pagination.currentPage >
        action.payload.pagination.totalPage
      ) {
        page = 0;
      }

      return freeze({
        ...state,
        isFetchingWarehouseItems: false,
        isFetchWarehouseItemsFail: false,
        fetchWarehouseItemsFailMessage: '',
        warehouseItems: action.payload.data,
        tableDisplay: {
          ...state.tableDisplay,
          page,
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
        isFetchingWarehouseItems: true,
        fetchWarehouseItemsFailMessage: '',
        isFetchWarehouseItemsFail: false
      });
    },
    [actions.setLimit]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          limit: action.payload.fetchParam.perpage
        },
        isFetchingWarehouseItems: true,
        fetchWarehouseItemsFailMessage: '',
        isFetchWarehouseItemsFail: false
      });
    },
    [actions.setSearchForName]: (state, action) => {
      return freeze({
        ...state,
        searchForName: action.payload.name,
        isFetchingWarehouseItems: true,
        fetchWarehouseItemsFailMessage: '',
        isFetchWarehouseItemsFail: false
      });
    }
  },
  initialStates
);
