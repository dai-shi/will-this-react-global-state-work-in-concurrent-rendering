import React, { createContext, useContext, useTransition } from 'react';
import { useObserver, useLocalStore } from 'mobx-react-lite';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const Ctx = createContext();

const Counter = React.memo(() => {
  const store = useContext(Ctx);
  return useObserver(() => {
    const { count } = store;
    syncBlock();
    return <div className="count">{count}</div>;
  });
}, shallowEqual);

const Main = () => {
  const store = useContext(Ctx);
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    store.dummy += 1;
    if (store.dummy % 2 === 1) {
      store.count += 1;
    }
  }, [store]));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  const normalIncrement = () => {
    store.dummy += 1;
    if (store.dummy % 2 === 1) {
      store.count += 1;
    }
  };
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      store.dummy += 1;
      if (store.dummy % 2 === 1) {
        store.count += 1;
      }
    });
  };
  return useObserver(() => {
    const { count } = store;
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
