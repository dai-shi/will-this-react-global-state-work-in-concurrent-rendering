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

- Normal tearing in Concurrent Mode (check 1-4)
- Tearing and state branching with useTransition (check 5-7)

## Results

<details>
<summary>Raw Output</summary>

```
  react-redux
    check with events from outside
      ✓ check 1: updated properly (3229ms)
      ✕ check 2: no tearing during update (22ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1402ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2540ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5400ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3183ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1302ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2447ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7429ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (8630ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2193ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3510ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (2501ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8623ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1137ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4659ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (4473ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3226ms)
      ✕ check 2: no tearing during update (20ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1486ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2508ms)
      ✕ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5435ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (4242ms)
      ✕ check 2: no tearing during update (23ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1446ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2637ms)
      ✓ check 6: no tearing with transition (20ms)
      ✕ check 7: proper branching with transition (7415ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3220ms)
      ✕ check 2: no tearing during update (20ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1432ms)
    check with useTransition
      ✕ check 5: updated properly with transition (2662ms)
      ✓ check 6: no tearing with transition (19ms)
      ✕ check 7: proper branching with transition (7405ms)
  react-hooks-global-state-1
    check with events from outside
      ✓ check 1: updated properly (8197ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2189ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3501ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5438ms)
  react-hooks-global-state-2
    check with events from outside
      ✓ check 1: updated properly (8313ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2450ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3505ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (4505ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8601ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2399ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3510ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3664ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2770ms)
      ✕ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1314ms)
    check with useTransition
      ✓ check 5: updated properly with transition (2628ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5584ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8247ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2112ms)
    check with useTransition
      ✓ check 5: updated properly with transition (4568ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7429ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8212ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1250ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3613ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (6440ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (8188ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2412ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3543ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (3601ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (8220ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1289ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3480ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5418ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3354ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (4649ms)
    check with useTransition
      ✓ check 5: updated properly with transition (3498ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5449ms)
```

</details>

<table>
  <tr>
    <th></th>
    <th>check 1: updated properly</th>
    <th>check 2: no tearing during update</th>
    <th>check 3: ability to interrupt render</th>
    <th>check 4: proper update after interrupt</th>
    <th>check 5: updated properly with transition</th>
    <th>check 6: no tearing with transition</th>
    <th>check 7: proper branching with transition</th>
  </tr>

  <tr>
    <th><a href="https://react-redux.js.org">react-redux</a></th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  <tr>
    <th><a href="https://github.com/dai-shi/reactive-react-redux">reactive-react-redux</a></th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th><a href="https://react-tracked.js.org">react-tracked</a></th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th><a href="https://github.com/diegohaz/constate">constate</a></th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th><a href="https://github.com/react-spring/zustand">zustand</a></th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th><a href="https://github.com/atlassian/react-sweet-state">react-sweet-state</a></th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail (slow pending)</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th><a href="https://github.com/storeon/storeon">storeon</a></th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail (slow pending)</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a> (w/ useGlobalStateProvider)</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th><a href="https://github.com/mobxjs/mobx-react-lite">mobx-react-lite</a></th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  <tr>
    <th><a href="https://mobx.js.org/">Mobx</a> (w/ use-subscription)</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>
  <tr>
    <th>React State</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  <tr>
    <th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  <tr>
    <th><a href="https://github.com/apollographql/react-apollo">react-apollo</a></th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
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
