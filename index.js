import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles.css";


let rootElement = document.getElementById("root");
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
  document.documentElement.style.height = '100%';
  document.body.style.margin = '0';
  document.body.style.height = '100%';
  rootElement.style.height = '100%';
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
  
      <App />
  

  </React.StrictMode>
);