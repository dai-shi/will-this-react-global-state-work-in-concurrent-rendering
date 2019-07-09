import React from 'react';
import { createStore } from 'react-hooks-global-state';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
} from '../common';

const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);

const Counter = ({ c }) => {
  const [count] = useGlobalState('count');
  if (c !== count) throw new Error(`count mismatch: ${c} ${count}`);
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
};

const Main = () => {
  const [count] = useGlobalState('count');
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, []));
  return (
    <div>
      <Counter c={count} />
      <Counter c={count} />
    </div>
  );
};

const App = () => (
  <GlobalStateProvider>
    <Main />
  </GlobalStateProvider>
);

export default App;
