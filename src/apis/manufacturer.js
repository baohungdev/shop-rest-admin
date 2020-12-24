import config from '../config';
import { request } from '../services/api';
import _get from 'lodash/get';

const baseEndpoint = `${config.apiBaseURL}/manufacturer`;

export const fetchAllManufacturer = async ({ fetchParam, ...query }) => {
  const response = await request({
    endpoint: baseEndpoint,
    method: 'GET',
    data: {
      page: Number(_get(fetchParam, 'page', 1)) + 1,
      perpage: _get(fetchParam, 'perpage', 20),
      ...query
    }
  });
  return response;
};

export const updateManufacturer = async data => {
  const response = await request({
    endpoint: baseEndpoint,
    method: 'PUT',
    data
  });
  return response;
};

export const createManufacturer = async data => {
  const response = await request({
    endpoint: baseEndpoint,
    method: 'POST',
    data
  });
  return response;
};

export const getOneManufacturer = async manufacturerId => {
  const response = await request({
    endpoint: `${baseEndpoint}/${manufacturerId}`,
    method: 'GET',
    data: {}
  });
  return response;
};

export const deleteManufacturer = async manufacturerId => {
  const response = await request({
    endpoint: `${baseEndpoint}/${manufacturerId}`,
    method: 'DELETE'
  });
  return response;
};
