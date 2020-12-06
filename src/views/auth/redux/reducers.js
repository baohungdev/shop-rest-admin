import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Login';

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
    [actions.emailLoginSuccess]: (state, action) => {
      console.log(action);
      return freeze({ ...state, isLoading: false });
    },
    [actions.emailLoginFail]: (state, action) => {
      console.log(action);
      return freeze({ ...state, isLoading: false });
    },
  },
  initialStates
);
