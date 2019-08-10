import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import {
  syncBlock,
  useRegisterClickHandler,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const store = createStore(reducer);

const Counter = React.memo(() => {
  const count = useSelector(state => state.count);
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
  useCheckTearing();
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  const forceUpdate = React.useReducer(c => c + 1, 0)[1];
  return (
    <div>
      <button type="button" id="forceupdate" onClick={forceUpdate}>force render</button>
      <h1 className="parentCount">{count}</h1>
      {ids.map(id => <Counter key={id} />)}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
