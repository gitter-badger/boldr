import * as types from './user.constants';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookie';

const persistUser = (user) => {
  localStorage.setItem(types.LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const storedUser = localStorage.getItem(types.LOCAL_STORAGE_KEY);
  let user;

  if (storedUser) {
    user = JSON.parse(storedUser);
  } else {
    user = '';
  }

  return user;
};
export function partialPopulateUser() {
  const jwt = localStorage.getItem('boldr:jwt') || cookie.load('boldr:jwt');
  const user = jwtDecode(jwt);
  return {
    type: types.PARTIAL_POPULATE_USER,
    user
  };
}
