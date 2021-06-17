import React, { useCallback } from 'react';
import { createContainer } from 'react-tracked';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);

const {
  Provider: Root,
  useSelector,
  useUpdate: useDispatch,
} = createContainer(useValue, true);

const useCount = () => useSelector(selectCount);

const useIncrement = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

export default createApp(useCount, useIncrement, useDouble, Root);
