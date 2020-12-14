import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const name = 'Account';

const initialStates = freeze({
  fetchError: false,
  isLoading: false,
  isPasswordLoading: false,
  data: {},
  updateFinish: false,
  updateError: false,
  updateMessage: '',
  userInfo: {
    name: 'sdsad',
    email: '',
    avatar: '',
    gender: 1,
    birthDate: Date.now(),
    roles: [],
    address: '',
    phone: ''
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
          roles: action.payload.data.roles,
          address: action.payload.data.address,
          phone: action.payload.data.phone
        }
      });
    },
    [actions.updateUserInfo]: state => {
      return freeze({ ...state, isLoading: true });
    },
    [actions.updateUserInfoSuccess]: (state, action) => {
      return freeze({
        ...state,
        isLoading: false,
        updateFinish: true,
        updateError: false,
        updateMessage: 'Đã cập nhật thông tin tài khoản',
        userInfo: {
          name: action.payload.data.name,
          email: action.payload.data.email,
          avatar: action.payload.data.avatar,
          gender: action.payload.data.gender,
          birthDate: action.payload.data.birthDate,
          roles: action.payload.data.roles,
          address: action.payload.data.address,
          phone: action.payload.data.phone
        }
      });
    },
    [actions.updateUserInfoFail]: (state, action) => {
      return freeze({
        ...state,
        isLoading: false,
        updateFinish: true,
        updateError: true,
        updateMessage: 'Cập nhật thất bại'
      });
    },

    [actions.uploadImage]: (state, action) => {
      return freeze({
        ...state
      });
    },

    [actions.uploadImageFail]: (state, action) => {
      return freeze({
        ...state
      });
    },

    [actions.uploadImageSuccess]: (state, action) => {
      return freeze({
        ...state,
        userInfo: {
          ...state.userInfo,
          avatar: action.payload.data.url
        }
      });
    },

    [actions.updatePassword]: (state, action) => {
      return freeze({
        ...state,
        isPasswordLoading: true
      });
    },

    [actions.updatePasswordSuccess]: (state, action) => {
      return freeze({
        ...state,
        isPasswordLoading: false,
        updateFinish: true,
        updateError: false,
        updateMessage: 'Cập nhật mật khẩu thành công'
      });
    },

    [actions.updatePasswordFail]: (state, action) => {
      return freeze({
        ...state,
        isPasswordLoading: false,
        updateFinish: true,
        updateError: true,
        updateMessage: action.payload.message
      });
    },

    [actions.closeSnackbar]: (state, action) => {
      return freeze({
        ...state,
        updateFinish: false,
        updateError: false,
        updateMessage: ''
      });
    }
  },
  initialStates
);
