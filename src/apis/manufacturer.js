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
