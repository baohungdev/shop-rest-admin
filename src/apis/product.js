import config from '../config';
import { request } from '../services/api';

const baseEndpoint = `${config.apiBaseURL}`;

// eslint-disable-next-line import/prefer-default-export
export const fetchProductList = async data => {
  const endpoint = `${baseEndpoint}/product`;
  const response = await request({ endpoint, method: 'GET', data });
  return response;
};
