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

To automatically run tests and update the README.md on OSX:
```
yarn jest:json
yarn jest:update
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
     ✕ test 1: updated properly with transition (5935 ms)
     ✓ test 2: no tearing with transition (58 ms)
     ✕ test 3: ability to interrupt render (2 ms)
     ✕ test 4: proper branching with transition (4515 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2207 ms)
     ✕ test 6: no tearing with auto increment (1 ms)
 react-tracked
   with useTransition
     ✓ test 1: updated properly with transition (3596 ms)
     ✓ test 2: no tearing with transition (26 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (5433 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (6130 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 constate
   with useTransition
     ✓ test 1: updated properly with transition (3139 ms)
     ✓ test 2: no tearing with transition (50 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (3395 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4002 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 zustand
   with useTransition
     ✕ test 1: updated properly with transition (5863 ms)
     ✓ test 2: no tearing with transition (46 ms)
     ✕ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (4525 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2205 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 react-hooks-global-state
   with useTransition
     ✓ test 1: updated properly with transition (3736 ms)
     ✓ test 2: no tearing with transition (29 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7206 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13196 ms)
     ✕ test 6: no tearing with auto increment (3 ms)
 use-context-selector
   with useTransition
     ✓ test 1: updated properly with transition (3621 ms)
     ✓ test 2: no tearing with transition (28 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (5426 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (6136 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 use-subscription
   with useTransition
     ✓ test 1: updated properly with transition (3594 ms)
     ✓ test 2: no tearing with transition (120 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7537 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13208 ms)
     ✕ test 6: no tearing with auto increment (7 ms)
 react-state
   with useTransition
     ✓ test 1: updated properly with transition (2883 ms)
     ✓ test 2: no tearing with transition (47 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (3403 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4004 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 simplux
   with useTransition
     ✓ test 1: updated properly with transition (3195 ms)
     ✓ test 2: no tearing with transition (46 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7376 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4074 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 apollo-client
   with useTransition
     ✕ test 1: updated properly with transition (4851 ms)
     ✕ test 2: no tearing with transition (56 ms)
     ✕ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (3630 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2296 ms)
     ✕ test 6: no tearing with auto increment (1 ms)
 recoil
   with useTransition
     ✕ test 1: updated properly with transition (5625 ms)
     ✓ test 2: no tearing with transition (59 ms)
     ✕ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (4379 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (3027 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 jotai
   with useTransition
     ✓ test 1: updated properly with transition (3629 ms)
     ✓ test 2: no tearing with transition (24 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (8372 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (5221 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 effector
   with useTransition
     ✕ test 1: updated properly with transition (1693 ms)
     ✕ test 2: no tearing with transition (829 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7202 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2203 ms)
     ✕ test 6: no tearing with auto increment
 react-rxjs
   with useTransition
     ✕ test 1: updated properly with transition (6981 ms)
     ✓ test 2: no tearing with transition (53 ms)
     ✕ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (4545 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (3013 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 valtio
   with useTransition
     ✓ test 1: updated properly with transition (3470 ms)
     ✓ test 2: no tearing with transition (24 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7153 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13205 ms)
     ✕ test 6: no tearing with auto increment (4 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:x:</td>
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

- Tearing and state branching may not be an issue depending on app requirements.
- The test is done in a very limited way.
  - Passing tests don't guarantee anything.
- The results may not be accurate.
  - Do not fully trust the results.

## If you are interested

The reason why I created this is to test my projects.

- [react-tracked](https://github.com/dai-shi/react-tracked)
- [use-context-selector](https://github.com/dai-shi/use-context-selector)
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
