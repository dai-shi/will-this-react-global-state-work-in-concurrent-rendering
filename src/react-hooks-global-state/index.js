import React from 'react';
import { createStore } from 'react-hooks-global-state';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
  renderedCounts,
  useCheckTearing,
} from '../common';

const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);

const Counter = React.memo(({ i }) => {
  const [count] = useGlobalState('count');
  renderedCounts[i] = count;
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const [count] = useGlobalState('count');
  useCheckTearing(count);
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, []));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return (
    <div>
      <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
      <h1 className="parentCount">{count}</h1>
      {ids.map((id, i) => (
        <Counter key={id} i={i} />
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
