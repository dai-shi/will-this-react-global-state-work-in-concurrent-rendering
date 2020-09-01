import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { useLocalStore } from 'mobx-react-lite';
import * as mobx from 'mobx';
import { useSubscription } from 'use-subscription';

import {
  initialState,
  selectCount,
  createApp,
  COUNT_PER_DUMMY,
} from '../common';

const Ctx = createContext();

const useCount = () => {
  const store = useContext(Ctx);
  return useSubscription(useMemo(() => ({
    getCurrentValue: () => selectCount(store),
    subscribe: (cb) => mobx.autorun(cb),
  }), [store]));
};

const useIncrement = () => {
  const store = useContext(Ctx);
  return useCallback(() => {
    store.dummy += 1;
    if (store.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1) {
      store.count += 1;
    }
  }, [store]);
};

const Root = ({ children }) => {
  const store = useLocalStore(() => initialState);
  return (
    <Ctx.Provider value={store}>
      {children}
    </Ctx.Provider>
  );
};

export default createApp(useCount, useIncrement, Root);
