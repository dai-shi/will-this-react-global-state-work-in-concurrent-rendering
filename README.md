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
    ✓ check1: updated properly (1663ms)
    ✕ check2: no tearing during update (15ms)
    ✓ check3: ability to interrupt render
    ✕ check4: proper update after interrupt (5106ms)
  reactive-react-redux
    ✓ check1: updated properly (2215ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (866ms)
  react-tracked
    ✓ check1: updated properly (2949ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render (1ms)
    ✓ check4: proper update after interrupt (893ms)
  constate
    ✓ check1: updated properly (3845ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render (1ms)
    ✓ check4: proper update after interrupt (826ms)
  unstated-next
    ✓ check1: updated properly (2938ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (793ms)
  zustand
    ✓ check1: updated properly (1604ms)
    ✕ check2: no tearing during update (14ms)
    ✓ check3: ability to interrupt render (1ms)
    ✕ check4: proper update after interrupt (5112ms)
  react-sweet-state
    ✓ check1: updated properly (2894ms)
    ✕ check2: no tearing during update (26ms)
    ✓ check3: ability to interrupt render
    ✕ check4: proper update after interrupt (5159ms)
  storeon
    ✓ check1: updated properly (1614ms)
    ✕ check2: no tearing during update (14ms)
    ✓ check3: ability to interrupt render
    ✕ check4: proper update after interrupt (5108ms)
  react-hooks-global-state
    ✓ check1: updated properly (3577ms)
    ✓ check2: no tearing during update (1ms)
    ✓ check3: ability to interrupt render
    ✓ check4: proper update after interrupt (786ms)
  use-context-selector
    ✓ check1: updated properly (3792ms)
    ✓ check2: no tearing during update (3ms)
    ✓ check3: ability to interrupt render (1ms)
    ✓ check4: proper update after interrupt (769ms)
  mobx-react-lite
    ✕ check1: updated properly (20841ms)
    ✕ check2: no tearing during update (2ms)
    ✓ check3: ability to interrupt render (1ms)
    ✕ check4: proper update after interrupt (5074ms)
  use-subscription
    ✓ check1: updated properly (2285ms)
    ✕ check2: no tearing during update (14ms)
    ✓ check3: ability to interrupt render
    ✕ check4: proper update after interrupt (5108ms)

```

</details>

<table>
  <tr>
    <th></th>
    <th>react-redux</th>
    <th>reactive-react-redux</th>
    <th>react-tracked</th>
    <th>constate</th>
    <th>unstated-next</th>
    <th>zustand</th>
    <th>react-sweet-state</th>
    <th>storeon</th>
    <th>react-hooks-global-state</th>
    <th>use-context-selector</th>
    <th>mobx-react-lite</th>
    <th>use-subscription (w/ redux)</th>
  </tr>
  <tr>
    <th>check1: updated properly</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Pass</td>
  </tr>
  <tr>
    <th>check2: no tearing during update</th>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
  </tr>
  <tr>
    <th>check3: ability to interrupt render</th>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
  </tr>
  <tr>
    <th>check4: proper update after interrupt</th>
    <td>Fail</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Fail</td>
    <td>Fail</td>
    <td>Pass</td>
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
