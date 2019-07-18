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
} from '../common';

const counter = (store) => {
  store.on('@init', () => initialState);
  store.on('dispatch', reducer);
};

const store = createStore([counter]);

const Counter = ({ c }) => {
  const { count } = useStoreon('count');
  if (c !== count) {
    console.error(`count mismatch: ${c} ${count}`);
    document.title = 'failed';
  }
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
};

const Main = () => {
  const { count, dispatch } = useStoreon('count');
  useRegisterClickHandler(React.useCallback(() => {
    dispatch('dispatch', { type: 'increment' });
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
  <StoreContext.Provider value={store}>
    <Main />
  </StoreContext.Provider>
);

export default App;
