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

const Counter = ({ c }) => {
  const count = useStore(state => state.count);
  if (c !== count) {
    console.error(`count mismatch: ${c} ${count}`);
    document.title = 'failed';
  }
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
};

const Main = () => {
  const count = useStore(state => state.count);
  const dispatch = useStore(state => state.dispatch);
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  return (
    <div>
      {ids.map(id => (
        <Counter key={id} c={count} />
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
