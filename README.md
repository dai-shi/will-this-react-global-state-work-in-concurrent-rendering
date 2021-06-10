# Will this React global state work in concurrent rendering?

Test tearing in React concurrent rendering

## Introduction

React 18 is coming with a new feature called "concurrent rendering".
With global state, there's a theoretical issue called "tearing"
that might occur in React concurrent rendering.

Let's test the behavior!

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
yarn run jest
```

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
      ✓ check 1: updated properly (3249 ms)
      ✕ check 2: no tearing during update (5 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1162 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2313 ms)
      ✕ check 6: no tearing with transition (58 ms)
      ✕ check 7: proper branching with transition (5944 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3241 ms)
      ✕ check 9: no tearing with auto increment (5 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (3303 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1185 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2440 ms)
      ✓ check 6: no tearing with transition (191 ms)
      ✕ check 7: proper branching with transition (6247 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3290 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3427 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1238 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2411 ms)
      ✓ check 6: no tearing with transition (155 ms)
      ✕ check 7: proper branching with transition (6207 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3306 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (4340 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2298 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2511 ms)
      ✓ check 6: no tearing with transition (810 ms)
      ✓ check 7: proper branching with transition (5425 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4627 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (2354 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1304 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2396 ms)
      ✓ check 6: no tearing with transition (87 ms)
      ✓ check 7: proper branching with transition (3221 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3106 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3332 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1290 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2309 ms)
      ✕ check 6: no tearing with transition (75 ms)
      ✕ check 7: proper branching with transition (5994 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3297 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (3296 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✕ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1240 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3251 ms)
      ✓ check 6: no tearing with transition (81 ms)
      ✕ check 7: proper branching with transition (6097 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3234 ms)
      ✕ check 9: no tearing with auto increment (19 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (2313 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1237 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2452 ms)
      ✓ check 6: no tearing with transition (84 ms)
      ✕ check 7: proper branching with transition (6140 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3282 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (2319 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1133 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2391 ms)
      ✓ check 6: no tearing with transition (139 ms)
      ✕ check 7: proper branching with transition (6264 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3380 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (4411 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2303 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2611 ms)
      ✓ check 6: no tearing with transition (781 ms)
      ✓ check 7: proper branching with transition (5468 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4601 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2452 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1423 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2473 ms)
      ✕ check 6: no tearing with transition (92 ms)
      ✕ check 7: proper branching with transition (6127 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2134 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (2356 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1210 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2369 ms)
      ✓ check 6: no tearing with transition (127 ms)
      ✕ check 7: proper branching with transition (6210 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3567 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (2350 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2255 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2545 ms)
      ✓ check 6: no tearing with transition (125 ms)
      ✕ check 7: proper branching with transition (6203 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2337 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (2338 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2217 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2364 ms)
      ✓ check 6: no tearing with transition (48 ms)
      ✓ check 7: proper branching with transition (3202 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3220 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (2353 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1190 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2454 ms)
      ✓ check 6: no tearing with transition (91 ms)
      ✕ check 7: proper branching with transition (6127 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2231 ms)
      ✓ check 9: no tearing with auto increment (2 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3322 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1218 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2345 ms)
      ✓ check 6: no tearing with transition (53 ms)
      ✕ check 7: proper branching with transition (6021 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3175 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (2232 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2313 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2550 ms)
      ✓ check 6: no tearing with transition (886 ms)
      ✕ check 7: proper branching with transition (6079 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3219 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  jotai
    check with events from outside
      ✓ check 1: updated properly (2304 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2237 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2409 ms)
      ✓ check 6: no tearing with transition (192 ms)
      ✕ check 7: proper branching with transition (6238 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3393 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (3298 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✕ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1171 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3110 ms)
      ✕ check 6: no tearing with transition (48 ms)
      ✕ check 7: proper branching with transition (5977 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3165 ms)
      ✕ check 9: no tearing with auto increment (16 ms)
  react-rxjs
    check with events from outside
      ✓ check 1: updated properly (2350 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1188 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2269 ms)
      ✓ check 6: no tearing with transition (46 ms)
      ✕ check 7: proper branching with transition (5957 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3259 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (2241 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1296 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2289 ms)
      ✓ check 6: no tearing with transition (87 ms)
      ✕ check 7: proper branching with transition (5997 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3223 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (3343 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2299 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2496 ms)
      ✓ check 6: no tearing with transition (51 ms)
      ✕ check 7: proper branching with transition (5964 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3383 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rx-store
    check with events from outside
      ✓ check 1: updated properly (3354 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1194 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2475 ms)
      ✓ check 6: no tearing with transition (65 ms)
      ✕ check 7: proper branching with transition (6073 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3145 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  klyva
    check with events from outside
      ✓ check 1: updated properly (2294 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1181 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2407 ms)
      ✓ check 6: no tearing with transition (163 ms)
      ✕ check 7: proper branching with transition (6252 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3580 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  valtio
    check with events from outside
      ✓ check 1: updated properly (2265 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (2335 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2339 ms)
      ✓ check 6: no tearing with transition (92 ms)
      ✕ check 7: proper branching with transition (5980 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3419 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-tagged-state
    check with events from outside
      ✓ check 1: updated properly (3160 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1083 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2361 ms)
      ✓ check 6: no tearing with transition (62 ms)
      ✕ check 7: proper branching with transition (5982 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3075 ms)
      ✓ check 9: no tearing with auto increment (11 ms)

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

  <tr>
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

  <tr>
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

  <tr>
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

  <tr>
    <th><a href="https://github.com/atlassian/react-sweet-state">react-sweet-state</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:question:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
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

  <tr>
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

  <tr>
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

  <tr>
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
    <td>:white_check_mark:</td>
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
    <td>:x:</td>
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

  <tr>
    <th><a href="https://github.com/oleggrishechkin/react-tagged-state">react-tagged-state</a></th>
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

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)
- and so on

## Contributing

This repository is a tool for us to test some of global state libraries.
While it is totally fine to use the tool for other libraries under the license,
we don't generally accept adding a new library to the repository.

However, we are interested in various approaches.
If you have any suggestions feel free to open issues or pull requests.
We may consider adding (and removing) libraries.
Questions and discussions are also welcome in issues.

For listing global state libraries, we have another repository
https://github.com/dai-shi/lets-compare-global-state-with-react-hooks
in which we accept contributions. It's recommended to run this tool
and we put the result there, possibly a reference link to a PR
in this repository or a fork of this repository.
