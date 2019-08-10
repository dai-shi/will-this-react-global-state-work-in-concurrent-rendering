import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-tracked';

import {
  syncBlock,
  useRegisterClickHandler,
  initialState,
  reducer,
  ids,
  renderedCounts,
  useCheckTearing,
} from '../common';

const useValue = () => React.useReducer(reducer, initialState);

const Counter = React.memo(({ i }) => {
  const count = useSelector(state => state.count);
  renderedCounts[i] = count;
  if (count > 0) syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
  useCheckTearing(count);
  useRegisterClickHandler(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
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
  <Provider useValue={useValue}>
    <Main />
  </Provider>
);

export default App;
