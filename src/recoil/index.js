import React, { useCallback } from 'react';
import {
  RecoilRoot,
  useRecoilState,
  useSetRecoilState,
  atom,
  selector,
} from 'recoil';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  createApp,
} from '../common';

const globalState = atom({
  key: 'globalState',
  default: initialState,
});

const countState = selector({
  key: 'countState',
  get: ({ get }) => selectCount(get(globalState)),
  set: ({ get, set }, action) => {
    set(globalState, reducer(get(globalState), action));
  },
});

const useCount = () => {
  const [count] = useRecoilState(countState);
  return count;
};

const useIncrement = () => {
  const dispatch = useSetRecoilState(countState);
  return useCallback(() => {
    dispatch(incrementAction);
  }, [dispatch]);
};

const Root = ({ children }) => (
  <RecoilRoot>
    {children}
  </RecoilRoot>
);

export default createApp(useCount, useIncrement, Root);
