import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { watchChat } from './sagas/chat';

const sagaMiddleware = createSagaMiddleware();
const reducer = compose()(rootReducer);
const middlewares = [
  sagaMiddleware
];

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, applyMiddleware(...middlewares));
  
  sagaMiddleware.run(watchChat);

  return store;
}