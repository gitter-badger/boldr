import * as constants from './role.constants';

const INITIAL_STATE = {
  isLoading: true
};

export default function role(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.LOAD_ROLES:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
