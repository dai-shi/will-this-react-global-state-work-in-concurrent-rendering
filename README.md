# Will this React global state work in concurrent mode?

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
      ✓ check 1: updated properly (3195ms)
      ✕ check 2: no tearing during update (23ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1405ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4506ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5439ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3112ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1399ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4481ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (7423ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (8799ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2135ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (5534ms)
      ✓ check 6: no tearing with transition (3ms)
      ✓ check 7: proper branching with transition (3757ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8167ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2304ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (6606ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (3472ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3191ms)
      ✕ check 2: no tearing during update (22ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1426ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4518ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5442ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (10589ms)
      ✕ check 2: no tearing during update (1ms)
      ✕ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (2423ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (8610ms)
      ✕ check 6: no tearing with transition (3ms)
      ✕ check 7: proper branching with transition (7570ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3220ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1489ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4650ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7426ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (8848ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1320ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (5495ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7326ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8333ms)
      ✓ check 2: no tearing during update (3ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2155ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (5524ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3499ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2934ms)
      ✕ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1302ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4647ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5585ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8602ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1281ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (6527ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7425ms)
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
    <th>react-redux</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  <tr>
    <th>reactive-react-redux</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>react-tracked</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>constate</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>zustand</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>react-sweet-state</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fair (just a little bit slow)</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>storeon</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>react-hooks-global-state</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>use-context-selector (w/ useReducer)</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>

  </tr>
    <th>mobx-react-lite</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>use-subscription (w/ redux)</th>
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
