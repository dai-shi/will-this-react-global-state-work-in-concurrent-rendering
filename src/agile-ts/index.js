import React from 'react';
import { Agile, Logger } from '@agile-ts/core';
import reactIntegration, { useAgile } from '@agile-ts/react';

import {
  initialState,
  createApp, reducer, doubleAction, incrementAction,
} from '../common';

const AgileApp = new Agile({
  logConfig: { level: Logger.level.DEBUG, active: true },
}).integrate(reactIntegration);

const MY_COUNT = AgileApp.createState(initialState, { key: 'counter' });

const useCount = () => useAgile(MY_COUNT).count;

const useDouble = () => () => {
  const currentStateValue = MY_COUNT.copy();
  const nextValue = reducer(currentStateValue, doubleAction);
  MY_COUNT.patch(nextValue);
};

const useIncrement = () => () => {
  const currentStateValue = MY_COUNT.copy();
  const nextValue = reducer(currentStateValue, incrementAction);
  MY_COUNT.patch(nextValue);
};

export default createApp(useCount, useIncrement, useDouble);
