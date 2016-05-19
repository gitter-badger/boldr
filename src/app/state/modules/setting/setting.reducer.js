import * as constants from './setting.constants';

const INITIAL_STATE = {
  isLoading: true
};

export default function setting(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.LOAD_SETTINGS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
