import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Autocomplete';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  mountNode
);
