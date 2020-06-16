import React from 'react';
import { createSimpluxModule, createMutations, createSelectors } from '@simplux/core';
import { SimpluxProvider, useSimplux } from '@simplux/react';

import {
  initialState,
  selectCount,
  createApp,
  COUNT_PER_DUMMY,
} from '../common';

const counterModule = createSimpluxModule({
  name: 'counter',
  initialState,
});

const counter = {
  ...counterModule,
  ...createMutations(counterModule, {
    increment(state) {
      state.dummy += 1;
      state.count += state.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1 ? 1 : 0;
    },
  }),
  ...createSelectors(counterModule, {
    value: (state) => selectCount(state),
  }),
};

const useCount = () => useSimplux(counter.value);

const useIncrement = () => () => counter.increment();

const Root = ({ children }) => (
  <SimpluxProvider>
    {children}
  </SimpluxProvider>
);

export default createApp(useCount, useIncrement, Root);
