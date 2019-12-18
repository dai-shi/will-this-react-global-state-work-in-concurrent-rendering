import React, { createContext, useContext, useTransition } from 'react';
import {
  syncBlock,
  useRegisterIncrementDispatcher,
  ids,
  useCheckTearing,
  shallowEqual,
  reducer,
  initialState,
} from '../common';

const Ctx = createContext();

const Counter = React.memo(() => {
  const store = useContext(Ctx);
  syncBlock();
  return <div className="count">{store}</div>;
}, shallowEqual);

const Main = ({ dispatch }) => {
  const store = useContext(Ctx);
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    dispatch({ type: 'increment' });
  }, [dispatch]));
  const [localCount, localIncrement] = React.useReducer((c) => c + 1, 0);
  const normalIncrement = () => {
    dispatch({ type: 'increment' });
  };
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      dispatch({ type: 'increment' });
    });
  };

  return (
    <div>
      <button type="button" id="normalIncrement" onClick={normalIncrement}>Increment shared count normally (two clicks to increment one)</button>
      <button type="button" id="transitionIncrement" onClick={transitionIncrement}>Increment shared count in transition (two clicks to increment one)</button>
      <span id="pending">{isPending && 'Pending...'}</span>
      <h1>Shared Count</h1>
      {ids.map((id) => <Counter key={id} />)}
      <div className="count">{store}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Ctx.Provider value={store.count}>
      <Main dispatch={dispatch} />
    </Ctx.Provider>
  );
};

export default App;
