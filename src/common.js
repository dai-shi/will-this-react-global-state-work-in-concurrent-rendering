import React, {
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
  useRef,
} from 'react';

// block for about 20 ms
const syncBlock = () => {
  const start = performance.now();
  while (performance.now() - start < 20) {
    // empty
  }
};

export const initialState = {
  count: 0,
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'double':
      return {
        ...state,
        count: state.count * 2,
      };
    default:
      return state;
  }
};

export const selectCount = (state) => state.count;
export const incrementAction = { type: 'increment' };
export const doubleAction = { type: 'double' };

export const NUM_CHILD_COMPONENTS = 50;
const ids = [...Array(NUM_CHILD_COMPONENTS).keys()];

// check if all child components show the same count
// and if not, change the title
export const useCheckTearing = () => {
  useEffect(() => {
    try {
      const counts = ids.map((i) => Number(
        document.querySelector(`.count:nth-of-type(${i + 1})`).innerHTML,
      ));
      counts.push(Number(document.getElementById('mainCount').innerHTML));
      if (!counts.every((c) => c === counts[0])) {
        console.error('count mismatch', counts);
        document.title += ' TEARED';
      }
    } catch (e) {
      // ignored
    }
  });
};

export const createApp = (
  useCount,
  useIncrement,
  useDouble,
  Root = React.Fragment,
  componentWrapper = React.memo,
  mainWrapper = (fn) => fn,
) => {
  const Counter = componentWrapper(() => {
    const count = useCount();
    syncBlock();
    return <div className="count">{count}</div>;
  });

  const DeferredCounter = componentWrapper(() => {
    const count = useDeferredValue(useCount());
    syncBlock();
    return <div className="count">{count}</div>;
  });

  const Main = mainWrapper(() => {
    const [isPending, startTransition] = useTransition();
    const [mode, setMode] = useState(null);
    const transitionHide = () => {
      startTransition(() => setMode(null));
    };
    const transitionShowCounter = () => {
      startTransition(() => setMode('counter'));
    };
    const transitionShowDeferred = () => {
      startTransition(() => setMode('deferred'));
    };
    const count = useCount();
    const deferredCount = useDeferredValue(count);
    useCheckTearing();
    const increment = useIncrement();
    const doDouble = useDouble();
    const transitionIncrement = () => {
      startTransition(increment);
    };
    const timer = useRef();
    const stopAutoIncrement = () => {
      clearInterval(timer.current);
    };
    const startAutoIncrement = () => {
      stopAutoIncrement();
      timer.current = setInterval(increment, 50);
    };
    return (
      <div>
        <button type="button" id="transitionHide" onClick={transitionHide}>
          Hide in transition
        </button>
        <button type="button" id="transitionShowCounter" onClick={transitionShowCounter}>
          Show counter in transition
        </button>
        <button type="button" id="transitionShowDeferred" onClick={transitionShowDeferred}>
          Show deferred counter in transition
        </button>
        <button type="button" id="normalIncrement" onClick={increment}>
          Increment count normally
        </button>
        <button type="button" id="normalDouble" onClick={doDouble}>
          Double count normally
        </button>
        <button type="button" id="transitionIncrement" onClick={transitionIncrement}>
          Increment count in transition
        </button>
        <button type="button" id="stopAutoIncrement" onClick={stopAutoIncrement}>
          Stop auto incrementing count
        </button>
        <button type="button" id="startAutoIncrement" onClick={startAutoIncrement}>
          Start auto incrementing count
        </button>
        <span id="pending">{isPending && 'Pending...'}</span>
        <h1>Counters</h1>
        {mode === 'counter' && ids.map((id) => <Counter key={id} />)}
        {mode === 'deferred' && ids.map((id) => <DeferredCounter key={id} />)}
        <h1>Main</h1>
        <div id="mainCount" className="count">{mode === 'deferred' ? deferredCount : count}</div>
      </div>
    );
  });

  const App = () => (
    <Root>
      <Main />
    </Root>
  );

  return App;
};
