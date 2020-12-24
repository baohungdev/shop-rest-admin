import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import ApiErrorCode from 'src/constants/apiErrorCode';

export const name = 'ManufacturerList';

const initialStates = freeze({
  isFetchingManufacturer: false,
  isFetchManufacturerFail: false,
  fetchManufacturerFailMessage: '',
  isFetchingLocation: false,
  isShowSnackbar: false,
  isSnackbarError: false,
  snackbarMessage: false,
  tableDisplay: {
    limit: 10,
    page: 0,
    count: 0
  },
  searchForName: '',
  manufacturers: [],
  provinces: [],
  districts: [],
  wards: [],
  isSendingToServer: false,
  sendToServerFail: false,
  sendToServerFailMessage: '',
  selectedProvinceId: null,
  selectedDistrictId: null,
  selectedWardId: null,
  showManufacturerInfo: false,
  showWithFetchingId: null,
  usedFor: 'create',
  newManufacturerInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    representative: ''
  },
  updateManufacturerInfo: {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    representative: ''
  }
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
    },
    [actions.showManufacturerInfo]: (state, action) => {
      return freeze({
        ...state,
        showManufacturerInfo: action.payload.show,
        usedFor: action.payload.usedFor,
        showWithFetchingId: action.payload.showWithFetchingId
      });
    },
    [actions.getAllProvinces]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: true,
        selectedDistrictId: null,
        selectedWardId: null
      });
    },
    [actions.getAllProvincesFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: false
      });
    },
    [actions.getAllProvincesSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: false,
        provinces: action.payload.data
      });
    },

    [actions.getAllDistricts]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: true,
        selectedProvinceId: action.payload,
        selectedWardId: null
      });
    },
    [actions.getAllDistrictsFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: false
      });
    },
    [actions.getAllDistrictsSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: false,
        districts: action.payload.data
      });
    },
    [actions.getAllWards]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: true,
        selectedDistrictId: action.payload
      });
    },
    [actions.getAllWardsFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: false
      });
    },
    [actions.getAllWardsSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingLocation: false,
        wards: action.payload.data
      });
    },
    [actions.changeWard]: (state, action) => {
      return freeze({
        ...state,
        selectedWardId: action.payload
      });
    },
    [actions.changeManufacturerInfo]: (state, action) => {
      const { name, value, usedFor } = action.payload;
      const carry =
        usedFor === 'update' ? 'updateManufacturerInfo' : 'newManufacturerInfo';

      return freeze({
        ...state,
        [carry]: {
          ...state[carry],
          [name]: value
        }
      });
    },
    [actions.saveOrUpdateManufacturer]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: true
      });
    },
    [actions.saveOrUpdateManufacturerSuccess]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFail: false,
        sendToServerFailMessage: '',
        isShowSnackbar: true,
        snackbarMessage: 'Thao tác thành công',
        isSnackbarError: false
      });
    },
    [actions.saveOrUpdateManufacturerFail]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFail: true,
        sendToServerFailMessage: action.payload.message,
        isShowSnackbar: true,
        snackbarMessage: action.payload.message,
        isSnackbarError: true
      });
    },
    [actions.closeSnackbar]: (state, action) => {
      return freeze({
        ...state,
        isShowSnackbar: false,
        snackbarMessage: '',
        isSnackbarError: false
      });
    },
    [actions.getDetailManufacturer]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: true,
        isShowSnackbar: false,
        isSnackbarError: false,
        snackbarMessage: ''
      });
    },
    [actions.getDetailManufacturerSuccess]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        updateManufacturerInfo: action.payload.data
      });
    },
    [actions.getDetailManufacturerFail]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        isShowSnackbar: true,
        isSnackbarError: true,
        snackbarMessage: action.payload.message
      });
    },
    [actions.deleteManufacturer]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: true,
        isShowSnackbar: false,
        isSnackbarError: false,
        snackbarMessage: ''
      });
    },
    [actions.deleteManufacturerFail]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        isShowSnackbar: true,
        isSnackbarError: true,
        snackbarMessage: action.payload.message
      });
    },
    [actions.deleteManufacturerSuccess]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        isShowSnackbar: true,
        isSnackbarError: false,
        snackbarMessage: 'Đã xóa nhà cung cấp'
      });
    }
  },
  initialStates
);
