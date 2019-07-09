import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'reactive-react-redux';

import {
  syncBlock,
  useRegisterClickHandler,
  reducer,
} from '../common';

const store = createStore(reducer);

const Counter = ({ c }) => {
  const count = useSelector(state => state.count);
  if (c !== count) throw new Error(`count mismatch: ${c} ${count}`);
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
      <Counter c={count} />
      <Counter c={count} />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
