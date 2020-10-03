import { useCallback } from 'react';
import { createStore, createHook } from 'react-sweet-state';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const Store = createStore({
  initialState,
  actions: {
    dispatch: (action) => ({ setState, getState }) => {
      setState(reducer(getState(), action));
    },
  },
});

const useCounter = createHook(Store);

const useCount = () => {
  const [state] = useCounter();
  return selectCount(state);
};

const useIncrement = () => {
  const [, actions] = useCounter();
  return useCallback(() => actions.dispatch(incrementAction), [actions]);
};

const useDouble = () => {
  const [, actions] = useCounter();
  return useCallback(() => actions.dispatch(doubleAction), [actions]);
};

export default createApp(useCount, useIncrement, useDouble);
