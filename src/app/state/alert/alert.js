// Action Types
const CREATE_ALERT = 'CREATE_ALERT';
const DELETE_ALERT = 'DELETE_ALERT';

// Action Functions
const createAlert = (response, kind) => {
  return {
    type: CREATE_ALERT,
    payload: {
      hasAlert: true,
      message: response.errorMessage,
      kind
    }
  };
};

const deleteAlert = () => {
  return {
    type: DELETE_ALERT,
    payload: { hasAlert: false }
  };
};

const INITIAL_STATE = {
  hasAlert: false,
  message: '',
  kind: ''
};

// Reducer
export default function alert(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_ALERT:
      return action.payload;

    case DELETE_ALERT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export { createAlert, deleteAlert };
