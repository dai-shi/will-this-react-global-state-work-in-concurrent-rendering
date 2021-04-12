import { run, useConcent } from 'concent';
import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

run({
  counter: {
    state: initialState,
    reducer: {
      inc(payload, moduleState) {
        console.log('inc moduleState.count', moduleState.count);
        return reducer(moduleState, incrementAction);
      },
      double(payload, moduleState) {
        console.log('double moduleState.count', moduleState.count);
        return reducer(moduleState, doubleAction);
      },
    }
  }
});

const useCount = () => {
  const { state } = useConcent('counter');
  return selectCount(state);
};

const useIncrement = () => {
  const { moduleReducer } = useConcent('counter');
  return moduleReducer.inc;
};

const useDouble = () => {
  const { moduleReducer } = useConcent('counter');
  return () => moduleReducer.double();
};

const Root = ({ children }) => children;

export default createApp(useCount, useIncrement, useDouble, Root);
