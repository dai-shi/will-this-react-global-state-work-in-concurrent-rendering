import React, { unstable_useTransition as useTransition } from 'react';
import {
  RecoilRoot,
  useRecoilState,
  atom,
  selector,
} from 'recoil';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  ids,
  useCheckTearing,
  reducer,
  initialState,
} from '../common';

const globalState = atom({
  key: 'globalState',
  default: initialState,
});

const countState = selector({
  key: 'countState',
  get: ({ get }) => get(globalState).count,
  set: ({ get, set }, action) => {
    set(globalState, reducer(get(globalState), action));
  },
});
console.log(globalState, countState);

const Counter = React.memo(() => {
  const [count] = useRecoilState(countState);
  syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const [count, dispatch] = useRecoilState(countState);
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
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => (
  <RecoilRoot>
    <Main />
  </RecoilRoot>
);

export default App;
