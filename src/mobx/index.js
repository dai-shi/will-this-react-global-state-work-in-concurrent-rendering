import React, { createContext, useContext, useCallback } from "react";
import * as mobx from "mobx";
import * as mobxReact from "mobx-react";

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from "../common";

const createStore = () => mobx.observable({ count: 0 });

const StateCtx = createContext();
const DispatchCtx = createContext();

const useCount = () => useContext(StateCtx).count;

const useIncrement = () => {
  const store = useContext(StateCtx);

  return useCallback(() => {
    mobx.runInAction(() => {
      console.log('at this point')
      console.log(store)
      store.count++;
    });
  }, [store]);
};

const useDouble = () => {
  const store = useContext(StateCtx);

  return useCallback(() => {
    mobx.runInAction(() => {
      store.count = store.count * 2;
    });
  }, [store]);
};

const Root = ({ children }) => {
  const [state] = React.useState(() => createStore());
  return (
    // <DispatchCtx.Provider value={dispatch}>
    <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
    // </DispatchCtx.Provider>
  );
};

export default createApp(
  useCount,
  useIncrement,
  useDouble,
  Root,
  mobxReact.observer,
);
