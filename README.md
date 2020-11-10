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
      ✓ check 1: updated properly (3149 ms)
      ✕ check 2: no tearing during update (4 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1178 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4245 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6004 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3115 ms)
      ✕ check 9: no tearing with auto increment (3 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (3176 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1091 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5235 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6092 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3200 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3179 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1173 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5236 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5975 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3220 ms)
      ✕ check 9: no tearing with auto increment
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (3179 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1169 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5364 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (4239 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3200 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (3174 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1149 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5365 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4233 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3072 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3138 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1099 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4224 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5956 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3101 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (4141 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✕ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1099 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5350 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6111 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2234 ms)
      ✕ check 9: no tearing with auto increment (21 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3137 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1102 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4374 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6113 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3157 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (3174 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1168 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5235 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5977 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3147 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (3180 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1170 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5346 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (4222 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3205 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (3171 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1085 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5365 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4229 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3075 ms)
      ✓ check 9: no tearing with auto increment
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2133 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1091 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4378 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6113 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2021 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (3171 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1167 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5228 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6107 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3203 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (2135 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1150 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5366 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6117 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2088 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (3172 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1167 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5368 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4229 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3083 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (3180 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1165 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5366 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6112 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2085 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3128 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1180 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5221 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5994 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2979 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (3177 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2226 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5370 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6115 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3074 ms)
      ✓ check 9: no tearing with auto increment
  jotai
    check with events from outside
      ✓ check 1: updated properly (2266 ms)
      ✓ check 2: no tearing during update (21 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1275 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4384 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6120 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2330 ms)
      ✓ check 9: no tearing with auto increment (21 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (4144 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✕ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1102 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5235 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5982 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2247 ms)
      ✕ check 9: no tearing with auto increment (20 ms)
  react-rxjs
    check with events from outside
      ✓ check 1: updated properly (3168 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1163 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5237 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5980 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3097 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (3131 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1166 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5242 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5963 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3042 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (3185 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1175 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5366 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6119 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3088 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rx-store
    check with events from outside
      ✓ check 1: updated properly (3132 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1095 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5371 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6096 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3000 ms)
      ✓ check 9: no tearing with auto increment
  klyva
    check with events from outside
      ✓ check 1: updated properly (3130 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1151 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5184 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5964 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3092 ms)
      ✕ check 9: no tearing with auto increment (4 ms)
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
