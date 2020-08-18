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
      ✓ check 1: updated properly (2160 ms)
      ✕ check 2: no tearing during update (4 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1161 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4222 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3591 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3183 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  redux-use-mutable-source
    check with events from outside
      ✓ check 1: updated properly (3218 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1193 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5265 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (7198 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3215 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (2217 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1229 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5219 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (4301 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3249 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (3200 ms)
      ✓ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1182 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5453 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (7106 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3295 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (3223 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2200 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5360 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (7197 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3115 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (2224 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1166 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4246 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3529 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3098 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (3193 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✕ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1133 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5332 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (7199 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2289 ms)
      ✕ check 9: no tearing with auto increment (19 ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3149 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1143 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4441 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (7106 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3158 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (3156 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1179 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5290 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (3508 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3166 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (3189 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1120 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (9661 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3836 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3153 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  use-enhanced-reducer
    check with events from outside
      ✓ check 1: updated properly (3354 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1207 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5371 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (7121 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3131 ms)
      ✓ check 9: no tearing with auto increment (2 ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2128 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1168 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4391 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3020 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2221 ms)
      ✕ check 9: no tearing with auto increment (2 ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (3185 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1137 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5275 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (7101 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3202 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (2141 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1180 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5366 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3524 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2139 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (3192 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2183 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5366 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (7121 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3084 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (2128 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1188 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5347 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (3622 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2118 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3323 ms)
      ✕ check 2: no tearing during update (2 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1191 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5181 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3848 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3091 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  recoil
    check with events from outside
      ✓ check 1: updated properly (3138 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1288 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4372 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (2818 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2962 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  use-atom
    check with events from outside
      ✓ check 1: updated properly (3179 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render (1 ms)
      ✓ check 4: proper update after interrupt (1118 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (9640 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (4008 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3142 ms)
      ✓ check 9: no tearing with auto increment (2 ms)
  effector
    check with events from outside
      ✓ check 1: updated properly (3295 ms)
      ✕ check 2: no tearing during update (1 ms)
      ✕ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2179 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5230 ms)
      ✕ check 6: no tearing with transition (2 ms)
      ✕ check 7: proper branching with transition (3538 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (2246 ms)
      ✕ check 9: no tearing with auto increment (20 ms)
  re-rxjs
    check with events from outside
      ✓ check 1: updated properly (3179 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1121 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5235 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✓ check 7: proper branching with transition (2857 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3117 ms)
      ✓ check 9: no tearing with auto increment (1 ms)
  rxdeep
    check with events from outside
      ✓ check 1: updated properly (3182 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1266 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5196 ms)
      ✓ check 6: no tearing with transition (1 ms)
      ✕ check 7: proper branching with transition (3600 ms)
    check with intensive auto increment
      ✓ check 8: updated properly with auto increment (3092 ms)
      ✕ check 9: no tearing with auto increment (1 ms)
  rxjs-hooks
    check with events from outside
      ✓ check 1: updated properly (3190 ms)
      ✓ check 2: no tearing during update (1 ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2237 ms)
    check with useTransition
      ✓ check 5: updated properly with transition (5360 ms)
      ✓ check 6: no tearing with transition (2 ms)
      ✓ check 7: proper branching with transition (2960 ms)
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
    <td>:question:</td>
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
    <td>:question:</td>
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
    <td>:grey_question:</td>
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
