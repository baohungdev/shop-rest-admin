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
    avatar: '',
    gender: 1,
    birthDate: Date.now(),
    roles: []
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
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatar: action.payload.data.avatar,
          gender: action.payload.data.gender,
          birthDate: action.payload.data.birthDate,
          roles: action.payload.data.roles
        }
      });
    }
  },
  initialStates
);
