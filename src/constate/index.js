import React from 'react';
import createUseContext from 'constate';

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
const useValueContext = createUseContext(useValue);

const Counter = React.memo(() => {
  const [state] = useValueContext();
  const { count } = state;
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const [state, dispatch] = useValueContext();
  const { count } = state;
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  return (
    <div>
      <h1>Shared Count</h1>
      {ids.map(id => <Counter key={id} />)}
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <useValueContext.Provider useValue={useValue}>
    <Main />
  </useValueContext.Provider>
);

export default App;
