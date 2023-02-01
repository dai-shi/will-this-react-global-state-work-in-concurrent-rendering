import React, { useCallback } from 'react';
import {
  Provider,
  atom,
  useAtom,
  useSetAtom,
} from 'jotai';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
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
  const dispatch = useSetAtom(countState);
  return useCallback(() => {
    dispatch(incrementAction);
  }, [dispatch]);
};

const useDouble = () => {
  const dispatch = useSetAtom(countState);
  return useCallback(() => {
    dispatch(doubleAction);
  }, [dispatch]);
};

const Root = ({ children }) => (
  <Provider>
    {children}
  </Provider>
);

export default createApp(useCount, useIncrement, useDouble, Root);
