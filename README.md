# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

Caveat: These tests are originally designed for obsolete concurrent mode. We should revisit them for new concurrent rendering feature.

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

- Level 1
  - test 1: updated properly with transition
- Level 2
  - test 2: no tearing with transition
  - test 5: updated properly with auto increment (EXPERIMENTAL)
  - test 6: no tearing with auto increment (EXPERIMENTAL)
- Level 3
  - test 3: ability to interrupt render
  - test 4: proper branching with transition

## Results

<details>
<summary>Raw Output</summary>

```
 react-redux
   with useTransition
     ✓ test 1: updated properly with transition (3939 ms)
     ✓ test 2: no tearing with transition (25 ms)
     ✕ test 3: ability to interrupt render (2 ms)
     ✕ test 4: proper branching with transition (4516 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2212 ms)
     ✕ test 6: no tearing with auto increment (3 ms)
 react-tracked
   with useTransition
     ✓ test 1: updated properly with transition (3619 ms)
     ✓ test 2: no tearing with transition (30 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (5447 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (6141 ms)
     ✓ test 6: no tearing with auto increment (2 ms)
 constate
   with useTransition
     ✓ test 1: updated properly with transition (2667 ms)
     ✓ test 2: no tearing with transition (26 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (3452 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4012 ms)
     ✓ test 6: no tearing with auto increment (2 ms)
 zustand
   with useTransition
     ✓ test 1: updated properly with transition (3889 ms)
     ✓ test 2: no tearing with transition (27 ms)
     ✕ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (4520 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2227 ms)
     ✕ test 6: no tearing with auto increment (1 ms)
 react-hooks-global-state
   with useTransition
     ✓ test 1: updated properly with transition (3466 ms)
     ✓ test 2: no tearing with transition (25 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7233 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13223 ms)
     ✕ test 6: no tearing with auto increment (5 ms)
 use-context-selector
   with useTransition
     ✓ test 1: updated properly with transition (3627 ms)
     ✓ test 2: no tearing with transition (25 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (5442 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (6143 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 use-subscription
   with useTransition
     ✓ test 1: updated properly with transition (3523 ms)
     ✓ test 2: no tearing with transition (120 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7571 ms)
   with intensive auto increment
     ✕ test 5: updated properly with auto increment (13194 ms)
     ✕ test 6: no tearing with auto increment (4 ms)
 react-state
   with useTransition
     ✓ test 1: updated properly with transition (2635 ms)
     ✓ test 2: no tearing with transition (23 ms)
     ✓ test 3: ability to interrupt render
     ✓ test 4: proper branching with transition (3464 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4008 ms)
     ✓ test 6: no tearing with auto increment
 simplux
   with useTransition
     ✓ test 1: updated properly with transition (2682 ms)
     ✓ test 2: no tearing with transition (29 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (7396 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4078 ms)
     ✓ test 6: no tearing with auto increment (2 ms)
 apollo-client
   with useTransition
     ✓ test 1: updated properly with transition (3751 ms)
     ✕ test 2: no tearing with transition (28 ms)
     ✕ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (3869 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2406 ms)
     ✕ test 6: no tearing with auto increment (1 ms)
 recoil
   with useTransition
     ✓ test 1: updated properly with transition (3637 ms)
     ✓ test 2: no tearing with transition (25 ms)
     ✕ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (4362 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (3053 ms)
     ✓ test 6: no tearing with auto increment (2 ms)
 jotai
   with useTransition
     ✓ test 1: updated properly with transition (4036 ms)
     ✓ test 2: no tearing with transition (27 ms)
     ✓ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (8684 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (5236 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 jotai-versioned-write
   with useTransition
     ✓ test 1: updated properly with transition (2675 ms)
     ✓ test 2: no tearing with transition (29 ms)
     ✓ test 3: ability to interrupt render (1 ms)
     ✓ test 4: proper branching with transition (3481 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (4024 ms)
     ✓ test 6: no tearing with auto increment (1 ms)
 effector
   with useTransition
     ✓ test 1: updated properly with transition (2503 ms)
     ✕ test 2: no tearing with transition (30 ms)
     ✓ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (994 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2207 ms)
     ✕ test 6: no tearing with auto increment (1 ms)
 react-rxjs
   with useTransition
     ✓ test 1: updated properly with transition (3911 ms)
     ✓ test 2: no tearing with transition (29 ms)
     ✕ test 3: ability to interrupt render
     ✕ test 4: proper branching with transition (4524 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (3020 ms)
     ✓ test 6: no tearing with auto increment
 valtio
   with useTransition
     ✓ test 1: updated properly with transition (3910 ms)
     ✓ test 2: no tearing with transition (32 ms)
     ✕ test 3: ability to interrupt render (1 ms)
     ✕ test 4: proper branching with transition (4515 ms)
   with intensive auto increment
     ✓ test 5: updated properly with auto increment (2214 ms)
     ✕ test 6: no tearing with auto increment (1 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
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
		<td>:white_check_mark:</td>
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
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil</a></th>
		<td>:white_check_mark:</td>
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
		<th><a href="https://github.com/pmndrs/jotai">jotai (experimental versioned write)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
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
		<td>:white_check_mark:</td>
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
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
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
