import { State } from 'rxdeep';
import { useObservable } from 'rxjs-hooks';

import {
  reducer,
  initialState,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const state = new State(initialState);
const useCount = () => useObservable(() => state.sub('count')) || initialState.count;
const useIncrement = () => () => {
  state.value = reducer(state.value, incrementAction);
};
const useDouble = () => () => {
  state.value = reducer(state.value, doubleAction);
};

export default createApp(useCount, useIncrement, useDouble);
