import { createStore } from 'react-hooks-global-state';

import {
  reducer,
  initialState,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const { dispatch, useGlobalState } = createStore(reducer, initialState);

const useCount = () => {
  const [count] = useGlobalState('count');
  return count;
};

const useIncrement = () => () => dispatch(incrementAction);

const useDouble = () => () => dispatch(doubleAction);

export default createApp(useCount, useIncrement, useDouble);
