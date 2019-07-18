import React from 'react';
import { createStore, createHook } from 'react-sweet-state';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
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

const Counter = ({ c }) => {
  const [state] = useCounter();
  const { count } = state;
  if (c !== count) {
    console.error(`count mismatch: ${c} ${count}`);
    document.title = 'failed';
  }
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
};

const Main = () => {
  const [state, actions] = useCounter();
  const { count } = state;
  useRegisterClickHandler(React.useCallback(() => {
    actions.dispatch({ type: 'increment' });
  }, [actions]));
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
