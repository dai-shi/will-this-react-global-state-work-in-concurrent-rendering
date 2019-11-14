import React from 'react';
import { createStore } from 'redux';
import { useSubscription } from 'use-subscription';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
} from '../common';
import { BehaviorSubject } from 'rxjs';

const countSubject = new BehaviorSubject(0);
window.countSubject = countSubject;

// Same as bug:
const Counter = React.memo(() => {
  syncBlock();

  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => countSubject.getValue(),
    subscribe: (callback) => {
      const subscription = countSubject.subscribe(callback);
      return () => subscription.unsubscribe();
    },
  }), [count]));
   return <div className="count">{count}</div>;
});
// Due to a bug in React, we must ensure that the component doesn't become a `SimpleMemoComponent`
// This is done by passing in a `compare` function, or can be done by setting a `.defaultProps` on
// the component.
// See: https://github.com/facebook/react/issues/17314
// Set the defaultProps, to prevent React from treating this as a `SimpleMemoComponent`
Counter.defaultProps = { }

const Main = () => {
  const count = useSubscription(React.useMemo(() => ({
    getCurrentValue: () => countSubject.getValue(),
    subscribe: (callback) => {
      const subscription = countSubject.subscribe(callback);
      return () => subscription.unsubscribe();
    },
  }), []));


  useCheckTearing();


  useRegisterIncrementDispatcher(React.useCallback(() => {
    countSubject.next(countSubject.getValue() + 1);
  }, []));

  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return (
    <div>
      <h1>Remote Count</h1>
      {ids.map(id => <Counter key={id} />)}
      <div>Rendered by Local Component</div>
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
      <p>You can also access the `countSubject` via `window.countSubject`</p>
    </div>
  );
};

const App = () => (
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
