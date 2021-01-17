import React, { useCallback } from 'react';
import { createStoreon } from 'storeon';
import { useStoreon, StoreContext } from 'storeon/react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const counter = (store) => {
  store.on('@init', () => initialState);
  store.on('dispatch', reducer);
};

const store = createStoreon([counter]);

const useCount = () => selectCount(useStoreon('count'));

const useIncrement = () => {
  const { dispatch } = useStoreon('count');
  return useCallback(() => dispatch('dispatch', incrementAction), [dispatch]);
};

const useDouble = () => {
  const { dispatch } = useStoreon('count');
  return useCallback(() => dispatch('dispatch', doubleAction), [dispatch]);
};

const Root = ({ children }) => (
  <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
);

export default createApp(useCount, useIncrement, useDouble, Root);
