import axios from 'axios';
import _ from 'lodash-es';
import moment from 'moment';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { save, get, clearAll } from './localStoredService';
import { history, store } from '../AppRenderer';
import config from '../config';
import ApiErrorCode from 'src/constants/apiErrorCode';

export const refresh = async (
  requestData,
  refreshToken,
  autoRequest = true
) => {
  try {
    let newAccessToken, serverResponse;
    // check for newly-updated session
    if (moment().isAfter(moment(get('expiredAt')))) {
      const response = await axios({
        method: 'POST',
        url: `${config.apiBaseURL}/user/refresh`,
        data: {
          refreshToken,
          email: get('userInfo').email
        }
      });

      const { data: body } = response;

      if (!body.success) {
        throw new Error(body.message);
      }

      const {
        accessToken,
        refreshToken: newRefreshToken,
        expiredAt
      } = response.data.payload;

      newAccessToken = accessToken;
      serverResponse = response;

      save('refreshToken', newRefreshToken);
      save('accessToken', accessToken);
      save('expiredAt', expiredAt);
    } else {
      newAccessToken = get('accessToken');
      // fake response from server
      serverResponse = {
        data: {
          payload: {
            accessToken: get('accessToken'),
            refreshToken: get('refreshToken'),
            expiredAt: get('expiredAt')
          },
          success: true
        }
      };
    }

    if (autoRequest) {
      const { endpoint, method, data, headerInput } = requestData;
      // eslint-disable-next-line no-use-before-define
      return await request({
        endpoint,
        method,
        data,
        headerInput,
        accessToken: newAccessToken
      });
    }

    return serverResponse.data;
  } catch (ex) {
    clearAll();
    history.push('/');
    return ex;
  }
};

export const handleRequestError = async (requestError, requestData) => {
  const errorStatusCode = _.get(requestError, 'response.status');
  console.log('errorStatusCode', errorStatusCode);
  console.log(
    'header',
    _.get(requestError, 'response.headers')['token-expired']
  );
  const refreshToken = get('refreshToken');
  const responseData = _.get(requestError, 'response.data');

  if (errorStatusCode < 500 && errorStatusCode >= 400) {
    if (errorStatusCode === 404) {
      if (_.isEmpty(responseData)) {
        history.push('/error');
        return window.location.reload();
      }
    }

    if (errorStatusCode === 401) {
      const isTokenExpired =
        _.get(requestError, 'response.headers.token-expired') === 'true';
      console.log('isTokenExpired', isTokenExpired);
      if (refreshToken && isTokenExpired) {
        // eslint-disable-next-line no-return-await
        return await refresh(requestData, refreshToken);
      }

      history.push('/error');
      return window.location.reload();
    }

    if (errorStatusCode === 403) {
      clearAll();
      return responseData;
    }

    return responseData;
  }

  if (errorStatusCode === 500) {
    history.push('/500');
    return window.location.reload();
  }

  return responseData;
};

export const request = async ({
  endpoint,
  method,
  data,
  headerInput,
  accessToken = null
}) => {
  try {
    if (`${method}`.toUpperCase() === 'GET') {
      store.dispatch(showLoading());
    }
    let isDownloadFile = false;

    const getHeaders = input => {
      const token = accessToken || get('accessToken');
      const header = {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...input
      };

      return header;
    };

    let options = {
      method,
      url: endpoint,
      headers: getHeaders(headerInput),
      data: method !== 'GET' ? data : null,
      params: method === 'GET' ? data : null
    };

    if (endpoint.includes('download')) {
      options = { ...options, responseType: 'blob' };
      isDownloadFile = true;
    }

    const response = await axios(options);

    if (!isDownloadFile) {
      return response.data;
    }

    const fileName = _.get(data, 'fileName', 'download');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}`);
    document.body.appendChild(link);
    link.click();

    return null;
  } catch (ex) {
    return await handleRequestError(ex);
  } finally {
    store.dispatch(hideLoading());
  }
};
