import React, { useCallback } from 'react';
import { createStore } from 'redux';
import { RecoilRoot } from 'recoil';
import { ReduxTunnel, useReduxSelector as useSelector, useReduxDispatch as useDispatch } from 'recoil-toolkit';

import {
  reducer,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const store = createStore(reducer);

const useCount = () => useSelector(selectCount);

const useIncrement = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

const Root = ({ children }) => (
  <RecoilRoot>
    <ReduxTunnel reduxStore={store}>{children}</ReduxTunnel>
  </RecoilRoot>
);

export default createApp(useCount, useIncrement, useDouble, Root);
