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

axios.defaults.baseURL = 'https://myt-cab2165.herokuapp.com';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

