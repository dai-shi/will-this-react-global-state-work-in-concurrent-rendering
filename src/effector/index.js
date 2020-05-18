import React, { unstable_useTransition as useTransition } from 'react';
import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';

import {
  ids,
  initialState,
  reducer,
  syncBlock,
  useCheckTearing,
  useRegisterIncrementDispatcher,
} from '../common';

const dispatch = createEvent();
const $store = createStore(initialState)
  .on(dispatch, reducer);

const $count = $store.map((value) => value.count);

$store.watch((s) => console.log('store', s));
$count.watch((c) => console.log('count', c));

const Counter = React.memo(() => {
  const count = useStore($count);
  syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const count = useStore($count);
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, []));
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
  <Main />
);

export default App;
