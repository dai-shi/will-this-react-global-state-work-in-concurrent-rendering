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
  - check 1: updated properly (3187ms)
  - check 2: no tearing during update (23ms)
  - check 3: ability to interrupt render
  - check 4: proper update after interrupt (1481ms)
- Tearing and state branching with useTransition
  - check 5: updated properly with transition (2530ms)
  - check 6: no tearing with transition (2ms)
  - check 7: proper branching with transition (5444ms)
- Tearing with intentional update in render
  - check 8: updated properly with auto increment (2972ms)
  - check 9: no tearing with auto increment (2ms)

## Results

<details>
<summary>Raw Output</summary>

```
  react-redux
    check with events from outside
      ✓ check 1: updated properly (3187ms)
      ✕ check 2: no tearing during update (23ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1481ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2530ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5444ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2972ms)
      ✕ check 9: no tearing with auto increment (2ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3168ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1303ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2463ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7395ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3001ms)
      ✓ check 9: no tearing with auto increment (1ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (8614ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2417ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3536ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (3550ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3032ms)
      ✓ check 9: no tearing with auto increment (1ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8603ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2403ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4678ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (4489ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4004ms)
      ✓ check 9: no tearing with auto increment (1ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3218ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1432ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2519ms)
      ✕ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5439ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3008ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (4303ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1441ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2655ms)
      ✓ check 6: no tearing with transition (20ms)
      ✕ check 7: proper branching with transition (7420ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3970ms)
      ✕ check 9: no tearing with auto increment (2ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3172ms)
      ✕ check 2: no tearing during update (19ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1432ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2637ms)
      ✓ check 6: no tearing with transition (20ms)
      ✕ check 7: proper branching with transition (7415ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3045ms)
      ✕ check 9: no tearing with auto increment (20ms)
  react-hooks-global-state-1
    check with events from outside
      ✓ check 1: updated properly (8302ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2438ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3499ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5436ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3016ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-hooks-global-state-2
    check with events from outside
      ✓ check 1: updated properly (8252ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2375ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3521ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (4515ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3004ms)
      ✓ check 9: no tearing with auto increment (1ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8285ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2352ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3505ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3537ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3044ms)
      ✓ check 9: no tearing with auto increment (1ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2832ms)
      ✕ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1421ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2620ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5581ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2781ms)
      ✕ check 9: no tearing with auto increment (1ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8305ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1137ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4510ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7427ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2976ms)
      ✕ check 9: no tearing with auto increment (2ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8360ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1156ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3604ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (6444ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2780ms)
      ✕ check 9: no tearing with auto increment (1ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (8364ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2370ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3521ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3475ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3012ms)
      ✓ check 9: no tearing with auto increment (1ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (8327ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2398ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3493ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5442ms)
    check with intensive auto increment
      ✕ check 8: updated properly with auto increment (10092ms)
      ✕ check 9: no tearing with auto increment (2ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3247ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2512ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3492ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5442ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4008ms)
      ✕ check 9: no tearing with auto increment (21ms)
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
