import React, { useCallback, useReducer } from 'react';
import {
  createContext,
  useContextSelector,
} from 'use-context-selector';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const context = createContext(null);

const useCount = () => useContextSelector(context, (v) => selectCount(v[0]));

const useIncrement = () => {
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(
    () => dispatch(incrementAction),
    [dispatch],
  );
};

const useDouble = () => {
  const dispatch = useContextSelector(context, (v) => v[1]);
  return useCallback(
    () => dispatch(doubleAction),
    [dispatch],
  );
};

const Root = ({ children }) => (
  <context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </context.Provider>
);

export default createApp(useCount, useIncrement, useDouble, Root);
