import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Account';

const initialStates = freeze({
  fetchError: false,
  isLoading: false,
  data: {},
  userInfo: {
    name: '',
    email: '',
    avatar: ''
  }
});

export default handleActions(
  {
    [actions.fetchUserInfo]: (state, action) => {
      return freeze({ ...state, isLoading: true });
    },

    [actions.fetchUserInfoFail]: (state, action) => {
      return freeze({ ...state, isLoading: false });
    },

    [actions.fetchUserInfoSuccess]: (state, action) => {
      return freeze({
        ...state,
        isLoading: false,
        userInfo: {
          name: action.payload.name,
          email: action.payload.email,
          avatar: action.payload.avatar
        }
      });
    }
  },
  initialStates
);
