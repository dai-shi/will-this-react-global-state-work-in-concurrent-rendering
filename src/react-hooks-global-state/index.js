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

let parentCount;

const Counter = React.memo(() => {
  const [count] = useGlobalState('count');
  if (parentCount !== count) {
    console.error(`count mismatch: ${parentCount} ${count}`);
    document.title = 'failed';
  }
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const [count] = useGlobalState('count');
  parentCount = count;
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, []));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return (
    <div>
      <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
      <h1 className="parentCount">{count}</h1>
      {ids.map(id => (
        <Counter key={id} />
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
