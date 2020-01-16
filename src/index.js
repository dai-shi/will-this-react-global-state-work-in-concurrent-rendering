import React from 'react';
import ReactDOM from 'react-dom';

let name;
let App;

if (process.env.NAME) {
  name = process.env.NAME;
  // eslint-disable-next-line import/no-dynamic-require, global-require
  App = require(`./${process.env.NAME}`).default;
} else {
  name = window.location.pathname.slice(1) || 'react-redux';
  // eslint-disable-next-line import/no-dynamic-require, global-require
  App = require(`./${name}`).default;
}

document.title = name;

// concurrent mode
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

// sync mode
// ReactDOM.render(<App />, document.getElementById('app'));
