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
      ✓ check 1: updated properly (3216ms)
      ✕ check 2: no tearing during update (22ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1448ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2525ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5444ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2986ms)
      ✕ check 9: no tearing with auto increment (2ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3229ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1301ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2473ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7421ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2993ms)
      ✓ check 9: no tearing with auto increment (1ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (8264ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1158ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3504ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (3650ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2955ms)
      ✓ check 9: no tearing with auto increment (1ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8577ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2378ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4679ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (4485ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3975ms)
      ✓ check 9: no tearing with auto increment (1ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3188ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1462ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2555ms)
      ✕ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5438ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2966ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (4194ms)
      ✕ check 2: no tearing during update (20ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1422ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2668ms)
      ✓ check 6: no tearing with transition (16ms)
      ✕ check 7: proper branching with transition (7400ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4009ms)
      ✕ check 9: no tearing with auto increment (1ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3182ms)
      ✕ check 2: no tearing during update (17ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1472ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2667ms)
      ✓ check 6: no tearing with transition (20ms)
      ✕ check 7: proper branching with transition (7416ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3020ms)
      ✕ check 9: no tearing with auto increment (20ms)
  react-hooks-global-state-1
    check with events from outside
      ✓ check 1: updated properly (8846ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1071ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3511ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5439ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2959ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-hooks-global-state-2
    check with events from outside
      ✓ check 1: updated properly (8358ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2325ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3534ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (3456ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2963ms)
      ✓ check 9: no tearing with auto increment (1ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8636ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2142ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3549ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (2479ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3078ms)
      ✓ check 9: no tearing with auto increment (2ms)
  use-enhanced-reducer
    check with events from outside
      √ check 1: updated properly (8624ms)
      √ check 2: no tearing during update (1ms)
      √ check 3: ability to interrupt render (1ms)
      √ check 4: proper update after interrupt (2388ms)
    check with useTransition
      √ check 5: updated properly with transition (4650ms)
      √ check 6: no tearing with transition
      √ check 7: proper branching with transition (3407ms)
    check with intensive auto increment
      √ check 8: updated properly with auto increment (4011ms)
      √ check 9: no tearing with auto increment (1ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2815ms)
      ✕ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1310ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2626ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5582ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2785ms)
      ✕ check 9: no tearing with auto increment (1ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8713ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2137ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4571ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7434ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2993ms)
      ✕ check 9: no tearing with auto increment (3ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8233ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2350ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3612ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (6448ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2739ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (8827ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1119ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3514ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (3684ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2960ms)
      ✓ check 9: no tearing with auto increment (1ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (8252ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2413ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3520ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5444ms)
    check with intensive auto increment
      ✕ check 8: updated properly with auto increment (10084ms)
      ✕ check 9: no tearing with auto increment (2ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3223ms)
      ✕ check 2: no tearing during update (20ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2450ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3490ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5465ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4031ms)
      ✕ check 9: no tearing with auto increment (20ms)
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
    <td>:white_check_mark:</td>
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
    <td>:white_check_mark:</td>
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
