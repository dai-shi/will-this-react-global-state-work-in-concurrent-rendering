import React from 'react';
import createUseContext from 'constate';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);
const useValueContext = createUseContext(useValue);

const Counter = React.memo(() => {
  const [state] = useValueContext();
  const { count } = state;
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const [state, dispatch] = useValueContext();
  const { count } = state;
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
  <useValueContext.Provider useValue={useValue}>
    <Main />
  </useValueContext.Provider>
);

export default App;
