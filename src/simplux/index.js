import React, { useTransition } from 'react';
import { createSimpluxModule, createMutations, createSelectors } from '@simplux/core';
import { SimpluxProvider, useSimplux } from '@simplux/react';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  ids,
  useCheckTearing,
  shallowEqual,
  initialState,
} from '../common';

const counterModule = createSimpluxModule({
  name: 'counter',
  initialState,
});

const counter = {
  ...counterModule,
  ...createMutations(counterModule, {
    increment(state) {
      state.dummy += 1;
      state.count += state.dummy % 2 === 0 ? 1 : 0;
    },
  }),
  ...createSelectors(counterModule, {
    value: state => state.count,
  }),
};

const Counter = React.memo(() => {
  const count = useSimplux(counter.value);
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const count = useSimplux(counter.value);
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    counter.increment();
  }, []));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  const normalIncrement = () => {
    counter.increment();
  };
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      counter.increment();
    });
  };
  return (
    <div>
      <button type="button" id="normalIncrement" onClick={normalIncrement}>Increment shared count normally (two clicks to increment one)</button>
      <button type="button" id="transitionIncrement" onClick={transitionIncrement}>Increment shared count in transition (two clicks to increment one)</button>
      <span id="pending">{isPending && 'Pending...'}</span>
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
  <SimpluxProvider>
    <Main />
  </SimpluxProvider>
);

export default App;
