import { get } from 'src/services/localStoredService';

export default () => {
  return !!get('accessToken');
};
