import { State } from 'rxdeep';
import { useObservable } from 'rxjs-hooks';

import { createApp, initialState } from '../common';

const state = new State(initialState.count);
const useCount = () => useObservable(() => state) || initialState.count;
const useIncrement = () => () => { state.value += 1; };

export default createApp(useCount, useIncrement);
