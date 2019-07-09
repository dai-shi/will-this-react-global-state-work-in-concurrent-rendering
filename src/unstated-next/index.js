import React from 'react';
import { createContainer } from 'unstated-next';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);
const C = createContainer(useValue);

const Counter = ({ c }) => {
  const [state] = C.useContainer();
  const { count } = state;
  if (c !== count) throw new Error(`count mismatch: ${c} ${count}`);
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
};

const Main = () => {
  const [state, dispatch] = C.useContainer();
  const { count } = state;
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  return (
    <div>
      <Counter c={count} />
      <Counter c={count} />
    </div>
  );
};

const App = () => (
  <C.Provider useValue={useValue}>
    <Main />
  </C.Provider>
);

export default App;
