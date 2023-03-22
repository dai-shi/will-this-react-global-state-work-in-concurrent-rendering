import React, { useCallback } from 'react';
import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const state = observable(initialState);

const useCount = () => selectCount(state);

const useIncrement = () => useCallback(() => {
  const newState = reducer(state, incrementAction);
  runInAction(() => {
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  });
}, []);

const useDouble = () => useCallback(() => {
  const newState = reducer(state, doubleAction);
  runInAction(() => {
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  });
}, []);

export default createApp(useCount, useIncrement, useDouble, React.Fragment, observer, observer);
