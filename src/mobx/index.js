import * as React from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const StateContext = React.createContext(null);

const useStateContext = () => React.useContext(StateContext);

const useCount = () => {
  return useStateContext().count
};

const useIncrement = () => {
  const state = useStateContext();
  return React.useCallback(mobx.action(() => {
    state.count = reducer(incrementAction).count;
  }), []);
};

const useDouble = () => {
  const state = useStateContext();
  return React.useCallback(mobx.action(() => {
    state.count = reducer(doubleAction).count;
  }), []);
};

const Root = mobxReact.observer(({ children }) => {
  const state = mobxReact.useLocalObservable(() => ({ ...initialState }));
  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
});

export default createApp(useCount, useIncrement, useDouble, Root, mobxReact.observer);
