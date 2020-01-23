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
npm install
npm run build-all
PORT=8080 npm run http-server &
PORT=8080 npm run jest
```

You can also test it by opening `http://localhost:8080/react-redux`
in your browser, and click the button very quickly. (check the console log)

## Screencast

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Result

<details>
<summary>Raw Output</summary>

```
  react-redux
    check with events from outside
      ✓ check 1: updated properly (3263ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1505ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2606ms)
      ✕ check 6: no tearing with transition (4ms)
      ✕ check 7: proper branching with transition (5395ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3315ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1316ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2526ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (7468ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (8546ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1181ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3601ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (2581ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8339ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1253ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4739ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3569ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3192ms)
      ✕ check 2: no tearing during update (18ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1441ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2591ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5406ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (11190ms)
      ✕ check 2: no tearing during update (2ms)
      ✕ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1281ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (4359ms)
      ✕ check 6: no tearing with transition (40ms)
      ✕ check 7: proper branching with transition (7762ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3502ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1383ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (2708ms)
      ✓ check 6: no tearing with transition (20ms)
      ✕ check 7: proper branching with transition (7453ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (8540ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2379ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3635ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (4485ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8562ms)
      ✓ check 2: no tearing during update (4ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2383ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3547ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3569ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2922ms)
      ✕ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1323ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2688ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5554ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8588ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2369ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3550ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7422ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8221ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2378ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3658ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (6440ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (8351ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2199ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3516ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (3588ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (8820ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2562ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3500ms)
      ✓ check 6: no tearing with transition (3ms)
      ✕ check 7: proper branching with transition (5424ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3480ms)
      ✕ check 2: no tearing during update (20ms)
      ✓ check 3: ability to interrupt render
      ✕ check 4: proper update after interrupt (5187ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3537ms)
      ✕ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5445ms)
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
    <td>Fair (just a little bit slow)</td>
    <td>Pass</td>
    <td>Fail (slow pending)</td>
    <td>Fail</td>
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
    <td>Fail</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>
</table>

## Caution

Do no believe the result too much.
The test is done in a very limited way.
Something might be wrong.

## Caution2

We are not yet sure what the final conurrent mode would be.
It's likely that there could be some issues other than "tearing."

## If you are interested

The reason why I created this is to promote my projects!

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)

The feature of these libraries is not only concurrent mode friendly,
but also state usage tracking.
