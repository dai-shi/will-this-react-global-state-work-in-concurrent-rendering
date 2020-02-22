import React, {
  useTransition,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  createMutableSource,
  useMutableSource,
} from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { createStore } from 'redux';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
} from '../common';

const StoreContext = createContext();
const subscribe = ({ subscribersRef }, callback) => {
  const subscribers = subscribersRef.current;
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    subscribers.splice(index, 1);
  };
};
const Provider = ({ store, children }) => {
  const [storeState, setStoreState] = useState(store.getState());
  useEffect(() => {
    const callback = () => {
      setStoreState(store.getState());
    };
    const unsubscribe = store.subscribe(callback);
    callback();
    return unsubscribe;
  }, [store]);
  const storeStateRef = useRef(storeState);
  const subscribersRef = useRef([]);
  useEffect(() => {
    batchedUpdates(() => {
      storeStateRef.current = storeState;
      subscribersRef.current.forEach((callback) => callback());
    });
  });
  const contextValue = useMemo(() => ({
    source: createMutableSource({ storeStateRef, subscribersRef }, () => storeStateRef.current),
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
  const { source } = useContext(StoreContext);
  const getSnapshot = useCallback(
    ({ storeStateRef }) => selectorRef.current(storeStateRef.current),
    [],
  );
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
