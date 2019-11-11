import React from 'react';
import createModel from '@lxsmnsyc/react-scoped-model';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  reducer,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const useValue = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
};

const Value = createModel(useValue);

const Counter = React.memo(() => {
  const state = Value.useProperty('state');
  const { count } = state;
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const [state, dispatch] = Value.useProperties(['state', 'dispatch']);
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
  <Value.Provider>
    <Main />
  </Value.Provider>
);

export default App;
