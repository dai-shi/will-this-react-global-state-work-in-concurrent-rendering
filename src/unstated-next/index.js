import React from 'react';
import { createContainer } from 'unstated-next';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  reducer,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);
const C = createContainer(useValue);

const Counter = React.memo(() => {
  const [state] = C.useContainer();
  const { count } = state;
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const [state, dispatch] = C.useContainer();
  const { count } = state;
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return (
    <div>
      <h1>Remote Count</h1>
      {ids.map(id => <Counter key={id} />)}
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <C.Provider useValue={useValue}>
    <Main />
  </C.Provider>
);

export default App;
