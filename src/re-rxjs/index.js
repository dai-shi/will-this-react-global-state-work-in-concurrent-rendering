import { Subject, asapScheduler } from 'rxjs';
import {
  map,
  scan,
  startWith,
  observeOn,
} from 'rxjs/operators';
import { connectObservable } from 're-rxjs';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const normalClicks$ = new Subject();

const [useCount] = connectObservable(
  normalClicks$.pipe(
    observeOn(asapScheduler),
    startWith(initialState),
    scan((x, action) => reducer(x, action)),
    map((x) => selectCount(x)),
  ),
);

const useIncrement = () => () => normalClicks$.next(incrementAction);
const useDouble = () => () => normalClicks$.next(doubleAction);

export default createApp(useCount, useIncrement, useDouble);
