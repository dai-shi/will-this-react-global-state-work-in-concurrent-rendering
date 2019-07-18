import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-tracked';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);

const Counter = ({ c }) => {
  const count = useSelector(state => state.count);
  if (c !== count) {
    console.error(`count mismatch: ${c} ${count}`);
    document.title = 'failed';
  }
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
};

const Main = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
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
  <Provider useValue={useValue}>
    <Main />
  </Provider>
);

export default App;
