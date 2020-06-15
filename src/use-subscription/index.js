import { useMemo } from 'react';
import { createStore } from 'redux';
import { useSubscription } from 'use-subscription';

import {
  reducer,
  selectCount,
  incrementAction,
  createApp,
} from '../common';

const store = createStore(reducer);

const useCount = () => {
  const count = useSubscription(useMemo(() => ({
    getCurrentValue: () => selectCount(store.getState()),
    subscribe: (callback) => store.subscribe(callback),
  }), []));
  return count;
};

const useIncrement = () => () => store.dispatch(incrementAction);

export default createApp(useCount, useIncrement);
