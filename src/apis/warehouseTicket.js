import config from '../config';
import { request } from '../services/api';
import _get from 'lodash/get';

const baseEndpoint = `${config.apiBaseURL}/warehouseTransaction`;

export const fetchWarehouseTransactions = async ({ fetchParam, ...query }) => {
  const endpoint = `${baseEndpoint}`;
  const response = await request({
    endpoint,
    method: 'GET',
    data: {
      page: Number(_get(fetchParam, 'page', 0)) + 1,
      perpage: _get(fetchParam, 'perpage', 20),
      ...query
    }
  });
  return response;
};

export const fetchManufacturers = async () => {
  const endpoint = `${baseEndpoint}/manufacturers`;
  const response = await request({
    endpoint,
    method: 'GET'
  });
  return response;
};

export const fetchProducts = async () => {
  const endpoint = `${baseEndpoint}/products`;
  const response = await request({
    endpoint,
    method: 'GET'
  });
  return response;
};

export const createNewWarehouseTransaction = async newWarehouseTransaction => {
  const endpoint = `${baseEndpoint}`;
  const response = await request({
    endpoint,
    method: 'POST',
    data: newWarehouseTransaction
  });
  return response;
};
