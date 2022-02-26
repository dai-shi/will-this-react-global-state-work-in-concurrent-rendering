import React, { createContext, useContext, useCallback } from "react";
import * as mobx from "mobx";
import * as mobxReact from "mobx-react";

import {
  createApp,
} from "../common";

const createStore = () => mobx.observable({ count: 0 });

const StateCtx = createContext();

const useCount = () => useContext(StateCtx).count;

const useIncrement = () => {
  const store = useContext(StateCtx);

  return useCallback(() => {
    mobx.runInAction(() => {
      store.count += 1;
    });
  }, [store]);
};

const useDouble = () => {
  const store = useContext(StateCtx);

  return useCallback(() => {
    mobx.runInAction(() => {
      store.count *= 2;
    });
  }, [store]);
};

const Root = ({ children }) => {
  const [state] = React.useState(() => createStore());
  return (
    <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
  );
};

export default createApp(
  useCount,
  useIncrement,
  useDouble,
  Root,
  mobxReact.observer,
);
