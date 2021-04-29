import React from 'react';
import { Agile } from '@agile-ts/core';
import reactIntegration, { useAgile } from '@agile-ts/react';

import {
  initialState,
  createApp,
  reducer,
  doubleAction,
  incrementAction,
} from '../common';

const AgileApp = new Agile({
  logConfig: { active: false },
}).integrate(reactIntegration);

const MY_COUNT = AgileApp.createState(initialState, { key: 'counter' });

const useCount = () => useAgile(MY_COUNT).count;

const useDouble = () => () => {
  // Used the inbuilt reducer for simplicity. However, AgileTs normally doesn't need any reducers!
  MY_COUNT.patch(reducer(MY_COUNT.copy(), doubleAction));
};

const useIncrement = () => () => {
  // Used the inbuilt reducer for simplicity. However, AgileTs normally doesn't need any reducers!
  MY_COUNT.patch(reducer(MY_COUNT.copy(), incrementAction));
};

export default createApp(useCount, useIncrement, useDouble);
