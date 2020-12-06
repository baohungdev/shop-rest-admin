/* eslint-disable no-unused-vars */

import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import AppRenderer from './AppRenderer';

// eslint-disable-next-line global-require
const render = () => import('./AppRenderer.js');
render();
