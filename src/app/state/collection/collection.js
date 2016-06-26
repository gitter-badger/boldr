const LOAD_COLLECTIONS = '@@collections/LOAD_COLLECTIONS';

const INITIAL_STATE = {
  isLoading: true
};

export default function collection(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_COLLECTIONS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
