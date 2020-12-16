import config from '../config';
import { request } from '../services/api';
import _get from 'lodash/get';

const baseEndpoint = `${config.apiBaseURL}`;

export const fetchProductList = async data => {
  const endpoint = `${baseEndpoint}/product`;
  const response = await request({ endpoint, method: 'GET', data });
  return response;
};

export const searchProduct = async ({ search, fetchParam, ...query }) => {
  const endpoint = `${baseEndpoint}/product`;
  const response = await request({
    endpoint,
    method: 'GET',
    data: {
      name: search,
      page: _get(fetchParam, 'page', 1),
      perpage: _get(fetchParam, 'perpage', 20),
      ...query
    }
  });
  return response;
};

export const fetchProductDetail = async id => {
  const endpoint = `${baseEndpoint}/product/${id}`;
  const response = await request({
    endpoint,
    method: 'GET'
  });
  return response;
};
