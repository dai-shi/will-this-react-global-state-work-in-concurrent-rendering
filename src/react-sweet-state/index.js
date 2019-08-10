import React from 'react';
import { createStore, createHook } from 'react-sweet-state';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
  renderedCounts,
  useCheckTearing,
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

const Counter = React.memo(({ i }) => {
  const [state] = useCounter();
  const { count } = state;
  renderedCounts[i] = count;
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const [state, actions] = useCounter();
  const { count } = state;
  useCheckTearing(count);
  useRegisterClickHandler(React.useCallback(() => {
    actions.dispatch({ type: 'increment' });
  }, [actions]));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return (
    <div>
      <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
      <h1 className="parentCount">{count}</h1>
      {ids.map((id, i) => (
        <Counter key={id} i={i} />
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
