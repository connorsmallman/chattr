import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { watchChat } from './sagas/chat';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = createLogger({
  collapsed: true
});

const reducer = compose()(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));
  
  sagaMiddleware.run(watchChat);

  return store;
}