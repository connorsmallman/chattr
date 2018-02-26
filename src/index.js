import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state/create';
import ChattrApp from './containers/App';

const app = document.getElementById('app');
const store = configureStore();

render(
  <Provider store={store}>
    <ChattrApp />
  </Provider>,
  app
);