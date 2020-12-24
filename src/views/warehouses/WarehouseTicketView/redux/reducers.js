import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'WarehouseTicket';

const initialStates = freeze({});

export default handleActions({}, initialStates);
