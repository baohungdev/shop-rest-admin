import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'LoginStore';

const initialStates = freeze({
  emailError: false,
  isLoading: false,
  loginError: false,
  data: {},
});

export default handleActions(
  {
    [actions.emailLogin]: (state, action) => {
      return freeze({ ...state, isLoading: true });
    },
  },
  initialStates
);
