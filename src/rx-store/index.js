import { BehaviorSubject, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import React, { useCallback } from 'react';
import { store, useStore, useSubscription } from '@rx-store/react';
import {
  createApp,
} from '../common';

const storeValue = {
  counterChange$: new Subject(),
  count$: new BehaviorSubject(0),
};

const effect = ({ sources, sinks }) => sources.counterChange$().pipe(
  scan((acc, value) => acc + value, 0),
  sinks.count$(),
);

const { Manager, context } = store({ value: storeValue, effect });

const useCount = () => {
  const { count$ } = useStore(context);
  const [count] = useSubscription(count$);
  return count;
};

const useIncrement = () => {
  const { counterChange$ } = useStore(context);
  return useCallback(() => {
    console.log('rx-store incrementing');
    counterChange$.next(1);
  }, [counterChange$]);
};

const Root = ({ children }) => (
  <Manager>
    {children}
  </Manager>
);

export default createApp(useCount, useIncrement, Root);
