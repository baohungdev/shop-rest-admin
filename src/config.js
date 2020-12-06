import { get } from 'lodash-es';

const env = {
  dev: {
    apiBaseURL: 'https://blackpingstore.azurewebsites.net',
  }
};

const currentEnv = get(process.env, 'REACT_APP_NODE_ENV', 'dev');

export default {
  ...env[currentEnv]
};
