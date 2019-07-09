import React from 'react';
import createUseContext from 'constate';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);
const useValueContext = createUseContext(useValue);

const Counter = ({ c }) => {
  const [state] = useValueContext();
  const { count } = state;
  if (c !== count) throw new Error(`count mismatch: ${c} ${count}`);
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
};

const Main = () => {
  const [state, dispatch] = useValueContext();
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
  <useValueContext.Provider useValue={useValue}>
    <Main />
  </useValueContext.Provider>
);

export default App;
