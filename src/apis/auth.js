import config from '../config';
import { request } from '../services/api';

const baseEndpoint = `${config.apiBaseURL}`;

// eslint-disable-next-line import/prefer-default-export
export const emailLogin = async data => {
  const endpoint = `${baseEndpoint}/user/login`;
  const response = await request({ endpoint, method: 'POST', data });
  return response;
};
