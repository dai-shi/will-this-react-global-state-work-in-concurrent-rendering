# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

## Introduction

React 18 is coming with a new feature called "concurrent rendering".
With global state, there's a theoretical issue called "tearing"
that might occur in React concurrent rendering.

Let's test the behavior!

## What is tearing?

- [What is tearing in React 18 WG](https://github.com/reactwg/react-18/discussions/69)
- [Stack Overflow](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux)
- [Talk by Mark Erikson](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&t=933s)
- [Talk by Flarnie Marchan](https://www.youtube.com/watch?v=V1Ly-8Z1wQA&t=1079s)
- Some other resources
  - https://github.com/reactjs/rfcs/pull/147
  - https://gist.github.com/bvaughn/054b82781bec875345bd85a5b1344698

## What is branching?

- Old resources
  - https://reactjs.org/docs/concurrent-mode-intro.html

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
git clone https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-rendering.git
cd will-this-react-global-state-work-in-concurrent-rendering
yarn install
yarn run build-all
yarn run jest
```

## Screencast (old)

<img src="https://user-images.githubusercontent.com/490574/61502196-ce109200-aa0d-11e9-9efc-6203545d367c.gif" alt="Preview" width="350" />

## Test scenario

- with useTransition
  - test 1: updated properly with transition
  - test 2: no tearing with transition
  - test 3: ability to interrupt render
  - test 4: proper branching with transition
- with intensive auto increment (EXPERIMENTAL)
  - test 5: updated properly with auto increment
  - test 6: no tearing with auto increment

## Results

<details>
<summary>Raw Output</summary>

```
  react-redux
    with useTransition
      ✓ test 1: updated properly with transition (2711 ms)
      ✕ test 2: no tearing with transition (56 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7201 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (2230 ms)
      ✕ test 6: no tearing with auto increment (1 ms)
  redux-use-mutable-source
    with useTransition
      ✓ test 1: updated properly with transition (2745 ms)
      ✓ test 2: no tearing with transition (122 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7512 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (2229 ms)
      ✕ test 6: no tearing with auto increment (1 ms)
  reactive-react-redux
    with useTransition
      ✓ test 1: updated properly with transition (2738 ms)
      ✓ test 2: no tearing with transition (121 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7536 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (2205 ms)
      ✕ test 6: no tearing with auto increment (1 ms)
  react-tracked
    with useTransition
      ✓ test 1: updated properly with transition (3632 ms)
      ✓ test 2: no tearing with transition (29 ms)
      ✓ test 3: ability to interrupt render
      ✓ test 4: proper branching with transition (5411 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (6182 ms)
      ✓ test 6: no tearing with auto increment (1 ms)
  constate
    with useTransition
      ✓ test 1: updated properly with transition (2863 ms)
      ✓ test 2: no tearing with transition (46 ms)
      ✓ test 3: ability to interrupt render
      ✓ test 4: proper branching with transition (3396 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (4006 ms)
      ✓ test 6: no tearing with auto increment (1 ms)
  zustand
    with useTransition
      ✓ test 1: updated properly with transition (2653 ms)
      ✕ test 2: no tearing with transition (46 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7211 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (2208 ms)
      ✕ test 6: no tearing with auto increment (1 ms)
  react-hooks-global-state
    with useTransition
      ✓ test 1: updated properly with transition (3496 ms)
      ✓ test 2: no tearing with transition (25 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7211 ms)
    with intensive auto increment
      ✕ test 5: updated properly with auto increment (13189 ms)
      ✕ test 6: no tearing with auto increment (4 ms)
  use-context-selector
    with useTransition
      ✓ test 1: updated properly with transition (3626 ms)
      ✓ test 2: no tearing with transition (31 ms)
      ✓ test 3: ability to interrupt render
      ✓ test 4: proper branching with transition (5422 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (6149 ms)
      ✓ test 6: no tearing with auto increment (1 ms)
  use-subscription
    with useTransition
      ✓ test 1: updated properly with transition (3531 ms)
      ✓ test 2: no tearing with transition (122 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7531 ms)
    with intensive auto increment
      ✕ test 5: updated properly with auto increment (13207 ms)
      ✕ test 6: no tearing with auto increment (6 ms)
  react-state
    with useTransition
      ✓ test 1: updated properly with transition (2828 ms)
      ✓ test 2: no tearing with transition (43 ms)
      ✓ test 3: ability to interrupt render
      ✓ test 4: proper branching with transition (3408 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (4014 ms)
      ✓ test 6: no tearing with auto increment (1 ms)
  simplux
    with useTransition
      ✓ test 1: updated properly with transition (2813 ms)
      ✓ test 2: no tearing with transition (46 ms)
      ✓ test 3: ability to interrupt render (1 ms)
      ✕ test 4: proper branching with transition (7364 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (4097 ms)
      ✓ test 6: no tearing with auto increment (1 ms)
  apollo-client
    with useTransition
      ✕ test 1: updated properly with transition (4837 ms)
      ✕ test 2: no tearing with transition (51 ms)
      ✕ test 3: ability to interrupt render (1 ms)
      ✕ test 4: proper branching with transition (3675 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (2279 ms)
      ✕ test 6: no tearing with auto increment (1 ms)
  recoil
    with useTransition
      ✕ test 1: updated properly with transition (5603 ms)
      ✓ test 2: no tearing with transition (53 ms)
      ✕ test 3: ability to interrupt render (1 ms)
      ✕ test 4: proper branching with transition (4367 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (3062 ms)
      ✓ test 6: no tearing with auto increment (1 ms)
  jotai
    with useTransition
      ✓ test 1: updated properly with transition (3562 ms)
      ✓ test 2: no tearing with transition (122 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7543 ms)
    with intensive auto increment
      ✕ test 5: updated properly with auto increment (13214 ms)
      ✕ test 6: no tearing with auto increment (4 ms)
  effector
    with useTransition
      ✓ test 1: updated properly with transition (2677 ms)
      ✕ test 2: no tearing with transition (48 ms)
      ✓ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (7184 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (2218 ms)
      ✕ test 6: no tearing with auto increment (1 ms)
  react-rxjs
    with useTransition
      ✕ test 1: updated properly with transition (5886 ms)
      ✓ test 2: no tearing with transition (58 ms)
      ✕ test 3: ability to interrupt render
      ✕ test 4: proper branching with transition (4521 ms)
    with intensive auto increment
      ✓ test 5: updated properly with auto increment (3014 ms)
      ✓ test 6: no tearing with auto increment (2 ms)
  valtio
    with useTransition
      ✓ test 1: updated properly with transition (3453 ms)
      ✓ test 2: no tearing with transition (24 ms)
      ✓ test 3: ability to interrupt render (1 ms)
      ✕ test 4: proper branching with transition (7200 ms)
    with intensive auto increment
      ✕ test 5: updated properly with auto increment (13208 ms)
      ✕ test 6: no tearing with auto increment (4 ms)
```

</details>

<table>
  <tr>
    <th>Test</th>
    <th>1</th>
    <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
  </tr>

  <tr>
    <th><a href="https://react-redux.js.org">react-redux</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://redux.js.org">redux</a> (w/ useMutableSource)</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/dai-shi/reactive-react-redux">reactive-react-redux</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://react-tracked.js.org">react-tracked</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/diegohaz/constate">constate</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/MrWolfZ/simplux">simplux</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://recoiljs.org">recoil</a></th>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/zerobias/effector">effector</a></th>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
  </tr>

  <tr>
    <th><a href="https://react-rxjs.org">react-rxjs</a></th>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
  </tr>

  <tr>
    <th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:white_check_mark:</td>
    <td>:x:</td>
    <td>:x:</td>
    <td>:x:</td>
  </tr>

</table>

## Caveats

- Tearing may not be an issue depending on app requirements.
- The test is done in a very limited way.
- The results may not be accurate.

## If you are interested

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)
- and so on

## Contributing

This repository is a tool for us to test some of global state libraries.
While it is totally fine to use the tool for other libraries under the license,
we don't generally accept adding a new library to the repository.

However, we are interested in various approaches.
If you have any suggestions feel free to open issues or pull requests.
We may consider adding (and removing) libraries.
Questions and discussions are also welcome in issues.

For listing global state libraries, we have another repository
https://github.com/dai-shi/lets-compare-global-state-with-react-hooks
in which we accept contributions. It's recommended to run this tool
and we put the result there, possibly a reference link to a PR
in this repository or a fork of this repository.

To automatically run tests and update the README.md on OSX:
```
yarn jest:json
yarn jest:update
```
