import { createStore, createEvent } from 'effector';
import { useStore } from 'effector-react';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const dispatch = createEvent();
const $store = createStore(initialState)
  .on(dispatch, reducer);

const $count = $store.map((value) => selectCount(value));

const useCount = () => useStore($count);

const useIncrement = () => () => dispatch(incrementAction);

const useDouble = () => () => dispatch(doubleAction);

export default createApp(useCount, useIncrement, useDouble);
