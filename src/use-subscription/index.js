import React from 'react';
import { createStore } from 'redux';
import { useSubscription } from 'use-subscription';

import {
  syncBlock,
  useRegisterClickHandler,
  reducer,
  ids,
  renderedCounts,
  useCheckTearing,
} from '../common';

const store = createStore(reducer);

const Counter = React.memo(({ i }) => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => {
      return store.subscribe(callback);
    },
  }), []));
  renderedCounts[i] = count;
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => {
      return store.subscribe(callback);
    },
  }), []));
  useCheckTearing(count);
  useRegisterClickHandler(React.useCallback(() => {
    store.dispatch({ type: 'increment' });
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
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
