import config from '../config';
import { request } from '../services/api';
import qs from 'qs';
import _get from 'lodash/get';

const baseEndpoint = `${config.apiBaseURL}`;

export const getAllCarts = async ({ fetchParam, ...query }) => {
  const endpoint = `${baseEndpoint}/baskets`;
  const response = await request({
    endpoint,
    method: 'GET',
    paramsSerializer: params => qs.stringify(params, { indices: false }),
    data: {
      page: _get(fetchParam, 'page', 0) + 1,
      perpage: _get(fetchParam, 'perpage', 20),
      ...query
    }
  });
  return response;
};

export const getCartDetail = async ({ id }) => {
  const endpoint = `${baseEndpoint}/baskets/${id}`;
  const response = await request({
    endpoint,
    method: 'GET'
  });
  return response;
};
