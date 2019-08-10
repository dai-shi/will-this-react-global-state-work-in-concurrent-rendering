import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const context = createContext(null);

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <context.Provider value={[state, dispatch]}>
      {children}
    </context.Provider>
  );
};

const Counter = React.memo(() => {
  const count = useContextSelector(context, v => v[0].count);
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const dispatch = useContextSelector(context, v => v[1]);
  const count = useContextSelector(context, v => v[0].count);
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
  <Provider>
    <Main />
  </Provider>
);

export default App;
