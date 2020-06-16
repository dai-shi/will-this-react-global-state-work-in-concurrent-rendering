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
  createApp,
} from '../common';

const normalClicks$ = new Subject();

const [useCount] = connectObservable(
  normalClicks$.pipe(
    observeOn(asapScheduler),
    startWith(initialState),
    scan((x) => reducer(x, incrementAction)),
    map((x) => selectCount(x)),
  ),
);

const useIncrement = () => () => normalClicks$.next();

export default createApp(useCount, useIncrement);
