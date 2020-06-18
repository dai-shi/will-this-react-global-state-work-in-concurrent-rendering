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
      ✕ check 1: updated properly (11137 ms)
      ✕ check 2: no tearing during update (6 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1335 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4259 ms)
      ✕ check 6: no tearing with transition (3 ms)
      ✕ check 7: proper branching with transition (3590 ms)
    check with intensive auto increment
      ✕ check 8: updated properly with auto increment (10075 ms)
      ✕ check 9: no tearing with auto increment (3 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (6333 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1377 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (8405 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (8009 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2264 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (6328 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1330 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (8396 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (4514 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3222 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (6374 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2407 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (7080 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (7187 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3353 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (6361 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2485 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (9552 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (7115 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4152 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3167 ms)
      ✕ check 2: no tearing during update (20 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1502 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4243 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3576 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2270 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (2184 ms)
      ✕ check 2: no tearing during update (16 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1479 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (4399 ms)
      ✓ check 6: no tearing with transition (19 ms)
      ✕ check 7: proper branching with transition (8132 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2327 ms)
      ✕ check 9: no tearing with auto increment (21 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (2193 ms)
      ✕ check 2: no tearing during update (19 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1436 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (4424 ms)
      ✓ check 6: no tearing with transition (19 ms)
      ✕ check 7: proper branching with transition (8137 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2316 ms)
      ✕ check 9: no tearing with auto increment (21 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (5272 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2259 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6311 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (3668 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2582 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (6646 ms)
      ✓ check 2: no tearing during update (3 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2382 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6282 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5376 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3100 ms)
      ✓ check 9: no tearing with auto increment (2 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (6324 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1226 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (9518 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (7282 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4182 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2109 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1191 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4403 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3105 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2060 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (6341 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1354 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (8424 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (7080 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2297 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (5274 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2362 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6433 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (3623 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2067 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (5307 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2441 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (9499 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (8468 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4141 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (6327 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1223 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6428 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (3669 ms)
    check with intensive auto increment
      ✕ check 8: updated properly with auto increment (10221 ms)
      ✕ check 9: no tearing with auto increment (4 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3186 ms)
      ✕ check 2: no tearing during update (20 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2445 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5273 ms)
      ✕ check 6: no tearing with transition (3 ms)
      ✕ check 7: proper branching with transition (3891 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3033 ms)
      ✕ check 9: no tearing with auto increment (22 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (3070 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1157 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4373 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (2965 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2935 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-atom
    check with events from outside
      ✓ check 1: updated properly (5297 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2413 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6296 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5376 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3130 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (3202 ms)
      ✕ check 2: no tearing during update (22 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1430 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4269 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3628 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2258 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  re-rxjs
    check with events from outside
      ✓ check 1: updated properly (5320 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2402 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6271 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (4809 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4190 ms)
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
    <td>:question:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:question:</td>
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
    <td>:x:</td>
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
    <th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
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

  <tr>
    <th><a href="https://github.com/facebookexperimental/Recoil">recoil</a></th>
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
    <th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
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
    <td>:white_check_mark:</td>
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
    <td>:grey_question:</td>
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
