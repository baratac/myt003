import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Provider } from "react-redux";
import store from "./store"

import 'jquery/src/jquery'; //for bootstrap.min.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://myt-cab2165.herokuapp.com';
} else {
  axios.defaults.baseURL = 'http://localhost:5000';
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

