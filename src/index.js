import React from 'react';
import ReactDOM from 'react-dom';

const name = process.env.NAME || window.location.pathname.slice(1) || 'react-redux';
document.title = name;

// eslint-disable-next-line import/no-dynamic-require
const App = require(`./${name}`).default;

const root = ReactDOM.unstable_createRoot(document.getElementById('app'));
root.render(<App />);
