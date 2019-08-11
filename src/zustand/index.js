import React from 'react';
import create from 'zustand';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  initialState,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const [useStore] = create(set => ({
  ...initialState,
  dispatch: action => set(state => reducer(state, action)),
}));

const Counter = React.memo(() => {
  const count = useStore(state => state.count);
  syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const count = useStore(state => state.count);
  const dispatch = useStore(state => state.dispatch);
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
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
