import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'WarehouseItem';

const initialStates = freeze({
  isFetchingWarehouseItems: false,
  isFetchWarehouseItemsFail: false,
  fetchWarehouseItemsFailMessage: '',
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
      return freeze({
        ...state,
        isFetchingWarehouseItems: false,
        isFetchWarehouseItemsFail: false,
        fetchWarehouseItemsFailMessage: '',
        warehouseItems: action.payload.data
      });
    }
  },
  initialStates
);
