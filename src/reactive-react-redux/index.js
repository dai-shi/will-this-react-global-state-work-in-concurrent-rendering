import { useCallback } from 'react';
import { createStore } from 'redux';
import { patchStore, useSelector } from 'reactive-react-redux';

import {
  reducer,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const store = patchStore(createStore(reducer));

const useCount = () => useSelector(store, selectCount);

const useIncrement = () => {
  const { dispatch } = store;
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const { dispatch } = store;
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

export default createApp(useCount, useIncrement, useDouble);
