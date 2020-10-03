import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
  unstable_useTransition as useTransition,
} from 'react';
import { useObserver, useLocalStore } from 'mobx-react-lite';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  initialState,
  incrementAction,
  ids,
  useCheckTearing,
  COUNT_PER_DUMMY,
} from '../common';

const Ctx = createContext();

const Counter = React.memo(() => {
  const store = useContext(Ctx);
  return useObserver(() => {
    const { count } = store;
    syncBlock();
    return <div className="count">{count}</div>;
  });
});

const Main = () => {
  const store = useContext(Ctx);
  useCheckTearing();
  const [startTransition, isPending] = useTransition();
  const increment = useCallback(() => {
    store.dummy += 1;
    if (store.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1) {
      store.count += 1;
    }
  }, [store]);
  useRegisterIncrementDispatcher(React.useCallback(() => {
    increment();
  }, [increment]));
  const doDouble = React.useCallback(() => {
    store.count *= 2;
  }, [store]);
  const [localState, localDispatch] = useReducer(reducer, initialState);
  const normalDouble = () => {
    doDouble();
  };
  const transitionIncrement = () => {
    startTransition(() => {
      increment();
    });
  };
  return useObserver(() => {
    const { count } = store;
    return (
      <div>
        <button type="button" id="normalDouble" onClick={normalDouble}>
          Double shared count normally
        </button>
        <button type="button" id="transitionIncrement" onClick={transitionIncrement}>
          Increment shared count in transition (
          {COUNT_PER_DUMMY}
          clicks to increment one)
        </button>
        <span id="pending">{isPending && 'Pending...'}</span>
        <h1>Shared Count</h1>
        {ids.map((id) => <Counter key={id} />)}
        <div id="mainCount" className="count">{count}</div>
        <h1>Local Count</h1>
        <div id="localCount">{localState.count}</div>
        <div id="localDummy">{localState.dummy}</div>
        <button type="button" id="localIncrement" onClick={() => localDispatch(incrementAction)}>
          Increment local count
        </button>
      </div>
    );
  });
};

const App = () => {
  const store = useLocalStore(() => initialState);
  return (
    <Ctx.Provider value={store}>
      <Main />
    </Ctx.Provider>
  );
};

export default App;
