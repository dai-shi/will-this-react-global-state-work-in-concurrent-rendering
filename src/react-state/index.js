import React from 'react';
import { createStore } from 'redux';
import { useSubscription } from 'use-subscription';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const store = createStore(reducer);
window.store = store;

const Counter = React.memo(({count}) => {
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const [remoteCount, setRemoteCount] = React.useState(0);

  useCheckTearing();

  useRegisterIncrementDispatcher(React.useCallback(() => {
    // This will be handled outside of the React lifecycle.
    // This has a side-effect that means the event will be processed at a lower
    // priority than an event handler normally would, so React will still interrupt
    // updates when you click
    setRemoteCount(c => c + 1)
  }, []));

  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);

  return (
    <div>
      <h1>Remote Count</h1>
      {ids.map(id => <Counter key={id} count={remoteCount} />)}
      <div className="count">{remoteCount}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
