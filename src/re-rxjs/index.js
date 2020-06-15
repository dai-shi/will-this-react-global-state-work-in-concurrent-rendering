import React, { unstable_useTransition as useTransition } from 'react';
import { Subject, asapScheduler } from 'rxjs';
import {
  map, scan, startWith, observeOn,
} from 'rxjs/operators';
import { connectObservable } from 're-rxjs';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const normalClicks$ = new Subject();
const normalIncrement = () => normalClicks$.next();

const [useCounter] = connectObservable(
  normalClicks$.pipe(
    observeOn(asapScheduler),
    startWith(initialState),
    scan((x) => reducer(x, { type: 'increment' })),
    map((x) => x.count),
  ),
);

const Counter = React.memo(() => {
  const count = useCounter();
  syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const count = useCounter();
  useCheckTearing();
  useRegisterIncrementDispatcher(normalIncrement);
  const [localCount, localIncrement] = React.useReducer((c) => c + 1, 0);
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      normalIncrement();
    });
  };

  return (
    <div>
      <button
        type="button"
        id="normalIncrement"
        onClick={normalIncrement}
      >
        Increment shared count normally (two clicks to increment one)
      </button>
      <button
        type="button"
        id="transitionIncrement"
        onClick={transitionIncrement}
      >
        Increment shared count in transition (two clicks to increment one)
      </button>
      <span id="pending">{isPending && 'Pending...'}</span>
      <h1>Shared Count</h1>
      {ids.map((id) => (
        <Counter key={id} />
      ))}
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>
        Increment local count
      </button>
    </div>
  );
};

export default Main;
