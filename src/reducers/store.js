import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import appState from './index';

const middlewares = [thunk];

export default function configureStore() {
  const store = createStore(
    appState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middlewares), autoRehydrate())
  );

  persistStore(store, {
    blacklist: ['context']
  });

  return store;
}
