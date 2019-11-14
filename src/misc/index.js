import React, { createContext, useContext } from 'react';
import { useObserver, useLocalStore } from 'mobx-react-lite';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  ids,
  useCheckTearing,
} from '../common';
import { observable, runInAction, Reaction } from 'mobx';
import { useSubscription } from 'use-subscription';


const store = observable({ count: 0  });

const Counter = React.memo(() => {
  return useObserver(() => {
    syncBlock();
    return <div className="count">{store.count}</div>;
  });
});


const Subcounter = React.memo(() => {
  const subHandler = React.useMemo(
    () => ({
      getCurrentValue: () => store.count,
      subscribe: callback => {
        const r = new Reaction("Test", () => {
          console.log("Reaction Changed")
          callback();
        });
        r.track(() => store.count);
        return () => {
          r.dispose();
        }
      }
    }),

    // Re-subscribe any time our input changes
    // (e.g. we get a new HTMLInputElement prop to subscribe to)
    []
  );

  const value = useSubscription(subHandler);

  return <div className="count">{value}</div>
})

const Main = () => {
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    runInAction(() => {
      store.count += 1;
    });
  }, []));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return useObserver(() => {
    const { count } = store;
    return (
      <div>
        <h1>Remote Count</h1>
        {ids.map(id => <Counter key={id} />)}
        <div className="count">{count}</div>
        <h1>Subscription Variant</h1>
        {ids.map(id => <Subcounter key={id} />)}
        <h1>Local Count</h1>
        {localCount}
        <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
      </div>
    );
  });
};

const App = () => {
  return (
      <Main />
  );
};

export default App;
