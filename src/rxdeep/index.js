import { State } from 'rxdeep';
import { useObservable } from 'rxjs-hooks';

import {
  createApp,
  initialState,
  reducer,
  incrementAction,
} from '../common';

const state = new State(initialState);
const useCount = () => useObservable(() => state.sub('count')) || initialState.count;
const useIncrement = () => () => {
  state.value = reducer(state.value, incrementAction);
};

export default createApp(useCount, useIncrement);
