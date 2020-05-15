import React, {
  unstable_useTransition as useTransition,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  createMutableSource,
  useMutableSource,
} from 'react';
import { createStore } from 'redux';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const StoreContext = createContext();
const subscribe = (store, callback) => store.subscribe(callback);
const Provider = ({ store, children }) => {
  const contextValue = useMemo(() => ({
    source: createMutableSource(store, () => store.getState()),
    dispatch: store.dispatch,
  }), [store]);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
const useDispatch = () => useContext(StoreContext).dispatch;
const useSelector = (selector) => {
  const selectorRef = useRef(selector);
  useLayoutEffect(() => {
    selectorRef.current = selector;
  });
  const getSnapshot = useCallback((store) => selectorRef.current(store.getState()), []);
  const { source } = useContext(StoreContext);
  return useMutableSource(source, getSnapshot, subscribe);
};

const store = createStore(reducer);

const Counter = React.memo(() => {
  const count = useSelector((state) => state.count);
  syncBlock();
  return <div className="count">{count}</div>;
}, () => true);

const Main = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
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
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
