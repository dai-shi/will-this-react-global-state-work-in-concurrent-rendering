import React, { useCallback } from 'react';
import {
  Provider,
  useAtom,
  useAtomUpdate,
  createAtom,
  deriveAtom,
} from 'use-atom';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  createApp,
} from '../common';

const globalState = createAtom({
  default: initialState,
});

const countState = deriveAtom({
  get: ({ get }) => selectCount(get(globalState)),
  set: ({ get, set }, action) => {
    set(globalState, reducer(get(globalState), action));
  },
});

const useCount = () => {
  const [count] = useAtom(countState);
  return count;
};

const useIncrement = () => {
  const dispatch = useAtomUpdate(countState);
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
