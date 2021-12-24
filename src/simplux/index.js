import React from 'react';
import { createSimpluxModule, createMutations, createSelectors } from '@simplux/core';
import { SimpluxProvider, useSimplux } from '@simplux/react';

import {
  initialState,
  selectCount,
  createApp,
} from '../common';

const counterModule = createSimpluxModule({
  name: 'counter',
  initialState,
});

const counter = {
  ...counterModule,
  ...createMutations(counterModule, {
    increment(state) {
      state.count += 1;
    },
    double(state) {
      state.count *= 2;
    },
  }),
  ...createSelectors(counterModule, {
    value: (state) => selectCount(state),
  }),
};

const useCount = () => useSimplux(counter.value);

const useIncrement = () => () => counter.increment();

const useDouble = () => () => counter.double();

const Root = ({ children }) => (
  <SimpluxProvider>
    {children}
  </SimpluxProvider>
);

export default createApp(useCount, useIncrement, useDouble, Root);
