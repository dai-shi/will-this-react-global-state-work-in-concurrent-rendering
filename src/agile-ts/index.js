import React from 'react';
import { Agile, Logger } from '@agile-ts/core';
import reactIntegration, { useAgile } from '@agile-ts/react';

import { initialState, createApp, COUNT_PER_DUMMY } from '../common';

const App = new Agile({
  logConfig: { level: Logger.level.DEBUG, active: true },
}).integrate(reactIntegration);

const MY_COUNT = App.createState(initialState, { key: 'counter' });

const useCount = () => useAgile(MY_COUNT);

const useIncrement = () => () => {
  const currentStateValue = MY_COUNT.copy();
  MY_COUNT.patch({ count: currentStateValue.count * 2 });
};

const useDouble = () => () => {
  const currentStateValue = MY_COUNT.copy();
  MY_COUNT.patch({
    dummy: currentStateValue.dummy + 1,
    count:
      currentStateValue.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1
        ? currentStateValue.count + 1
        : currentStateValue.count,
  });
};

export default createApp(useCount, useIncrement, useDouble);
