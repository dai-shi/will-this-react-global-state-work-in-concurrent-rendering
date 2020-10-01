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
      ✓ check 1: updated properly (3357 ms)
      ✕ check 2: no tearing during update (4 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1168 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4278 ms)
      ✕ check 6: no tearing with transition (3 ms)
      ✕ check 7: proper branching with transition (5985 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3269 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (3259 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1240 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5291 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6057 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3319 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3303 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1158 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5322 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6004 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3396 ms)
      ✕ check 9: no tearing with auto increment (3 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (3414 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (2268 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5467 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (4349 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3368 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (2197 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1244 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5562 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4375 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3223 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (2297 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1246 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4268 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5986 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3208 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (3320 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✕ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1204 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5401 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6098 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2307 ms)
      ✕ check 9: no tearing with auto increment (20 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3273 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1199 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4431 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6120 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3214 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (3299 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1154 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5261 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5968 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3266 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (2300 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1212 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5402 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4337 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3290 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (2279 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1174 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5409 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (4299 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3214 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2203 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1222 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4430 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6105 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2055 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (2197 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1236 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5264 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6102 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3268 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (2220 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1178 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5430 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6076 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2276 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (3293 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1204 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5439 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (4340 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3123 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (2158 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1192 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5412 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6122 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2146 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3213 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2214 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5326 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5999 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3150 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (3294 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2250 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5402 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (6148 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3148 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  jotai
    check with events from outside
      ✓ check 1: updated properly (9798 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2310 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (6392 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (5959 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (4275 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (4324 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✕ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1175 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5272 ms)
      ✕ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5915 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2348 ms)
      ✕ check 9: no tearing with auto increment (21 ms)
  re-rxjs
    check with events from outside
      ✓ check 1: updated properly (3372 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1172 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5378 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5993 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3216 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (3257 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1238 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5240 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (5963 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3135 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (2248 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1160 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5377 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6096 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3122 ms)
      ✓ check 9: no tearing with auto increment (2 ms)
  rx-store
    check with events from outside
      ✓ check 1: updated properly (3198 ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1223 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5417 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (6128 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3061 ms)
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
    <td>:x:</td>
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
