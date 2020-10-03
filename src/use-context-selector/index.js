import React, { useCallback } from 'react';
import { createContext, useContext, useContextUpdate } from 'use-context-selector';

import {
  reducer,
  initialState,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const context = createContext(null);

const useCount = () => useContext(context, useCallback((v) => v[0].count, []));

const useIncrement = () => {
  const update = useContextUpdate(context);
  const dispatch = useContext(context, useCallback((v) => v[1], []));
  return useCallback(
    () => update(() => dispatch(incrementAction)),
    [update, dispatch],
  );
};

const useDouble = () => {
  const update = useContextUpdate(context);
  const dispatch = useContext(context, useCallback((v) => v[1], []));
  return useCallback(
    () => update(() => dispatch(doubleAction)),
    [update, dispatch],
  );
};

const Root = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <context.Provider value={[state, dispatch]}>
      {children}
    </context.Provider>
  );
};

export default createApp(useCount, useIncrement, useDouble, Root);
