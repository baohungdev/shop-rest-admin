import config from '../config';
import { request } from '../services/api';

const baseEndpoint = `${config.apiBaseURL}`;

export const fetchUserInfo = async data => {
  const endpoint = `${baseEndpoint}/user/me`;
  const response = await request({ endpoint, method: 'GET', data });
  return response;
};

export const updateUserInfo = async data => {
  const endpoint = `${baseEndpoint}/user/me`;
  const response = await request({ endpoint, method: 'PUT', data });
  return response;
};
