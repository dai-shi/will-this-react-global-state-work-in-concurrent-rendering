import React, { useCallback } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import {
  reducer,
  selectCount,
  incrementAction,
  createApp,
} from '../common';

const store = createStore(reducer);

const useCount = () => useSelector(selectCount);

const useIncrement = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const Root = ({ children }) => <Provider store={store}>{children}</Provider>;

export default createApp(useCount, useIncrement, Root);
