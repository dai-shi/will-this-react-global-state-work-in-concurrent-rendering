import * as React from "react";
import * as mobx from "mobx";
import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';
import { useSubscription } from "use-subscription";

const store = mobx.observable({ count: 0 });
mobx.autorun(() => {
  console.log(store.count);
});

function useCount() {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => store.count,
    subscribe: callback => {
      return mobx.autorun(() => {
        console.log('in this point')
        callback();
      })
    }
  }),[]))
  return count;
}

const Counter = React.memo(() => {
  syncBlock();

  // const count = useMobxSubscription();
  const count = useCount();

  return <div className="count">{count}</div>;
});
// Due to a bug in React, we must ensure that the component doesn't become a `SimpleMemoComponent`
// This is done by passing in a `compare` function, or can be done by setting a `.defaultProps` on
// the component.
// See: https://github.com/facebook/react/issues/17314
// Set the defaultProps, to prevent React from treating this as a `SimpleMemoComponent`
Counter.defaultProps = {};

const Main = () => {
  // const count = useMobxSubscription();
  const count = useCount();

  useCheckTearing();

  useRegisterIncrementDispatcher(
    React.useCallback(() => {
      mobx.runInAction(() => {
        store.count += 1
      });
    }, [])
  );

  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return (
    <div>
      <h1>Remote Count</h1>
      {ids.map(id => (
        <Counter key={id} />
      ))}
      <div>Rendered by Local Component</div>
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>
        Increment local count
      </button>
    </div>
  );
};
const App = () => (
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;

function useMobxSubscription() {
  const [state, setState] = React.useState(() => ({
    value: store.count
  }));
  let valueToReturn = state.value;
  React.useDebugValue(state.value);


  React.useEffect(() => {
    let didUnsubscribe = false;

    const dispose = mobx.autorun(() => {
      if (didUnsubscribe) {
        return;
      }
      const value = store.count;
      console.log('down here');
      console.log(value, store.count)

      setState(prevState => {
        if (prevState.value == value) {
          return prevState;
        }

        return { ...prevState, count: value };
      });
    });

    return () => {
      didUnsubscribe = true;
      dispose();
    };
  }, []);
  return valueToReturn;
}
