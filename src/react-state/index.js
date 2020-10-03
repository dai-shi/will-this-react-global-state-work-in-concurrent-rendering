import React, { createContext, useContext, useCallback } from 'react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const StateCtx = createContext();
const DispatchCtx = createContext();

const useCount = () => selectCount(useContext(StateCtx));

const useIncrement = () => {
  const dispatch = useContext(DispatchCtx);
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useContext(DispatchCtx);
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

const Root = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <DispatchCtx.Provider value={dispatch}>
      <StateCtx.Provider value={state}>
        {children}
      </StateCtx.Provider>
    </DispatchCtx.Provider>
  );
};

export default createApp(useCount, useIncrement, useDouble, Root);
