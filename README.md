# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

- [Discussion in React 18 WG](https://github.com/reactwg/react-18/discussions/116)

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

- With useTransition
  - Level 1
    - 1: No tearing finally on update
    - 2: No tearing finally on mount
  - Level 2
    - 3: No tearing temporarily on update
    - 4: No tearing temporarily on mount
  - Level 3
    - 5: Can interrupt render (time slicing)
    - 6: Can branch state (wip state)
- With useDeferredValue
  - Level 1
    - 7: No tearing finally on update
    - 8: No tearing finally on mount
  - Level 2
    - 9: No tearing temporarily on update
    - 10: No tearing temporarily on mount

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (8102 ms)
       ✓ No tearing finally on mount (4793 ms)
     Level 2
       ✓ No tearing temporarily on update (13081 ms)
       ✓ No tearing temporarily on mount (4643 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8069 ms)
       ✕ Can branch state (wip state) (6750 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9894 ms)
       ✓ No tearing finally on mount (4615 ms)
     Level 2
       ✓ No tearing temporarily on update (14678 ms)
       ✓ No tearing temporarily on mount (4605 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8013 ms)
       ✓ No tearing finally on mount (4664 ms)
     Level 2
       ✓ No tearing temporarily on update (13092 ms)
       ✓ No tearing temporarily on mount (4666 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8063 ms)
       ✕ Can branch state (wip state) (6767 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9789 ms)
       ✓ No tearing finally on mount (4704 ms)
     Level 2
       ✓ No tearing temporarily on update (14792 ms)
       ✓ No tearing temporarily on mount (4680 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5654 ms)
       ✓ No tearing finally on mount (15505 ms)
     Level 2
       ✓ No tearing temporarily on update (8725 ms)
       ✓ No tearing temporarily on mount (15454 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3691 ms)
       ✓ Can branch state (wip state) (8261 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15372 ms)
       ✓ No tearing finally on mount (8509 ms)
     Level 2
       ✓ No tearing temporarily on update (19534 ms)
       ✓ No tearing temporarily on mount (8433 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4610 ms)
       ✓ No tearing finally on mount (8506 ms)
     Level 2
       ✓ No tearing temporarily on update (8704 ms)
       ✓ No tearing temporarily on mount (9476 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3713 ms)
       ✓ Can branch state (wip state) (5227 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9712 ms)
       ✓ No tearing finally on mount (5731 ms)
     Level 2
       ✓ No tearing temporarily on update (14695 ms)
       ✓ No tearing temporarily on mount (5623 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5584 ms)
       ✓ No tearing finally on mount (8533 ms)
     Level 2
       ✓ No tearing temporarily on update (8718 ms)
       ✕ No tearing temporarily on mount (8461 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3729 ms)
       ✕ Can branch state (wip state) (10183 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11338 ms)
       ✓ No tearing finally on mount (5728 ms)
     Level 2
       ✓ No tearing temporarily on update (15458 ms)
       ✕ No tearing temporarily on mount (5645 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5618 ms)
       ✓ No tearing finally on mount (13526 ms)
     Level 2
       ✓ No tearing temporarily on update (8700 ms)
       ✓ No tearing temporarily on mount (15466 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3712 ms)
       ✓ Can branch state (wip state) (8252 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15431 ms)
       ✓ No tearing finally on mount (8545 ms)
     Level 2
       ✓ No tearing temporarily on update (19569 ms)
       ✓ No tearing temporarily on mount (6455 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5629 ms)
       ✓ No tearing finally on mount (9525 ms)
     Level 2
       ✓ No tearing temporarily on update (8711 ms)
       ✕ No tearing temporarily on mount (8475 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3680 ms)
       ✕ Can branch state (wip state) (10182 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11347 ms)
       ✓ No tearing finally on mount (5729 ms)
     Level 2
       ✓ No tearing temporarily on update (15402 ms)
       ✕ No tearing temporarily on mount (5660 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8117 ms)
       ✓ No tearing finally on mount (5823 ms)
     Level 2
       ✓ No tearing temporarily on update (13087 ms)
       ✕ No tearing temporarily on mount (5982 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8086 ms)
       ✕ Can branch state (wip state) (6755 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (8529 ms)
       ✓ No tearing finally on mount (5513 ms)
     Level 2
       ✓ No tearing temporarily on update (10714 ms)
       ✕ No tearing temporarily on mount (5528 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8098 ms)
       ✓ No tearing finally on mount (4738 ms)
     Level 2
       ✓ No tearing temporarily on update (13069 ms)
       ✓ No tearing temporarily on mount (4739 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8081 ms)
       ✕ Can branch state (wip state) (6803 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9821 ms)
       ✓ No tearing finally on mount (4773 ms)
     Level 2
       ✓ No tearing temporarily on update (14778 ms)
       ✓ No tearing temporarily on mount (4661 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5616 ms)
       ✓ No tearing finally on mount (8522 ms)
     Level 2
       ✓ No tearing temporarily on update (8712 ms)
       ✕ No tearing temporarily on mount (8484 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3716 ms)
       ✕ Can branch state (wip state) (10256 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11417 ms)
       ✓ No tearing finally on mount (5790 ms)
     Level 2
       ✓ No tearing temporarily on update (15505 ms)
       ✕ No tearing temporarily on mount (6669 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6677 ms)
       ✓ No tearing finally on mount (10660 ms)
     Level 2
       ✓ No tearing temporarily on update (9795 ms)
       ✕ No tearing temporarily on mount (12455 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4687 ms)
       ✕ Can branch state (wip state) (11236 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16462 ms)
       ✓ No tearing finally on mount (13518 ms)
     Level 2
       ✓ No tearing temporarily on update (20581 ms)
       ✕ No tearing temporarily on mount (12461 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5588 ms)
       ✓ No tearing finally on mount (9534 ms)
     Level 2
       ✓ No tearing temporarily on update (9696 ms)
       ✓ No tearing temporarily on mount (9453 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4715 ms)
       ✕ Can branch state (wip state) (16249 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11555 ms)
       ✓ No tearing finally on mount (6710 ms)
     Level 2
       ✓ No tearing temporarily on update (15618 ms)
       ✓ No tearing temporarily on mount (6601 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (7620 ms)
       ✓ No tearing finally on mount (12517 ms)
     Level 2
       ✓ No tearing temporarily on update (9695 ms)
       ✓ No tearing temporarily on mount (15455 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4734 ms)
       ✕ Can branch state (wip state) (18242 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16625 ms)
       ✓ No tearing finally on mount (9512 ms)
     Level 2
       ✓ No tearing temporarily on update (20735 ms)
       ✓ No tearing temporarily on mount (9458 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8062 ms)
       ✓ No tearing finally on mount (4664 ms)
     Level 2
       ✓ No tearing temporarily on update (13011 ms)
       ✓ No tearing temporarily on mount (4610 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8018 ms)
       ✕ Can branch state (wip state) (6719 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9741 ms)
       ✓ No tearing finally on mount (4707 ms)
     Level 2
       ✓ No tearing temporarily on update (14676 ms)
       ✓ No tearing temporarily on mount (4669 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4621 ms)
       ✓ No tearing finally on mount (8534 ms)
     Level 2
       ✕ No tearing temporarily on update (8714 ms)
       ✕ No tearing temporarily on mount (9488 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3722 ms)
       ✕ Can branch state (wip state) (3000 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9730 ms)
       ✓ No tearing finally on mount (5722 ms)
     Level 2
       ✓ No tearing temporarily on update (14695 ms)
       ✕ No tearing temporarily on mount (5654 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8047 ms)
       ✓ No tearing finally on mount (4654 ms)
     Level 2
       ✓ No tearing temporarily on update (13013 ms)
       ✓ No tearing temporarily on mount (4606 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8016 ms)
       ✕ Can branch state (wip state) (6716 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9728 ms)
       ✓ No tearing finally on mount (4680 ms)
     Level 2
       ✓ No tearing temporarily on update (14716 ms)
       ✓ No tearing temporarily on mount (4605 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4619 ms)
       ✓ No tearing finally on mount (9532 ms)
     Level 2
       ✓ No tearing temporarily on update (8729 ms)
       ✓ No tearing temporarily on mount (9481 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3730 ms)
       ✕ Can branch state (wip state) (10252 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9693 ms)
       ✓ No tearing finally on mount (5722 ms)
     Level 2
       ✓ No tearing temporarily on update (14697 ms)
       ✓ No tearing temporarily on mount (5640 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
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
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
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
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://recoiljs.org">recoil (UNSTABLE)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai (experimental versioned write)</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://react-rxjs.org">react-rxjs</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
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
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
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
