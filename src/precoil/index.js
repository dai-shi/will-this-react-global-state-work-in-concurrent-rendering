import React, { useCallback } from 'react';
import { atom, useAtomValue, useSetAtomState } from '@mntm/precoil';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const countState = atom(initialState);

const useCount = () => selectCount(useAtomValue(countState));

const useIncrement = () => {
  const dispatch = useSetAtomState(countState);
  return useCallback(() => {
    dispatch((state) => reducer(state, incrementAction));
  }, [dispatch]);
};

const useDouble = () => {
  const dispatch = useSetAtomState(countState);
  return useCallback(() => {
    dispatch((state) => reducer(state, doubleAction));
  }, [dispatch]);
};

const Root = React.Fragment;

export default createApp(useCount, useIncrement, useDouble, Root);
