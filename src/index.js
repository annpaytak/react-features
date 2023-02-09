import React from "react";
import ReactDOM from "react-dom";
import { Counter } from "./Counter";

const mountNode = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  mountNode
);
