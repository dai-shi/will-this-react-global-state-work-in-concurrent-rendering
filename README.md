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
      ✓ check 1: updated properly (3232ms)
      ✕ check 2: no tearing during update (23ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1477ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2584ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5441ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3140ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1247ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2487ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (7411ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (8811ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1332ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3537ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (2512ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8548ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2358ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3618ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (4494ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3289ms)
      ✕ check 2: no tearing during update (20ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1459ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2513ms)
      ✕ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5500ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (10535ms)
      ✕ check 2: no tearing during update (1ms)
      ✕ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2416ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (3875ms)
      ✕ check 6: no tearing with transition (40ms)
      ✕ check 7: proper branching with transition (8700ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3183ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1425ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (2641ms)
      ✓ check 6: no tearing with transition (20ms)
      ✕ check 7: proper branching with transition (7425ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (8195ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1271ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3541ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (2643ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8173ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2288ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3504ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (2680ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2878ms)
      ✕ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1357ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2656ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5585ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8171ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1097ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3525ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7425ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8544ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2207ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3625ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (6463ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (8805ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1302ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3507ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (2512ms)
  simplux
    check with events from outside
      ✓ check 1: updated properly (8834ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2193ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3514ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (5442ms)
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
