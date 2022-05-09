import React from 'react';
import ReactDOM from 'react-dom';
import { Users } from './Users';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Users/>
  </React.StrictMode>,
  mountNode
);
