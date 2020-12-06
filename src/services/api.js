import axios from 'axios';
import _ from 'lodash-es';
import { save, get, clearAll } from './localStoredService';
import { history } from '../AppRenderer';
import config from '../config';

export const refresh = async (requestData, refreshToken, autoRequest = true) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${config.apiBaseURL}/users/refreshToken`,
      headers: { authorization: refreshToken, 'Content-Type': 'application/json' },
    });

    const { accessToken, refreshToken: newRefreshToken, userInfo } = response.data.payload;
    save('accessToken', accessToken);
    save('refreshToken', newRefreshToken);
    save('userInfo', userInfo);

    if (autoRequest) {
      const {
        endpoint, method, data, headerInput
      } = requestData;
      // eslint-disable-next-line no-use-before-define
      return await request({
        endpoint, method, data, headerInput, accessToken
      });
    }

    return response.data.payload;
  } catch (ex) {
    clearAll();
    return ex;
  }
};

export const handleRequestError = async (requestError, requestData) => {
  const errorStatusCode = _.get(requestError, 'response.status');
  const refreshToken = get('refreshToken');
  const message = _.get(requestError, 'response.data.message');

  if (errorStatusCode < 500 && errorStatusCode >= 400) {
    if (errorStatusCode === 404) {
      history.push('/error');
      return window.location.reload();
    }

    if (errorStatusCode === 401) {
      if (refreshToken) {
        // eslint-disable-next-line no-return-await
        return await refresh(requestData, refreshToken);
      }

      history.push('/user');
      return window.location.reload();
    }

    if (errorStatusCode === 403) {
      clearAll();
      return message;
    }

    return message;
  }

  if (errorStatusCode === 500) {
    history.push('/500');
    return window.location.reload();
  }

  return message;
};

export const request = async ({
  endpoint, method, data, headerInput, accessToken = null
}) => {
  try {
    let isDownloadFile = false;

    const getHeaders = (input) => {
      const token = accessToken || get('accessToken');
      const header = {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...input,
      };

      return header;
    };

    let options = {
      method,
      url: endpoint,
      headers: getHeaders(headerInput),
      data: method !== 'GET' ? data : null,
      params: method === 'GET' ? data : null,
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
    console.log(ex);
    await handleRequestError(ex);
    return ex;
  }
};
