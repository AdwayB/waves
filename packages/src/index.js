import { jsx as _jsx } from 'react/jsx-runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'core-js';
import 'regenerator-runtime/runtime';
import { App } from './App';
import './styles/global.scss';
ReactDOM.createRoot(document.getElementById('root')).render(
  _jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }),
);
