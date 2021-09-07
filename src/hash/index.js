import React from 'react';
import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

function createHash(state) {
  return `${state.dummy},${state.count}`;
}

function getData(hash) {
  hash = hash.slice(1);
  if (!hash) {
    return initialState;
  }

  const [dummy, count] = hash.split(',');
  return {
    dummy: parseInt(dummy, 10),
    count: parseInt(count, 10),
  };
}

function useHash() {
  const [hash, setHash] = React.useState(() => window.location.hash);

  const listener = () => {
    setHash(window.location.hash);
  };

  React.useEffect(() => {
    window.addEventListener('hashchange', listener);
    return () => {
      window.removeEventListener('hashchange', listener);
    };
  }, []);

  return hash;
}

function useCount() {
  const hash = useHash();
  return selectCount(getData(hash));
}

function useIncrement() {
  const hash = useHash();
  return () => {
    const data = getData(hash);
    window.location.hash = createHash(reducer(data, incrementAction));
  };
}

function useDouble() {
  const hash = useHash();
  return () => {
    const data = getData(hash);
    window.location.hash = createHash(reducer(data, doubleAction));
  };
}

export default createApp(useCount, useIncrement, useDouble);
