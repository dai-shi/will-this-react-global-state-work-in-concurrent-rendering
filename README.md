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
       ✓ No tearing finally on update (8096 ms)
       ✓ No tearing finally on mount (4694 ms)
     Level 2
       ✓ No tearing temporarily on update (13066 ms)
       ✓ No tearing temporarily on mount (4669 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8049 ms)
       ✕ Can branch state (wip state) (6739 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9777 ms)
       ✓ No tearing finally on mount (4732 ms)
     Level 2
       ✓ No tearing temporarily on update (14668 ms)
       ✓ No tearing temporarily on mount (4578 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8046 ms)
       ✓ No tearing finally on mount (4669 ms)
     Level 2
       ✓ No tearing temporarily on update (12979 ms)
       ✓ No tearing temporarily on mount (4603 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7980 ms)
       ✕ Can branch state (wip state) (6694 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9702 ms)
       ✓ No tearing finally on mount (4647 ms)
     Level 2
       ✓ No tearing temporarily on update (14677 ms)
       ✓ No tearing temporarily on mount (4608 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5596 ms)
       ✓ No tearing finally on mount (15518 ms)
     Level 2
       ✓ No tearing temporarily on update (8660 ms)
       ✓ No tearing temporarily on mount (13453 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3672 ms)
       ✓ Can branch state (wip state) (8233 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15430 ms)
       ✓ No tearing finally on mount (8512 ms)
     Level 2
       ✓ No tearing temporarily on update (19520 ms)
       ✓ No tearing temporarily on mount (8428 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4600 ms)
       ✓ No tearing finally on mount (8505 ms)
     Level 2
       ✓ No tearing temporarily on update (8703 ms)
       ✓ No tearing temporarily on mount (9473 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3681 ms)
       ✓ Can branch state (wip state) (5220 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9693 ms)
       ✓ No tearing finally on mount (5717 ms)
     Level 2
       ✓ No tearing temporarily on update (14691 ms)
       ✓ No tearing temporarily on mount (5603 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5623 ms)
       ✓ No tearing finally on mount (8523 ms)
     Level 2
       ✓ No tearing temporarily on update (8704 ms)
       ✕ No tearing temporarily on mount (9468 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3697 ms)
       ✕ Can branch state (wip state) (10200 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11326 ms)
       ✓ No tearing finally on mount (5697 ms)
     Level 2
       ✓ No tearing temporarily on update (15385 ms)
       ✕ No tearing temporarily on mount (5647 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5613 ms)
       ✓ No tearing finally on mount (15509 ms)
     Level 2
       ✓ No tearing temporarily on update (8711 ms)
       ✓ No tearing temporarily on mount (15444 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3690 ms)
       ✓ Can branch state (wip state) (8261 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15429 ms)
       ✓ No tearing finally on mount (8503 ms)
     Level 2
       ✓ No tearing temporarily on update (19515 ms)
       ✓ No tearing temporarily on mount (6465 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5604 ms)
       ✓ No tearing finally on mount (9533 ms)
     Level 2
       ✓ No tearing temporarily on update (8722 ms)
       ✕ No tearing temporarily on mount (9476 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3692 ms)
       ✕ Can branch state (wip state) (10180 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11286 ms)
       ✓ No tearing finally on mount (5714 ms)
     Level 2
       ✓ No tearing temporarily on update (15447 ms)
       ✕ No tearing temporarily on mount (5645 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8087 ms)
       ✓ No tearing finally on mount (5927 ms)
     Level 2
       ✓ No tearing temporarily on update (13049 ms)
       ✕ No tearing temporarily on mount (5997 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8079 ms)
       ✕ Can branch state (wip state) (6731 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (8513 ms)
       ✓ No tearing finally on mount (5614 ms)
     Level 2
       ✓ No tearing temporarily on update (10578 ms)
       ✕ No tearing temporarily on mount (5531 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8028 ms)
       ✓ No tearing finally on mount (4695 ms)
     Level 2
       ✓ No tearing temporarily on update (13045 ms)
       ✓ No tearing temporarily on mount (4679 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7988 ms)
       ✕ Can branch state (wip state) (6712 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9750 ms)
       ✓ No tearing finally on mount (4706 ms)
     Level 2
       ✓ No tearing temporarily on update (14722 ms)
       ✓ No tearing temporarily on mount (4677 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5628 ms)
       ✓ No tearing finally on mount (8511 ms)
     Level 2
       ✓ No tearing temporarily on update (8715 ms)
       ✕ No tearing temporarily on mount (7491 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3761 ms)
       ✕ Can branch state (wip state) (10232 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11400 ms)
       ✓ No tearing finally on mount (5761 ms)
     Level 2
       ✓ No tearing temporarily on update (15492 ms)
       ✕ No tearing temporarily on mount (5661 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6680 ms)
       ✓ No tearing finally on mount (12572 ms)
     Level 2
       ✓ No tearing temporarily on update (9749 ms)
       ✕ No tearing temporarily on mount (12446 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4681 ms)
       ✕ Can branch state (wip state) (11192 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16449 ms)
       ✓ No tearing finally on mount (12484 ms)
     Level 2
       ✓ No tearing temporarily on update (20595 ms)
       ✕ No tearing temporarily on mount (13447 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5636 ms)
       ✓ No tearing finally on mount (9514 ms)
     Level 2
       ✓ No tearing temporarily on update (9711 ms)
       ✓ No tearing temporarily on mount (10479 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4688 ms)
       ✓ Can branch state (wip state) (6255 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11474 ms)
       ✓ No tearing finally on mount (5721 ms)
     Level 2
       ✓ No tearing temporarily on update (15641 ms)
       ✓ No tearing temporarily on mount (6610 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (7601 ms)
       ✓ No tearing finally on mount (14515 ms)
     Level 2
       ✓ No tearing temporarily on update (9679 ms)
       ✓ No tearing temporarily on mount (10457 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4662 ms)
       ✕ Can branch state (wip state) (18204 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16599 ms)
       ✓ No tearing finally on mount (9496 ms)
     Level 2
       ✓ No tearing temporarily on update (20736 ms)
       ✓ No tearing temporarily on mount (10405 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8087 ms)
       ✓ No tearing finally on mount (4656 ms)
     Level 2
       ✓ No tearing temporarily on update (13012 ms)
       ✓ No tearing temporarily on mount (4602 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8015 ms)
       ✕ Can branch state (wip state) (6713 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9731 ms)
       ✓ No tearing finally on mount (4659 ms)
     Level 2
       ✓ No tearing temporarily on update (14715 ms)
       ✓ No tearing temporarily on mount (4583 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4666 ms)
       ✓ No tearing finally on mount (7513 ms)
     Level 2
       ✕ No tearing temporarily on update (8715 ms)
       ✕ No tearing temporarily on mount (9476 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3714 ms)
       ✕ Can branch state (wip state) (2966 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9708 ms)
       ✓ No tearing finally on mount (5708 ms)
     Level 2
       ✓ No tearing temporarily on update (14689 ms)
       ✕ No tearing temporarily on mount (5609 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8071 ms)
       ✓ No tearing finally on mount (4649 ms)
     Level 2
       ✓ No tearing temporarily on update (13044 ms)
       ✓ No tearing temporarily on mount (4604 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8022 ms)
       ✕ Can branch state (wip state) (6705 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9668 ms)
       ✓ No tearing finally on mount (4648 ms)
     Level 2
       ✓ No tearing temporarily on update (14700 ms)
       ✓ No tearing temporarily on mount (4669 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4613 ms)
       ✓ No tearing finally on mount (9533 ms)
     Level 2
       ✓ No tearing temporarily on update (8690 ms)
       ✓ No tearing temporarily on mount (9494 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3716 ms)
       ✕ Can branch state (wip state) (10231 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9720 ms)
       ✓ No tearing finally on mount (5709 ms)
     Level 2
       ✓ No tearing temporarily on update (14697 ms)
       ✓ No tearing temporarily on mount (5673 ms)

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
		<td>:white_check_mark:</td>
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
