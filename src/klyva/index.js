import { atom, useAtom } from 'klyva';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const baseState = atom(initialState);

const state = atom((get) => selectCount(get(baseState)), (action) => {
  baseState.update((baseStateValue) => reducer(baseStateValue, action));
});

const useCount = () => useAtom(state);

const useIncrement = () => () => state.update(incrementAction);
const useDouble = () => () => state.update(doubleAction);

export default createApp(useCount, useIncrement, useDouble);
