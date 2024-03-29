import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/output.css";
import "./css/custom.css";
import "material-icons/iconfont/material-icons.css";
import 'material-symbols';
import reportWebVitals from "./reportWebVitals";



ReactDOM.createRoot(
  document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
