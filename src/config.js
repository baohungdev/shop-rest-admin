import { get } from 'lodash-es';

const env = {
  dev: {
    apiBaseURL: 'https://blackping.azurewebsites.net',
    apiLocationBaseURL: 'https://dc.tintoc.net/app/api-customer/public'
  }
};

const currentEnv = get(process.env, 'REACT_APP_NODE_ENV', 'dev');

export default {
  ...env[currentEnv]
};
