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
      ✓ check 1: updated properly (3201ms)
      ✕ check 2: no tearing during update (23ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1387ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2527ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5444ms)
  reactive-react-redux
    check with events from outside
      ✓ check 1: updated properly (3169ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1179ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2462ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7450ms)
  react-tracked
    check with events from outside
      ✓ check 1: updated properly (7851ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2323ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3531ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (3584ms)
  constate
    check with events from outside
      ✓ check 1: updated properly (8586ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2325ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4671ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (4533ms)
  zustand
    check with events from outside
      ✓ check 1: updated properly (3181ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1413ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2544ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5426ms)
  react-sweet-state
    check with events from outside
      ✓ check 1: updated properly (11104ms)
      ✕ check 2: no tearing during update (1ms)
      ✕ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2344ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (3968ms)
      ✕ check 6: no tearing with transition (37ms)
      ✕ check 7: proper branching with transition (8684ms)
  storeon
    check with events from outside
      ✓ check 1: updated properly (3152ms)
      ✕ check 2: no tearing during update (21ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1438ms)
    check with useTransaction
      ✕ check 5: updated properly with transition (2658ms)
      ✓ check 6: no tearing with transition (19ms)
      ✕ check 7: proper branching with transition (7419ms)
  react-hooks-global-state
    check with events from outside
      ✓ check 1: updated properly (8612ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (1099ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3500ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7335ms)
  use-context-selector
    check with events from outside
      ✓ check 1: updated properly (8620ms)
      ✓ check 2: no tearing during update (2ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2380ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3532ms)
      ✓ check 6: no tearing with transition (2ms)
      ✓ check 7: proper branching with transition (2693ms)
  mobx-react-lite
    check with events from outside
      ✓ check 1: updated properly (2836ms)
      ✕ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1247ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (2629ms)
      ✕ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (5583ms)
  mobx-use-sub
    check with events from outside
      ✓ check 1: updated properly (8644ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render (1ms)
      ✓ check 4: proper update after interrupt (1145ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3528ms)
      ✓ check 6: no tearing with transition (2ms)
      ✕ check 7: proper branching with transition (6437ms)
  use-subscription
    check with events from outside
      ✓ check 1: updated properly (8579ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2440ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (4536ms)
      ✓ check 6: no tearing with transition (1ms)
      ✕ check 7: proper branching with transition (7426ms)
  react-state
    check with events from outside
      ✓ check 1: updated properly (8118ms)
      ✓ check 2: no tearing during update (1ms)
      ✓ check 3: ability to interrupt render
      ✓ check 4: proper update after interrupt (2141ms)
    check with useTransaction
      ✓ check 5: updated properly with transition (3417ms)
      ✓ check 6: no tearing with transition (1ms)
      ✓ check 7: proper branching with transition (2435ms)
  simplux
    check with events from outside
      √ check 1: updated properly (8570ms)
      √ check 2: no tearing during update (1ms)
      √ check 3: ability to interrupt render
      √ check 4: proper update after interrupt (2381ms)
    check with useTransaction
      √ check 5: updated properly with transition (3510ms)
      √ check 6: no tearing with transition (2ms)
      × check 7: proper branching with transition (5459ms)
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
    <td>Fail (slow pending)</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>

  </tr>
    <th>storeon</th>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail (slow pending)</td>
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

  <tr>
    <th>Mobx (w/use-subscription)</th>
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
