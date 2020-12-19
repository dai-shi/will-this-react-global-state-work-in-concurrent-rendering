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
- Some other resources
  - https://github.com/reactjs/rfcs/pull/147
  - https://gist.github.com/bvaughn/054b82781bec875345bd85a5b1344698

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
  - check 9: no tearing with auto increment (currently, it's not really what is intended to test)

## Results

<details>
<summary>Raw Output</summary>

```
  react-redux
    check with events from outside
      ✓ check 1: updated properly (2238 ms)
      ✕ check 2: no tearing during update (4 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1207 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2315 ms)
      ✕ check 6: no tearing with transition (94 ms)
      ✕ check 7: proper branching with transition (5972 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3241 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (2213 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1231 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2290 ms)
      ✓ check 6: no tearing with transition (86 ms)
      ✕ check 7: proper branching with transition (6066 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3316 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3334 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2257 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2303 ms)
      ✓ check 6: no tearing with transition (96 ms)
      ✕ check 7: proper branching with transition (5936 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3316 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (3349 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2253 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2493 ms)
      ✓ check 6: no tearing with transition (842 ms)
      ✓ check 7: proper branching with transition (5450 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4313 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (3252 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1232 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2502 ms)
      ✓ check 6: no tearing with transition (89 ms)
      ✓ check 7: proper branching with transition (3275 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3761 ms)
      ✓ check 9: no tearing with auto increment (2 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (2887 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1404 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2316 ms)
      ✕ check 6: no tearing with transition (81 ms)
      ✕ check 7: proper branching with transition (5937 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3942 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (3668 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (2739 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3663 ms)
      ✓ check 6: no tearing with transition (85 ms)
      ✕ check 7: proper branching with transition (6161 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2579 ms)
      ✕ check 9: no tearing with auto increment (20 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (2548 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1561 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2505 ms)
      ✓ check 6: no tearing with transition (87 ms)
      ✕ check 7: proper branching with transition (6072 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4200 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (4228 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1487 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2446 ms)
      ✓ check 6: no tearing with transition (207 ms)
      ✕ check 7: proper branching with transition (6332 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4025 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (4111 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2778 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2461 ms)
      ✓ check 6: no tearing with transition (1390 ms)
      ✓ check 7: proper branching with transition (6169 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (5177 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (2735 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1298 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2440 ms)
      ✓ check 6: no tearing with transition (79 ms)
      ✓ check 7: proper branching with transition (4031 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3469 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2451 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1363 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2516 ms)
      ✕ check 6: no tearing with transition (79 ms)
      ✕ check 7: proper branching with transition (6217 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2400 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (2930 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1456 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2445 ms)
      ✓ check 6: no tearing with transition (243 ms)
      ✕ check 7: proper branching with transition (6346 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3707 ms)
      ✕ check 9: no tearing with auto increment (3 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (2444 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1192 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2458 ms)
      ✓ check 6: no tearing with transition (214 ms)
      ✕ check 7: proper branching with transition (6269 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2645 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (3462 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1521 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2648 ms)
      ✓ check 6: no tearing with transition (84 ms)
      ✓ check 7: proper branching with transition (3768 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3709 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (2265 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1215 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2439 ms)
      ✓ check 6: no tearing with transition (83 ms)
      ✕ check 7: proper branching with transition (6123 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2177 ms)
      ✓ check 9: no tearing with auto increment
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3276 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1207 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2444 ms)
      ✕ check 6: no tearing with transition (789 ms)
      ✕ check 7: proper branching with transition (6008 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3050 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (2208 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2218 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2549 ms)
      ✓ check 6: no tearing with transition (827 ms)
      ✕ check 7: proper branching with transition (6109 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3165 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  jotai
    check with events from outside
      ✓ check 1: updated properly (2320 ms)
      ✓ check 2: no tearing during update (20 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1309 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2587 ms)
      ✓ check 6: no tearing with transition (147 ms)
      ✕ check 7: proper branching with transition (6247 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2443 ms)
      ✓ check 9: no tearing with auto increment (22 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (3300 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2158 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3137 ms)
      ✕ check 6: no tearing with transition (77 ms)
      ✕ check 7: proper branching with transition (5997 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2341 ms)
      ✕ check 9: no tearing with auto increment (18 ms)
  react-rxjs
    check with events from outside
      ✓ check 1: updated properly (3293 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1235 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2316 ms)
      ✓ check 6: no tearing with transition (46 ms)
      ✕ check 7: proper branching with transition (5933 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3215 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (3197 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (2180 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2329 ms)
      ✓ check 6: no tearing with transition (43 ms)
      ✕ check 7: proper branching with transition (5941 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3240 ms)
      ✕ check 9: no tearing with auto increment (3 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (3303 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1309 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2552 ms)
      ✓ check 6: no tearing with transition (848 ms)
      ✕ check 7: proper branching with transition (6123 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3158 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rx-store
    check with events from outside
      ✓ check 1: updated properly (3179 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1182 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2509 ms)
      ✓ check 6: no tearing with transition (825 ms)
      ✕ check 7: proper branching with transition (6131 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3166 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  klyva
    check with events from outside
      ✓ check 1: updated properly (3308 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1143 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2417 ms)
      ✓ check 6: no tearing with transition (129 ms)
      ✕ check 7: proper branching with transition (6242 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3251 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  valtio
    check with events from outside
      ✓ check 1: updated properly (3315 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1256 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2399 ms)
      ✓ check 6: no tearing with transition (845 ms)
      ✕ check 7: proper branching with transition (6122 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3142 ms)
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
    <td>:x:</td>
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
    <td>:x:</td>
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
    <td>:x:</td>
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
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://react-rxjs.org">react-rxjs</a></th>
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

  <tr>
    <th><a href="https://github.com/merisbahti/klyva">klyva</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>

  <tr>
    <th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
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
