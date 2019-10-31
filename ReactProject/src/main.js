/* eslint-disable */

import jquery from 'jquery';
window.$ = window.jQuery=jquery;


import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';

import {App} from './components/App.js';

ReactDom.render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('app'));
  