import * as constants from './collection.constants';

const INITIAL_STATE = {
  isLoading: true
};

export default function collection(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.LOAD_COLLECTIONS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
