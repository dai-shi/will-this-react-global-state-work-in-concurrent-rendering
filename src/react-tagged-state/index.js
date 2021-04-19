import { createTagged, useTagged } from 'react-tagged-state';

import {
  reducer,
  initialState,
  selectCount,
  incrementAction,
  doubleAction,
  createApp,
} from '../common';

const countState = createTagged(initialState);

const useCount = () => useTagged(() => selectCount(countState()));

const useIncrement = () => () => {
  countState((state) => reducer(state, incrementAction));
};

const useDouble = () => () => {
  countState((state) => reducer(state, doubleAction));
};

export default createApp(useCount, useIncrement, useDouble);
