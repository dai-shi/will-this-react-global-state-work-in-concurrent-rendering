import React, { useCallback } from 'react';
import createUseContext from 'constate';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
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

export default createApp(useCount, useIncrement, Root);
