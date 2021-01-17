import React, { useCallback } from 'react';
import createUseContext from 'constate';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);
const [Root, useValueContext] = createUseContext(useValue);

const useCount = () => {
  const [state] = useValueContext();
  return selectCount(state);
};

const useIncrement = () => {
  const [, dispatch] = useValueContext();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const [, dispatch] = useValueContext();
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

export default createApp(useCount, useIncrement, useDouble, Root);
