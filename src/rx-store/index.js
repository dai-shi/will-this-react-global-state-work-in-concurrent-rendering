import { BehaviorSubject, Subject, asapScheduler } from 'rxjs';
import { scan, observeOn } from 'rxjs/operators';
import React, { useCallback } from 'react';
import { store, useStore, useSubscription } from '@rx-store/react';
import {
  createApp,
  reducer,
  incrementAction,
  doubleAction,
  initialState,
} from '../common';

const storeValue = {
  counterChange$: new Subject(),
  count$: new BehaviorSubject({ count: 0 }),
};

const effect = ({ sources, sinks }) => sources.counterChange$().pipe(
  observeOn(asapScheduler),
  scan(reducer, initialState),
  sinks.count$(),
);

const { Manager, context } = store({ value: storeValue, effect });

const useCount = () => {
  const { count$ } = useStore(context);
  const [state] = useSubscription(count$);
  return state ? state.count : 0;
};

const useIncrement = () => {
  const { counterChange$ } = useStore(context);
  return useCallback(() => {
    counterChange$.next(incrementAction);
  }, [counterChange$]);
};

const useDouble = () => {
  const { counterChange$ } = useStore(context);
  return useCallback(() => {
    counterChange$.next(doubleAction);
  }, [counterChange$]);
};

const Root = ({ children }) => (
  <Manager>
    {children}
  </Manager>
);

export default createApp(useCount, useIncrement, useDouble, Root);
