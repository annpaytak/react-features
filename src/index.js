import React from 'react';
import ReactDOM from 'react-dom';
import { Posts } from './Posts';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Posts/>
  </React.StrictMode>,
  mountNode
);
