import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Login';

const initialStates = freeze({
  emailError: false,
  snackbarOpen: false,
  isLoading: false,
  loginError: false,
  errorMessage: '',
  data: {}
});

export default handleActions(
  {
    [actions.emailLogin]: (state, action) => {
      return freeze({ ...state, isLoading: true });
    },
    [actions.emailLoginSuccess]: (state, action) => {
      return freeze({ ...state, isLoading: false });
    },
    [actions.emailLoginFail]: (state, action) => {
      const { payload } = action;
      return freeze({
        ...state,
        isLoading: false,
        snackbarOpen: true,
        loginError: true,
        errorMessage: payload.message
      });
    },
    [actions.closeSnackbar]: (state, action) => {
      return freeze({
        ...state,
        snackbarOpen: false,
        loginError: false,
        errorMessage: ''
      });
    }
  },
  initialStates
);
