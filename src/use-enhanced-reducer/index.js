import React, { useCallback, createContext, useContext } from 'react';
import useEnhancedReducer from '@rest-hooks/use-enhanced-reducer';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const stateContext = createContext(null);
const dispatchContext = createContext(() => { throw new Error('set this context value'); });

const useCount = () => selectCount(useContext(stateContext));

const useIncrement = () => {
  const dispatch = useContext(dispatchContext);
  return useCallback(() => dispatch(incrementAction), [dispatch]);
};

const useDouble = () => {
  const dispatch = useContext(dispatchContext);
  return useCallback(() => dispatch(doubleAction), [dispatch]);
};

const Root = ({ children }) => {
  const [state, dispatch] = useEnhancedReducer(reducer, initialState, []);
  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

export default createApp(useCount, useIncrement, useDouble, Root);
