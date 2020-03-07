# Will this React global state work in Concurrent Mode?

Checking tearing in React concurrent mode

## Introduction

In react-redux, there's a theoretical issue called "tearing"
that might occur in React concurrent mode.

Let's try to check it!

## What is tearing?

- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)

## How does it work?

A small app is implemented with each library.
The state has one count.
The app shows the count in fifty components.

There's a button outside of React and
if it's clicked it will trigger state mutation.
This is to emulate mutating an external state outside of React,
for example updating state by Redux middleware.

The render has intentionaly expensive computation.
If the mutation happens during rendering with in a tree,
there could be an inconsistency in the state.
If it finds the inconsistency, the test will fail.

## How to run

```bash
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-mode.git
cd will-this-react-global-state-work-in-concurrent-mode
yarn install
yarn run build-all
PORT=8080 yarn run http-server &
PORT=8080 yarn run jest
```

You can also test it by opening `http://localhost:8080/react-redux`
in your browser, and click the button very quickly. (check the console log)

## Screencast

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Check scenario

- Normal tearing in Concurrent Mode
  - check 1: updated properly
  - check 2: no tearing during update
  - check 3: ability to interrupt render
  - check 4: proper update after interrupt
- Tearing and state branching with useTransition
  - check 5: updated properly with transition
  - check 6: no tearing with transition
  - check 7: proper branching with transition
- Tearing with intentional update in render
  - check 8: updated properly with auto increment
  - check 9: no tearing with auto increment

## Results

<details>
<summary>Raw Output</summary>

```
  react-redux
    check with events from outside
      ✓ check 1: updated properly (3996ms)
      ✕ check 2: no tearing during update (25ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1614ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3879ms)
      ✕ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5444ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3524ms)
      ✕ check 9: no tearing with auto increment (3ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (8417ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1459ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5018ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7584ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3608ms)
      ✕ check 9: no tearing with auto increment (2ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (9101ms)
      ✓ check 2: no tearing during update (4ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (3084ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6384ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (5165ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4773ms)
      ✕ check 9: no tearing with auto increment (6ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8657ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2443ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6190ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (4950ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4650ms)
      ✓ check 9: no tearing with auto increment (2ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3809ms)
      ✕ check 2: no tearing during update (23ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1660ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3749ms)
      ✕ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5443ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3575ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (3891ms)
      ✕ check 2: no tearing during update (31ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1631ms)
    check with useTransition
      ✕ check 5: updated properly with transition (3907ms)
      ✓ check 6: no tearing with transition (18ms)
      ✕ check 7: proper branching with transition (7590ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4899ms)
      ✕ check 9: no tearing with auto increment (2ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (4386ms)
      ✕ check 2: no tearing during update (28ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1423ms)
    check with useTransition
      ✕ check 5: updated properly with transition (3850ms)
      ✓ check 6: no tearing with transition (22ms)
      ✕ check 7: proper branching with transition (8655ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3417ms)
      ✕ check 9: no tearing with auto increment (30ms)
  react-hooks-global-state-1
    check with events from outside
      ✓ check 1: updated properly (8356ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1393ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4785ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5423ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3502ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-hooks-global-state-2
    check with events from outside
      ✓ check 1: updated properly (9246ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2693ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5012ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3952ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3597ms)
      ✓ check 9: no tearing with auto increment (1ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8923ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2833ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4804ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (4066ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3338ms)
      ✓ check 9: no tearing with auto increment (1ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (9443ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2517ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6100ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3738ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4866ms)
      ✓ check 9: no tearing with auto increment
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (3332ms)
      ✕ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1504ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4142ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5546ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3216ms)
      ✕ check 9: no tearing with auto increment (1ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (9408ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1208ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4778ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7711ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3424ms)
      ✕ check 9: no tearing with auto increment (1ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8644ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2626ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5054ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (6678ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3189ms)
      ✕ check 9: no tearing with auto increment (2ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (9433ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1353ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4951ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (2968ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3388ms)
      ✓ check 9: no tearing with auto increment (1ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (9352ms)
      ✓ check 2: no tearing during update (5ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2670ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4825ms)
      ✓ check 6: no tearing with transition (3ms)
      ✕ check 7: proper branching with transition (5441ms)
    check with intensive auto increment
      ✕ check 8: updated properly with auto increment (10113ms)
      ✕ check 9: no tearing with auto increment (6ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (4196ms)
      ✕ check 2: no tearing during update (23ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (5097ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4766ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5477ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3651ms)
      ✕ check 9: no tearing with auto increment (23ms)
```

</details>

<table>
  <tr>
    <th>Check</th>
    <th>1</th>
    <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
    <th>7</th>
    <th>8</th>
    <th>9</th>
  </tr>

  <tr>
    <th><a href="https://react-redux.js.org">react-redux</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/dai-shi/reactive-react-redux">reactive-react-redux</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  </tr>
    <th><a href="https://react-tracked.js.org">react-tracked</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/diegohaz/constate">constate</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/react-spring/zustand">zustand</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/atlassian/react-sweet-state">react-sweet-state</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/storeon/storeon">storeon</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a> (w/ useGlobalStateProvider)</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/coinbase/rest-hooks/tree/master/packages/use-enhanced-reducer">@rest-hooks/use-enhanced-reducer</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>
  
  </tr>
    <th><a href="https://github.com/mobxjs/mobx-react-lite">mobx-react-lite</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  </tr>
    <th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://mobx.js.org/">Mobx</a> (w/ use-subscription)</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>
  <tr>
    <th>React State</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/apollographql/react-apollo">react-apollo</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>
</table>

## Caution

Tearing may not be an issue depending on app requirements.
The test is done in a very limited way.
The results might contain unexpected errors.

## If you are interested

The reason why I created this is to promote my projects!

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)

The feature of these libraries is not only concurrent mode friendly,
but also state usage tracking.
