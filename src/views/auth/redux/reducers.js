import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Login';

const initialStates = freeze({
  emailError: false,
  snackbarOpen: false,
  isLoading: false,
  loginError: false,
  message: '',
  userInfo: {
    name: 'John Doe',
    email: 'example@gmail.com',
    avatar: ''
  },
  data: {}
});

export default handleActions(
  {
    [actions.emailLogin]: (state, action) => {
      return freeze({ ...state, isLoading: true });
    },
    [actions.emailLoginSuccess]: (state, action) => {
      return freeze({
        ...state,
        isLoading: false,
        userInfo: {
          name: action.payload.data.userInfo.name,
          email: action.payload.data.userInfo.email,
          avatar: action.payload.data.userInfo.avatar
        }
      });
    },
    [actions.emailLoginFail]: (state, action) => {
      const { payload } = action;
      return freeze({
        ...state,
        isLoading: false,
        snackbarOpen: true,
        loginError: true,
        message: payload.message
      });
    },
    [actions.closeSnackbar]: (state, action) => {
      return freeze({
        ...state,
        snackbarOpen: false,
        loginError: false,
        message: ''
      });
    }
  },
  initialStates
);
