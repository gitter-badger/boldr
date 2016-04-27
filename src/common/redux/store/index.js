let store;

if (__DEV__) {
  store = require('./configureStore.dev').default;
} else {
  store = require('./configureStore.prod').default;
}

export default store;
