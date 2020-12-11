import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import makeRootReducer from './reducers';
import sagas from './sagas';

const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const history = isServer
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  routerMiddleware(history),
  loadingBarMiddleware()
];

const createSagaInjector = (runSaga, rootSaga) => {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  const isInjected = key => injectedSagas.has(key);
  const injectSaga = (key, saga) => {
    if (isInjected(key)) return;
    const task = runSaga(saga);
    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  // Inject the root saga as it a staticlly loaded file,
  injectSaga(runSaga, rootSaga);

  return injectSaga;
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const rootReducer = connectRouter(history)(makeRootReducer(history));

const persistConfig = {
  key: 'userInfo',
  storage,
  whiteList: ['Login']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = initialState => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  store.asyncReducers = {};
  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(makeRootReducer(history, store.asyncReducers));
  };

  store.injectSaga = createSagaInjector(sagaMiddleware.run, sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(sagas);

  return { store, history, persistor };
};
