import * as types from './user.constants';

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

export const setUser = (user) => {
  persistUser(user);

  return {
    type: types.SET_USER,
    user
  };
};

export const clearUser = () => {
  persistUser(null);

  return {
    type: types.CLEAR_USER,
    user: undefined
  };
};
