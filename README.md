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
      ✓ check 1: updated properly (3370 ms)
      ✕ check 2: no tearing during update (4 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (3369 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5247 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6184 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4412 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (3162 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1748 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (7072 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6642 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4836 ms)
      ✕ check 9: no tearing with auto increment (4 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3131 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2037 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6122 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6229 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4973 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (3466 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1738 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6098 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (5628 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3552 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (2272 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1216 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5456 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4394 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3322 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (2340 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1257 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4733 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5986 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3261 ms)
      ✕ check 9: no tearing with auto increment (5 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (4146 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2333 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5393 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6052 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2389 ms)
      ✕ check 9: no tearing with auto increment (21 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (2353 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1294 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4546 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6073 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3335 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (2307 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2288 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5385 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5928 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3325 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (2298 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1218 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5511 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4498 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3347 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (2345 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1217 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5397 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (4423 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3268 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2217 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1213 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4477 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6123 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2237 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (2307 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1233 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5516 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6093 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3444 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (2373 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1259 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5527 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6115 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2251 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (2587 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2606 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5523 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (4512 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3244 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (2369 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1254 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5447 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6124 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2252 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3446 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1307 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5372 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5977 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3130 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (2279 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2300 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5601 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6100 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3216 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  jotai
    check with events from outside
      ✓ check 1: updated properly (2356 ms)
      ✓ check 2: no tearing during update (22 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1413 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4467 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6097 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2474 ms)
      ✓ check 9: no tearing with auto increment (21 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (3388 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✕ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1222 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5285 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5979 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2343 ms)
      ✕ check 9: no tearing with auto increment (20 ms)
  re-rxjs
    check with events from outside
      ✓ check 1: updated properly (2310 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2336 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5337 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5994 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3270 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (3357 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1237 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5371 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5980 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3259 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (2711 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1342 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5528 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6168 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3572 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rx-store
    check with events from outside
      ✓ check 1: updated properly (2615 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1233 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5573 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6120 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3172 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
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
    <td>:white_check_mark:</td>
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
    <td>:white_check_mark:</td>
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
    <th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
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
    <th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
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

  <tr>
    <th><a href="https://github.com/facebookexperimental/Recoil">recoil</a></th>
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

  <tr>
    <th><a href="https://github.com/react-spring/jotai">jotai</a></th>
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

  <tr>
    <th><a href="https://github.com/zerobias/effector">effector</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:question:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/re-rxjs/re-rxjs">re-rxjs</a></th>
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

  <tr>
    <th><a href="https://loreanvictor.github.io/rxdeep">RxDeep</a></th>
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
    <th><a href="https://github.com/LeetCode-OpenSource/rxjs-hooks">rxjs-hooks</a></th>
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

  <tr>
    <th><a href="https://github.com/rx-store/rx-store">rx-store</a></th>
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
