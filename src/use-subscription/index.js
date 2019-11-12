import React from 'react';
import { createStore } from 'redux';
import { useSubscription } from 'use-subscription';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const store = createStore(reducer);

const Counter = React.memo(() => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => {
      return store.subscribe(callback);
    },
  }), []));
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => {
      return store.subscribe(callback);
    },
  }), []));
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    store.dispatch({ type: 'increment' });
  }, []));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return (
    <div>
      <h1>Shared Count</h1>
      {ids.map(id => <Counter key={id} />)}
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
