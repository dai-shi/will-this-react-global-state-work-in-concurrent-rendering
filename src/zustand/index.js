import React from 'react';
import create from 'zustand';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
} from '../common';

const [useStore] = create(set => ({
  ...initialState,
  dispatch: action => set(state => reducer(state, action)),
}));

let parentCount;

const Counter = React.memo(() => {
  const count = useStore(state => state.count);
  if (parentCount !== count) {
    console.error(`count mismatch: ${parentCount} ${count}`);
    document.title = 'failed';
  }
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const count = useStore(state => state.count);
  const dispatch = useStore(state => state.dispatch);
  parentCount = count;
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return (
    <div>
      <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
      <h1 className="parentCount">{count}</h1>
      {ids.map(id => (
        <Counter key={id} />
      ))}
    </div>
  );
};

const App = () => (
  <React.Fragment>
    <Main />
  </React.Fragment>
);

export default App;
