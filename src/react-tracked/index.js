import React, { useCallback } from 'react';
import { createContainer } from 'react-tracked';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  createApp,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);

const {
  Provider: Root,
  useSelector,
  useUpdate: useDispatch,
} = createContainer(useValue);

const useCount = () => useSelector(selectCount);

const useIncrement = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

export default createApp(useCount, useIncrement, Root);
