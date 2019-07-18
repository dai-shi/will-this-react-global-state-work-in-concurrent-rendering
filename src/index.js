import React from 'react';
import ReactDOM from 'react-dom';

const name = window.location.hash.slice(1) || 'react-redux';
document.title = name;

// eslint-disable-next-line import/no-dynamic-require
const App = require(`./${name}`).default;

const root = ReactDOM.unstable_createRoot(document.getElementById('app'));
root.render(<App />);
