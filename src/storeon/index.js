import React from 'react';
import createStore from 'storeon';
import useStoreon from 'storeon/react';
import StoreContext from 'storeon/react/context';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const counter = (store) => {
  store.on('@init', () => initialState);
  store.on('dispatch', reducer);
};

const store = createStore([counter]);

const Counter = React.memo(() => {
  const { count } = useStoreon('count');
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const { count, dispatch } = useStoreon('count');
  useCheckTearing(count);
  useRegisterClickHandler(React.useCallback(() => {
    dispatch('dispatch', { type: 'increment' });
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
  <StoreContext.Provider value={store}>
    <Main />
  </StoreContext.Provider>
);

export default App;
