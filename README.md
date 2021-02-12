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
      ✓ check 1: updated properly (2715 ms)
      ✕ check 2: no tearing during update (3 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1550 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2342 ms)
      ✕ check 6: no tearing with transition (92 ms)
      ✕ check 7: proper branching with transition (5995 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3287 ms)
      ✕ check 9: no tearing with auto increment (3 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (3260 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1221 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2412 ms)
      ✓ check 6: no tearing with transition (127 ms)
      ✕ check 7: proper branching with transition (6223 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3242 ms)
      ✕ check 9: no tearing with auto increment (4 ms)
  reactive-react-redux
    check with events from outside
      ✕ check 1: updated properly (10400 ms)
      ✕ check 2: no tearing during update (18 ms)
      ✕ check 3: ability to interrupt render
      ✕ check 4: proper update after interrupt (38 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (4 ms)
      ✕ check 6: no tearing with transition (5022 ms)
      ✕ check 7: proper branching with transition (2 ms)
    check with intensive auto increment
      ✕ check 8: updated properly with auto increment (10059 ms)
      ✕ check 9: no tearing with auto increment (4 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (4439 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2232 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2565 ms)
      ✓ check 6: no tearing with transition (814 ms)
      ✓ check 7: proper branching with transition (5304 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4373 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (3434 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1200 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2366 ms)
      ✓ check 6: no tearing with transition (69 ms)
      ✓ check 7: proper branching with transition (3207 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3132 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3233 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1145 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2328 ms)
      ✕ check 6: no tearing with transition (79 ms)
      ✕ check 7: proper branching with transition (5966 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3154 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (3198 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✕ check 3: ability to interrupt render (7 ms)
      ✓ check 4: proper update after interrupt (1176 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3266 ms)
      ✓ check 6: no tearing with transition (73 ms)
      ✕ check 7: proper branching with transition (6095 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3146 ms)
      ✕ check 9: no tearing with auto increment (21 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3244 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1136 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2461 ms)
      ✓ check 6: no tearing with transition (39 ms)
      ✕ check 7: proper branching with transition (6120 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3187 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (2171 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1210 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2410 ms)
      ✓ check 6: no tearing with transition (167 ms)
      ✕ check 7: proper branching with transition (6300 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3248 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (4337 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (3251 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2556 ms)
      ✓ check 6: no tearing with transition (799 ms)
      ✓ check 7: proper branching with transition (5391 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4385 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (2266 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1185 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2462 ms)
      ✓ check 6: no tearing with transition (80 ms)
      ✓ check 7: proper branching with transition (3220 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3100 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2197 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1164 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2473 ms)
      ✕ check 6: no tearing with transition (42 ms)
      ✕ check 7: proper branching with transition (6122 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2081 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (3227 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1275 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2389 ms)
      ✓ check 6: no tearing with transition (169 ms)
      ✕ check 7: proper branching with transition (6291 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3290 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (2161 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1182 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2555 ms)
      ✓ check 6: no tearing with transition (171 ms)
      ✕ check 7: proper branching with transition (6240 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2171 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (3230 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1189 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2448 ms)
      ✓ check 6: no tearing with transition (42 ms)
      ✓ check 7: proper branching with transition (3239 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3118 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (2208 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2198 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2439 ms)
      ✓ check 6: no tearing with transition (41 ms)
      ✕ check 7: proper branching with transition (6090 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2238 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3207 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2192 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2351 ms)
      ✓ check 6: no tearing with transition (80 ms)
      ✕ check 7: proper branching with transition (6017 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3034 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (2428 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2280 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2556 ms)
      ✓ check 6: no tearing with transition (815 ms)
      ✕ check 7: proper branching with transition (6119 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3178 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  jotai
    check with events from outside
      ✓ check 1: updated properly (3417 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (3241 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2548 ms)
      ✓ check 6: no tearing with transition (842 ms)
      ✕ check 7: proper branching with transition (6138 ms)
    check with intensive auto increment
      ✕ check 8: updated properly with auto increment (10211 ms)
      ✓ check 9: no tearing with auto increment (3 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (3413 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1165 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3133 ms)
      ✕ check 6: no tearing with transition (45 ms)
      ✕ check 7: proper branching with transition (5993 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3185 ms)
      ✕ check 9: no tearing with auto increment (21 ms)
  react-rxjs
    check with events from outside
      ✓ check 1: updated properly (3308 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1212 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2282 ms)
      ✓ check 6: no tearing with transition (77 ms)
      ✕ check 7: proper branching with transition (5994 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3307 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (2552 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1201 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2320 ms)
      ✓ check 6: no tearing with transition (70 ms)
      ✕ check 7: proper branching with transition (5965 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3133 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (2212 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1114 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2463 ms)
      ✓ check 6: no tearing with transition (42 ms)
      ✕ check 7: proper branching with transition (5998 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3213 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rx-store
    check with events from outside
      ✓ check 1: updated properly (3289 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1242 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2445 ms)
      ✓ check 6: no tearing with transition (40 ms)
      ✕ check 7: proper branching with transition (6116 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3093 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  klyva
    check with events from outside
      ✓ check 1: updated properly (2258 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1174 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2396 ms)
      ✓ check 6: no tearing with transition (143 ms)
      ✕ check 7: proper branching with transition (6242 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3263 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  valtio
    check with events from outside
      ✓ check 1: updated properly (2346 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1178 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2305 ms)
      ✓ check 6: no tearing with transition (42 ms)
      ✕ check 7: proper branching with transition (5960 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3356 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
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
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
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
    <td>:question:</td>
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
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
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
