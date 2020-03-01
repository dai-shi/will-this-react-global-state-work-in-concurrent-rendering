import React, { useTransition, createContext, useContext } from 'react';
import useEnhancedReducer from '@rest-hooks/use-enhanced-reducer';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const stateContext = createContext(null);
const dispatchContext = createContext(() => { throw new Error('set this context value'); });

const Provider = ({ children }) => {
  const [state, dispatch] = useEnhancedReducer(reducer, initialState, []);
  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

const Counter = React.memo(() => {
  const { count } = useContext(stateContext);
  syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const dispatch = useContext(dispatchContext);
  const { count } = useContext(stateContext);
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  const [localCount, localIncrement] = React.useReducer((c) => c + 1, 0);
  const normalIncrement = () => {
    dispatch({ type: 'increment' });
  };
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      dispatch({ type: 'increment' });
    });
  };
  return (
    <div>
      <button type="button" id="normalIncrement" onClick={normalIncrement}>Increment shared count normally (two clicks to increment one)</button>
      <button type="button" id="transitionIncrement" onClick={transitionIncrement}>Increment shared count in transition (two clicks to increment one)</button>
      <span id="pending">{isPending && 'Pending...'}</span>
      <h1>Shared Count</h1>
      {ids.map((id) => <Counter key={id} />)}
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <Provider>
    <Main />
  </Provider>
);

export default App;
