import React, { unstable_useTransition as useTransition } from 'react';
import { Subject, merge, asapScheduler } from 'rxjs';
import {
  map, scan, startWith, observeOn,
} from 'rxjs/operators';
import { connectObservable } from 're-rxjs';
import {
  syncBlock,
  useRegisterIncrementDispatcher,
  ids,
  useCheckTearing,
} from '../common';

const normalClicks$ = new Subject();
const normalIncrement = () => normalClicks$.next();

const externalClicks$ = new Subject();
// This is only needed to prevent the tearing with auto increment (check #9)
const externalClicksAsap$ = externalClicks$.pipe(observeOn(asapScheduler));
const externalIncrement = () => externalClicks$.next();

const [useCounter] = connectObservable(
  merge(normalClicks$, externalClicksAsap$).pipe(
    scan((x) => x + 0.5, 0),
    map(Math.floor),
    startWith(0),
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
  useRegisterIncrementDispatcher(externalIncrement);
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
        onClick={isPending ? transitionIncrement : normalIncrement}
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
