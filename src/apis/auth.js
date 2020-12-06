import config from '../config';
import { request } from '../services/api';

const baseEndpoint = `${config.apiBaseURL}`;

// eslint-disable-next-line import/prefer-default-export
export const emailLogin = (data) => {
  const endPoint = `${baseEndpoint}/users/login`;
  return request(endPoint, 'POST', data);
};
