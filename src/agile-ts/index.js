import React from 'react';
import { Agile, Logger } from '@agile-ts/core';
import reactIntegration, { useAgile } from '@agile-ts/react';

import {
  initialState,
  COUNT_PER_DUMMY,
  createApp,
} from '../common';

const AgileApp = new Agile({
  logConfig: { level: Logger.level.DEBUG, active: true },
}).integrate(reactIntegration);

const MY_COUNT = AgileApp.createState(initialState, { key: 'counter' });

const useCount = () => useAgile(MY_COUNT).count;

const useIncrement = () => () => {
  const currentStateValue = MY_COUNT.copy();
  const nextValue = { count: currentStateValue.count * 2 };
  console.log('increment', nextValue, MY_COUNT);
  MY_COUNT.patch(nextValue);
};

const useDouble = () => () => {
  const currentStateValue = MY_COUNT.copy();
  const nextValue = {
    dummy: currentStateValue.dummy + 1,
    count:
      currentStateValue.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1
        ? currentStateValue.count + 1
        : currentStateValue.count,
  };
  console.log('double', nextValue, MY_COUNT);
  MY_COUNT.patch(nextValue);
};

export default createApp(useCount, useIncrement, useDouble);

// const Counter = React.memo(() => {
//   const { count } = useAgile(MY_COUNT);
//   syncBlock();
//   return <div className="count">{count}</div>;
// });
//
// const Main = () => {
//   const { count } = useAgile(MY_COUNT);
//   useCheckTearing();
//   const [startTransition, isPending] = useTransition();
//   const increment = () => {
//     MY_COUNT.patch({ count: MY_COUNT.value.count * 2 });
//   };
//   useRegisterIncrementDispatcher(increment);
//   const doDouble = () => {
//     MY_COUNT.patch({
//       dummy: MY_COUNT.value.dummy + 1,
//       count:
//         MY_COUNT.value.dummy % COUNT_PER_DUMMY === COUNT_PER_DUMMY - 1
//           ? MY_COUNT.value.count + 1
//           : MY_COUNT.value.count,
//     });
//   };
//   const [localState, localDispatch] = useReducer(reducer, initialState);
//   const normalDouble = () => {
//     doDouble();
//   };
//   const transitionIncrement = () => {
//     startTransition(() => {
//       increment();
//     });
//   };
//   return (
//     <div>
//       <button type="button" id="normalDouble" onClick={normalDouble}>
//         Double shared count normally
//       </button>
//       <button
//         type="button"
//         id="transitionIncrement"
//         onClick={transitionIncrement}
//       >
//         Increment shared count in transition (
//         {COUNT_PER_DUMMY}
//         clicks to increment one)
//       </button>
//       <span id="pending">{isPending && 'Pending...'}</span>
//       <h1>Shared Count</h1>
//       {ids.map((id) => (
//         <Counter key={id} />
//       ))}
//       <div id="mainCount" className="count">
//         {count}
//       </div>
//       <h1>Local Count</h1>
//       <div id="localCount">{localState.count}</div>
//       <div id="localDummy">{localState.dummy}</div>
//       <button
//         type="button"
//         id="localIncrement"
//         onClick={() => localDispatch(incrementAction)}
//       >
//         Increment local count
//       </button>
//     </div>
//   );
// };
//
// const App = () => (
//   <>
//     <Main />
//   </>
// );
//
// export default App;
