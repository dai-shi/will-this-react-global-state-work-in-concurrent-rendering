import React, { useTransition } from 'react';
import { createStore } from 'redux';
import { useSubscription } from 'use-subscription';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const store = createStore(reducer);

const Counter = React.memo(() => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => store.subscribe(callback),
  }), []));
  syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.getState().count,
    subscribe: (callback) => store.subscribe(callback),
  }), []));
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    store.dispatch({ type: 'increment' });
  }, []));
  const [localCount, localIncrement] = React.useReducer((c) => c + 1, 0);
  const normalIncrement = () => {
    store.dispatch({ type: 'increment' });
  };
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      store.dispatch({ type: 'increment' });
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
  <>
    <Main />
  </>
);

export default App;
