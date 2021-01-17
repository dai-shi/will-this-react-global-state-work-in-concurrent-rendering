import { useCallback } from 'react';
import { proxy, useProxy } from 'valtio';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const state = proxy(initialState);

const useCount = () => selectCount(useProxy(state));

const useIncrement = () => useCallback(() => {
  const newState = reducer(state, incrementAction);
  Object.keys(newState).forEach((key) => {
    state[key] = newState[key];
  });
}, []);

const useDouble = () => useCallback(() => {
  const newState = reducer(state, doubleAction);
  Object.keys(newState).forEach((key) => {
    state[key] = newState[key];
  });
}, []);

export default createApp(useCount, useIncrement, useDouble);
