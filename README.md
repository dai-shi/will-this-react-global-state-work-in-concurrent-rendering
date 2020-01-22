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
      ✓ check 1: updated properly (3278ms)
      ✕ check 2: no tearing during update (22ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1496ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2536ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5430ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3182ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1361ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2476ms)
      ✓ check 6: no tearing with transition (5ms)
      ✕ check 7: proper branching with transition (7427ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (8379ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2462ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3532ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3716ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8146ms)
      ✓ check 2: no tearing during update
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1134ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4692ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (4512ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3257ms)
      ✕ check 2: no tearing during update (24ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1465ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2520ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5425ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (11066ms)
      ✕ check 2: no tearing during update (1ms)
      ✕ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2426ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (3980ms)
      ✕ check 6: no tearing with transition (40ms)
      ✕ check 7: proper branching with transition (8695ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3237ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1476ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (2646ms)
      ✓ check 6: no tearing with transition (19ms)
      ✕ check 7: proper branching with transition (7421ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (8373ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2447ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3531ms)
      ✓ check 6: no tearing with transition (4ms)
      ✓ check 7: proper branching with transition (3712ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8383ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1349ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3551ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3617ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2885ms)
      ✕ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1337ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2632ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5565ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8657ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2378ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4595ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7426ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8387ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2444ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3646ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (6440ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (8404ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2273ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3570ms)
      ✓ check 6: no tearing with transition (4ms)
      ✓ check 7: proper branching with transition (2522ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (8445ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1139ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3561ms)
      ✓ check 6: no tearing with transition (6ms)
      ✕ check 7: proper branching with transition (5404ms)
  react-apollo
    check with events from outside
      ✓ check 1: updated properly (3380ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✕ check 4: proper update after interrupt (5189ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3528ms)
      ✕ check 6: no tearing with transition (6ms)
      ✕ check 7: proper branching with transition (5455ms)
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
