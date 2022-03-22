import React from 'react';
import { createRoot } from 'react-dom/client';

const name = process.env.NAME || window.location.pathname.slice(1) || 'react-redux';

// eslint-disable-next-line import/no-dynamic-require
const App = require(`./${name}`).default;

document.title = name;

// concurrent mode
const root = createRoot(document.getElementById('app'));
root.render(<App />);

// sync mode
// ReactDOM.render(<App />, document.getElementById('app'));
