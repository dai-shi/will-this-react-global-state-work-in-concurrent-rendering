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
     ✓ test 1: updated properly with transition (2601 ms)
     ✕ test 2: no tearing with transition (62 ms)
     ✓ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (7190 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2227 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 redux-use-mutable-source
   with useTransition
     ✓ test 1: updated properly with transition (2646 ms)
     ✓ test 2: no tearing with transition (137 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7513 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2218 ms)
     ✕ test 6: no tearing with auto increment (3 ms)
 reactive-react-redux
   with useTransition
     ✓ test 1: updated properly with transition (2660 ms)
     ✓ test 2: no tearing with transition (133 ms)
     ✓ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (7533 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2206 ms)
     ✕ test 6: no tearing with auto increment (1 ms)
 react-tracked
   with useTransition
     ✓ test 1: updated properly with transition (3508 ms)
     ✓ test 2: no tearing with transition (48 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (5503 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (6300 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 constate
   with useTransition
     ✓ test 1: updated properly with transition (2773 ms)
     ✓ test 2: no tearing with transition (63 ms)
     ✓ test 3: ability to interrupt render (1 ms)
     ✓ test 4: proper branching with transition (3439 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4016 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 zustand
   with useTransition
     ✓ test 1: updated properly with transition (2585 ms)
     ✕ test 2: no tearing with transition (45 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7180 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2228 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 react-hooks-global-state
   with useTransition
     ✓ test 1: updated properly with transition (3402 ms)
     ✓ test 2: no tearing with transition (41 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7169 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13168 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 use-context-selector
   with useTransition
     ✓ test 1: updated properly with transition (3576 ms)
     ✓ test 2: no tearing with transition (66 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (5468 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (6144 ms)
     ✓ test 6: no tearing with auto increment (2 ms)
 use-subscription
   with useTransition
     ✓ test 1: updated properly with transition (3476 ms)
     ✓ test 2: no tearing with transition (138 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7511 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13194 ms)
     ✕ test 6: no tearing with auto increment (3 ms)
 react-state
   with useTransition
     ✓ test 1: updated properly with transition (2766 ms)
     ✓ test 2: no tearing with transition (45 ms)
     ✓ test 3: ability to interrupt render (1 ms)
     ✓ test 4: proper branching with transition (3465 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4011 ms)
     ✓ test 6: no tearing with auto increment (2 ms)
 simplux
   with useTransition
     ✓ test 1: updated properly with transition (2720 ms)
     ✓ test 2: no tearing with transition (46 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7360 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4100 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 apollo-client
   with useTransition
     ✕ test 1: updated properly with transition (4696 ms)
     ✕ test 2: no tearing with transition (50 ms)
     ✕ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (3526 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2240 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 recoil
   with useTransition
     ✕ test 1: updated properly with transition (5868 ms)
     ✓ test 2: no tearing with transition (42 ms)
     ✕ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (4470 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2997 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 jotai
   with useTransition
     ✓ test 1: updated properly with transition (3455 ms)
     ✓ test 2: no tearing with transition (133 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7553 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13177 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 effector
   with useTransition
     ✓ test 1: updated properly with transition (2578 ms)
     ✕ test 2: no tearing with transition (61 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7191 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2207 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 react-rxjs
   with useTransition
     ✕ test 1: updated properly with transition (5747 ms)
     ✓ test 2: no tearing with transition (45 ms)
     ✕ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (4501 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2996 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 valtio
   with useTransition
     ✓ test 1: updated properly with transition (3396 ms)
     ✓ test 2: no tearing with transition (53 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7151 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13189 ms)
     ✕ test 6: no tearing with auto increment (2 ms)
 proxily
   with useTransition
     ✓ test 1: updated properly with transition (2760 ms)
     ✓ test 2: no tearing with transition (42 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7292 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (12201 ms)
     ✓ test 6: no tearing with auto increment (1 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>	<tr>
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
		<th>React useContext / useCallback</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
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
	<tr>
		<th><a href="https://github.com/selsamman/proxily">proxily</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
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
