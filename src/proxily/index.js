import { useCallback } from 'react';
import {
  observable,
  observer,
  useObservableTransition,
} from 'proxily';
import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const state = observable(initialState);

const useCount = () => selectCount(state);

const useIncrement = () => useCallback(() => {
  const newState = reducer(state, incrementAction);
  Object.keys(newState).forEach((key) => {
    if (state[key] !== newState[key]) {
      state[key] = newState[key];
    }
  });
}, []);

const useDouble = () => useCallback(() => {
  const newState = reducer(state, doubleAction);
  Object.keys(newState).forEach((key) => {
    if (state[key] !== newState[key]) {
      state[key] = newState[key];
    }
  });
}, []);

export default observer(createApp(useCount, useIncrement, useDouble, undefined,
  useObservableTransition, observer));
