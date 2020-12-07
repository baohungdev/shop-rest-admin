import store from 'store';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const save = (name, value) => {
  if (name === undefined) throw new Error("Can't store value with name undefined");
  return store.set(name, value);
};

export const get = (name) => store.get(name);

export const remove = (name) => store.remove(name);

export const clearAll = () => {
  cookies.remove('accessToken');
  cookies.remove('refreshToken');
  cookies.remove('userInfo');
  store.clearAll();
};

export default {
  save,
  get,
  remove,
  clearAll,
};
