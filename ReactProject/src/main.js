/* eslint-disable */

import jquery from "jquery";
window.$ = window.jQuery = jquery;

import React from "react";
import ReactDom from "react-dom";
import { HashRouter } from "react-router-dom";
import { runWithAdal } from 'react-adal';
import { authContext } from './adalConfig.js';

import App from "./components/App.js";

const DO_NOT_LOGIN = false;

runWithAdal(authContext, () => {
    ReactDom.render(
        <HashRouter>
            <App />
        </HashRouter>,
        document.getElementById("app")
    );
}, DO_NOT_LOGIN);
