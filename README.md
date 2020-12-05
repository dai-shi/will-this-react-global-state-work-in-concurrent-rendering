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
      ✓ check 1: updated properly (3352 ms)
      ✕ check 2: no tearing during update (4 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1166 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2386 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5942 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3193 ms)
      ✕ check 9: no tearing with auto increment (4 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (3222 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1199 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2371 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6125 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3292 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (2210 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1153 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2383 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5970 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3286 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (4297 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2224 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2548 ms)
      ✓ check 6: no tearing with transition (20 ms)
      ✓ check 7: proper branching with transition (5677 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4356 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (3230 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1178 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2540 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (3251 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3112 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3166 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1167 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2352 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5963 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3199 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (4199 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✕ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1195 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3283 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6082 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2262 ms)
      ✕ check 9: no tearing with auto increment (22 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3202 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2158 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2496 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6084 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3215 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (2195 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1124 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2525 ms)
      ✓ check 6: no tearing with transition (20 ms)
      ✕ check 7: proper branching with transition (6244 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3192 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (3241 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2255 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2519 ms)
      ✓ check 6: no tearing with transition (20 ms)
      ✓ check 7: proper branching with transition (5435 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4309 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (3253 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1188 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2506 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (3195 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3141 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2208 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1142 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2478 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6100 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2126 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (3234 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1195 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2556 ms)
      ✓ check 6: no tearing with transition (21 ms)
      ✕ check 7: proper branching with transition (6206 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3285 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (3217 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1253 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2649 ms)
      ✓ check 6: no tearing with transition (19 ms)
      ✕ check 7: proper branching with transition (6239 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2143 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (3227 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1212 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2505 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (3267 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3133 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (2185 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1144 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2509 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6106 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2117 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3252 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1173 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3262 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6020 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3029 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (3253 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1159 ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2550 ms)
      ✓ check 6: no tearing with transition (20 ms)
      ✕ check 7: proper branching with transition (6242 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3142 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  jotai
    check with events from outside
      ✓ check 1: updated properly (2240 ms)
      ✓ check 2: no tearing during update (21 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1319 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2626 ms)
      ✓ check 6: no tearing with transition (21 ms)
      ✕ check 7: proper branching with transition (6240 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2409 ms)
      ✓ check 9: no tearing with auto increment (21 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (4178 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✕ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1120 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3169 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5984 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2267 ms)
      ✕ check 9: no tearing with auto increment (19 ms)
  react-rxjs
    check with events from outside
      ✓ check 1: updated properly (3241 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1118 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2368 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5962 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3139 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (3194 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1222 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2364 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5996 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3134 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (3239 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1199 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3350 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6138 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3165 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rx-store
    check with events from outside
      ✓ check 1: updated properly (3187 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1210 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3381 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6079 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3034 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  klyva
    check with events from outside
      ✓ check 1: updated properly (3238 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1126 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2585 ms)
      ✓ check 6: no tearing with transition (20 ms)
      ✕ check 7: proper branching with transition (6245 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3232 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  valtio
    check with events from outside
      ✓ check 1: updated properly (3264 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1195 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3213 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6119 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3197 ms)
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
