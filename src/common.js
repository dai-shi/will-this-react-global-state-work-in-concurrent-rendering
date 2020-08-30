import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  unstable_useTransition as useTransition,
} from 'react';

let skipCount = 0;

// block for about 20 ms
export const syncBlock = () => {
  skipCount += 1;
  if (skipCount % 10 === 0) {
    // just one tenth, auto click the increment button
    const count = document.getElementById('autoIncrementCount').value;
    if (count > 0) {
      document.getElementById('autoIncrementCount').value = count - 1;
      document.getElementById('remoteIncrement').click();
      return;
    }
  }
  const start = performance.now();
  while (performance.now() - start < 20) {
    // empty
  }
};

export const useRegisterIncrementDispatcher = (listener) => {
  useEffect(() => {
    const ele = document.getElementById('remoteIncrement');
    ele.addEventListener('click', listener);
    return () => {
      ele.removeEventListener('click', listener);
    };
  }, [listener]);
};

export const COUNT_PER_DUMMY = 2;

export const initialState = {
  count: 0,
  dummy: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        dummy: state.dummy + 1,
        count: state.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1
          ? state.count + 1 : state.count,
      };
    default:
      return state;
  }
};

export const selectCount = (state) => state.count;
export const incrementAction = { type: 'increment' };

export const NUM_CHILD_COMPONENTS = 50;
export const ids = [...Array(NUM_CHILD_COMPONENTS).keys()];

// check if all child components show the same count
// and if not, change the title
export const useCheckTearing = () => {
  useEffect(() => {
    const counts = ids.map((i) => Number(
      document.querySelector(`.count:nth-of-type(${i + 1})`).innerHTML,
    ));
    // add count in <Main>
    counts.push(Number(document.querySelector('.count:last-of-type').innerHTML));
    if (!counts.every((c) => c === counts[0])) {
      console.error('count mismatch', counts);
      document.title += ' TEARED';
    }
  });
};

export const useCheckBranching = () => {
  const maxCountRef = useRef(0);
  useEffect(() => {
    const counts = ids.map((i) => Number(
      document.querySelector(`.count:nth-of-type(${i + 1})`).innerHTML,
    ));
    // add count in <Main>
    counts.push(Number(document.querySelector('.count:last-of-type').innerHTML));
    if (counts.some((c) => c > maxCountRef.current)) {
      console.error('count exceeds max', counts);
      document.title += ' EXCEEDED';
    }
  });
  const setMaxCount = useCallback((maxCount) => {
    maxCountRef.current = maxCount;
  }, []);
  return setMaxCount;
};

export const createApp = (useCount, useIncrement, Root = React.Fragment) => {
  const Counter = React.memo(() => {
    const count = useCount();
    syncBlock();
    return <div className="count">{count}</div>;
  });

  let state = initialState;
  let stateInPending = initialState;

  const Main = () => {
    const count = useCount();
    useCheckTearing();
    const [startTransition, isPending] = useTransition();
    const setMaxCount = useCheckBranching();
    if (isPending) {
      setMaxCount(selectCount(stateInPending));
    } else {
      setMaxCount(selectCount(state));
    }
    const incrementOrig = useIncrement();
    const increment = useCallback(() => {
      state = reducer(state, incrementAction);
      incrementOrig();
    }, [incrementOrig]);
    useRegisterIncrementDispatcher(increment);
    const [localCount, localIncrement] = useReducer((c) => c + 1, 0);
    const transitionIncrement = () => {
      startTransition(() => {
        state = reducer(state, incrementAction);
        stateInPending = reducer(stateInPending, incrementAction);
        increment();
      });
    };
    return (
      <div>
        <button type="button" id="normalIncrement" onClick={increment}>
          Increment shared count normally (
          {COUNT_PER_DUMMY}
          clicks to increment one)
        </button>
        <button type="button" id="transitionIncrement" onClick={transitionIncrement}>
          Increment shared count in transition (
          {COUNT_PER_DUMMY}
          clicks to increment one)
        </button>
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
    <Root>
      <Main />
    </Root>
  );

  return App;
};
