import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import ApiErrorCode from 'src/constants/apiErrorCode';

export const name = 'ManufacturerList';

const initialStates = freeze({
  isFetchingManufacturer: false,
  isFetchManufacturerFail: false,
  fetchManufacturerFailMessage: '',
  tableDisplay: {
    limit: 10,
    page: 0,
    count: 0
  },
  searchForName: '',
  manufacturers: []
});

export default handleActions(
  {
    [actions.fetchManufacturer]: (state, action) => {
      return freeze({
        ...state,
        isFetchingManufacturer: true,
        isFetchManufacturerFail: false,
        fetchManufacturerFailMessage: '',
        manufacturers: []
      });
    },

    [actions.fetchManufacturerFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingManufacturer: false,
        isFetchManufacturerFail: true,
        fetchManufacturerFailMessage: action.payload.message,
        manufacturers: []
      });
    },

    [actions.fetchManufacturerSuccess]: (state, action) => {
      let page = action.payload.pagination.currentPage - 1;
      if (
        action.payload.pagination.currentPage >
        action.payload.pagination.totalPage
      ) {
        page = 0;
      }

      return freeze({
        ...state,
        isFetchingManufacturer: false,
        isFetchManufacturerFail: false,
        fetchManufacturerFailMessage: '',
        manufacturers: action.payload.data,
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
        isFetchingManufacturer: true,
        isFetchManufacturerFail: false,
        fetchManufacturerFailMessage: ''
      });
    },
    [actions.setLimit]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          limit: action.payload.fetchParam.perpage
        },
        isFetchingManufacturer: true,
        isFetchManufacturerFail: false,
        fetchManufacturerFailMessage: ''
      });
    },
    [actions.setSearchForName]: (state, action) => {
      return freeze({
        ...state,
        searchForName: action.payload.name,
        isFetchingManufacturer: true,
        fetchManufacturerFailMessage: '',
        isFetchManufacturerFail: false
      });
    }
  },
  initialStates
);
