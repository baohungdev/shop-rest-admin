import config from '../config';
import { request } from '../services/api';

const baseEndpoint = `${config.apiBaseURL}`;

// eslint-disable-next-line import/prefer-default-export
export const fetchUserInfo = async data => {
  const endpoint = `${baseEndpoint}/user/me`;
  const response = await request({ endpoint, method: 'GET', data });
  return response;
};
