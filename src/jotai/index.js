import React, { useCallback } from 'react';
import { Provider, atom, useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  createApp,
} from '../common';

const globalState = atom(initialState);

const countState = atom(
  (get) => selectCount(get(globalState)),
  (get, set, action) => {
    set(globalState, reducer(get(globalState), action));
  },
);

const useCount = () => {
  const [count] = useAtom(countState);
  return count;
};

const useIncrement = () => {
  const dispatch = useUpdateAtom(countState);
  return useCallback(() => {
    dispatch(incrementAction);
  }, [dispatch]);
};

const Root = ({ children }) => (
  <Provider>
    {children}
  </Provider>
);

export default createApp(useCount, useIncrement, Root);
