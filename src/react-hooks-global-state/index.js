import React from 'react';
import { createStore } from 'react-hooks-global-state';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
} from '../common';

const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);

const Counter = ({ c }) => {
  const [count] = useGlobalState('count');
  if (c !== count) {
    console.error(`count mismatch: ${c} ${count}`);
    document.title = 'failed';
  }
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
      {ids.map(id => (
        <Counter key={id} c={count} />
      ))}
    </div>
  );
};

const App = () => (
  <GlobalStateProvider>
    <Main />
  </GlobalStateProvider>
);

export default App;
