import React from 'react';
import {
  BrowserRouter,
  useHistory,
  useLocation,
} from 'react-router-dom';
import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

function createSearchParams(state) {
  return `?dummy=${state.dummy}&count=${state.count}`;
}

function getData(location) {
  const params = new URLSearchParams(location.search);
  if (!location.search) {
    return initialState;
  }
  return {
    count: parseInt(params.get('count'), 10),
    dummy: parseInt(params.get('dummy'), 10),
  };
}

function useCount() {
  const location = useLocation();
  return selectCount(getData(location));
}

function useIncrement() {
  const history = useHistory();
  const location = useLocation();
  return () => {
    const data = getData(location);
    return history.replace(createSearchParams(reducer(data, incrementAction)));
  };
}

function useDouble() {
  const history = useHistory();
  const location = useLocation();
  return () => {
    const data = getData(location);
    return history.replace(createSearchParams(reducer(data, doubleAction)));
  };
}

const Root = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default createApp(useCount, useIncrement, useDouble, Root);
