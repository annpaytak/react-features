import React from 'react';
import ReactDOM from 'react-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import { Posts, Comments } from './features';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Posts/>
      <Comments/>
    </Provider>
  </React.StrictMode>,
  mountNode
);
