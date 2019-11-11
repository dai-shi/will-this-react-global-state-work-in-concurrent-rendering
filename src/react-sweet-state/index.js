import React from 'react';
import { createStore, createHook } from 'react-sweet-state';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  reducer,
  ids,
  useCheckTearing,
  shallowEqual,
} from '../common';

const Store = createStore({
  initialState,
  actions: {
    dispatch: action => ({ setState, getState }) => {
      setState(reducer(getState(), action));
    },
  },
});

const useCounter = createHook(Store);

const Counter = React.memo(() => {
  const [state] = useCounter();
  const { count } = state;
  syncBlock();
  return <div className="count">{count}</div>;
}, shallowEqual);

const Main = () => {
  const [state, actions] = useCounter();
  const { count } = state;
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    actions.dispatch({ type: 'increment' });
  }, [actions]));
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
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
