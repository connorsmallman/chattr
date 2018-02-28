import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { watchChat } from './sagas/chat';

const loggerMiddleware = createLogger({
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware();
const reducer = compose()(rootReducer);
const middlewares = [
  sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, applyMiddleware(...middlewares));
  
  sagaMiddleware.run(watchChat);

  return store;
}