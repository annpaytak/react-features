import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Highchart, PowerBiChart } from './Charts';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    {/* <PowerBiChart /> */}
    <Chart />
    <Highchart />
  </React.StrictMode>,
  mountNode
);
