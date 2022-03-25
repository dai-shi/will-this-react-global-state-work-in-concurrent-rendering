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
       ✓ No tearing finally on update (8138 ms)
       ✓ No tearing finally on mount (4752 ms)
     Level 2
       ✓ No tearing temporarily on update (13087 ms)
       ✓ No tearing temporarily on mount (4672 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8071 ms)
       ✕ Can branch state (wip state) (6785 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9797 ms)
       ✓ No tearing finally on mount (4674 ms)
     Level 2
       ✓ No tearing temporarily on update (14714 ms)
       ✓ No tearing temporarily on mount (4599 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8054 ms)
       ✓ No tearing finally on mount (4687 ms)
     Level 2
       ✓ No tearing temporarily on update (13015 ms)
       ✓ No tearing temporarily on mount (4596 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8004 ms)
       ✕ Can branch state (wip state) (6680 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9702 ms)
       ✓ No tearing finally on mount (4684 ms)
     Level 2
       ✓ No tearing temporarily on update (14707 ms)
       ✓ No tearing temporarily on mount (4652 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5605 ms)
       ✓ No tearing finally on mount (15538 ms)
     Level 2
       ✓ No tearing temporarily on update (8703 ms)
       ✓ No tearing temporarily on mount (15466 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3705 ms)
       ✓ Can branch state (wip state) (8309 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15512 ms)
       ✓ No tearing finally on mount (8594 ms)
     Level 2
       ✓ No tearing temporarily on update (19621 ms)
       ✓ No tearing temporarily on mount (8517 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4698 ms)
       ✓ No tearing finally on mount (9605 ms)
     Level 2
       ✓ No tearing temporarily on update (8688 ms)
       ✓ No tearing temporarily on mount (8475 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3704 ms)
       ✓ Can branch state (wip state) (5235 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9684 ms)
       ✓ No tearing finally on mount (5728 ms)
     Level 2
       ✓ No tearing temporarily on update (14723 ms)
       ✓ No tearing temporarily on mount (5641 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5618 ms)
       ✓ No tearing finally on mount (9541 ms)
     Level 2
       ✓ No tearing temporarily on update (8702 ms)
       ✕ No tearing temporarily on mount (8467 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3705 ms)
       ✕ Can branch state (wip state) (10119 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11350 ms)
       ✓ No tearing finally on mount (5728 ms)
     Level 2
       ✓ No tearing temporarily on update (15425 ms)
       ✕ No tearing temporarily on mount (5628 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5593 ms)
       ✓ No tearing finally on mount (13622 ms)
     Level 2
       ✓ No tearing temporarily on update (8767 ms)
       ✓ No tearing temporarily on mount (15534 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3747 ms)
       ✓ Can branch state (wip state) (8329 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15532 ms)
       ✓ No tearing finally on mount (6602 ms)
     Level 2
       ✓ No tearing temporarily on update (19522 ms)
       ✓ No tearing temporarily on mount (6450 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5624 ms)
       ✓ No tearing finally on mount (9551 ms)
     Level 2
       ✓ No tearing temporarily on update (8715 ms)
       ✕ No tearing temporarily on mount (9489 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3705 ms)
       ✕ Can branch state (wip state) (10175 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11328 ms)
       ✓ No tearing finally on mount (5739 ms)
     Level 2
       ✓ No tearing temporarily on update (15430 ms)
       ✕ No tearing temporarily on mount (5627 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8097 ms)
       ✓ No tearing finally on mount (6065 ms)
     Level 2
       ✓ No tearing temporarily on update (13024 ms)
       ✕ No tearing temporarily on mount (5640 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8064 ms)
       ✕ Can branch state (wip state) (6731 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (8508 ms)
       ✓ No tearing finally on mount (5504 ms)
     Level 2
       ✓ No tearing temporarily on update (10592 ms)
       ✕ No tearing temporarily on mount (5459 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8047 ms)
       ✓ No tearing finally on mount (4740 ms)
     Level 2
       ✓ No tearing temporarily on update (13005 ms)
       ✓ No tearing temporarily on mount (4672 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7997 ms)
       ✕ Can branch state (wip state) (6687 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9739 ms)
       ✓ No tearing finally on mount (4710 ms)
     Level 2
       ✓ No tearing temporarily on update (14708 ms)
       ✓ No tearing temporarily on mount (4589 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5599 ms)
       ✓ No tearing finally on mount (9550 ms)
     Level 2
       ✓ No tearing temporarily on update (8738 ms)
       ✕ No tearing temporarily on mount (8482 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3751 ms)
       ✕ Can branch state (wip state) (10232 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11307 ms)
       ✓ No tearing finally on mount (5729 ms)
     Level 2
       ✓ No tearing temporarily on update (15443 ms)
       ✕ No tearing temporarily on mount (6622 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6647 ms)
       ✓ No tearing finally on mount (11549 ms)
     Level 2
       ✓ No tearing temporarily on update (9735 ms)
       ✕ No tearing temporarily on mount (11502 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4730 ms)
       ✕ Can branch state (wip state) (11255 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16484 ms)
       ✓ No tearing finally on mount (12499 ms)
     Level 2
       ✓ No tearing temporarily on update (20583 ms)
       ✕ No tearing temporarily on mount (12466 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5639 ms)
       ✓ No tearing finally on mount (9574 ms)
     Level 2
       ✓ No tearing temporarily on update (9726 ms)
       ✓ No tearing temporarily on mount (9496 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4733 ms)
       ✓ Can branch state (wip state) (6259 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11537 ms)
       ✓ No tearing finally on mount (5749 ms)
     Level 2
       ✓ No tearing temporarily on update (15662 ms)
       ✓ No tearing temporarily on mount (6608 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6619 ms)
       ✓ No tearing finally on mount (13560 ms)
     Level 2
       ✓ No tearing temporarily on update (9691 ms)
       ✓ No tearing temporarily on mount (13505 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4736 ms)
       ✓ Can branch state (wip state) (9249 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16624 ms)
       ✓ No tearing finally on mount (8526 ms)
     Level 2
       ✓ No tearing temporarily on update (20741 ms)
       ✓ No tearing temporarily on mount (6467 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8046 ms)
       ✓ No tearing finally on mount (4720 ms)
     Level 2
       ✓ No tearing temporarily on update (13047 ms)
       ✓ No tearing temporarily on mount (4622 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8051 ms)
       ✕ Can branch state (wip state) (6690 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9729 ms)
       ✓ No tearing finally on mount (4661 ms)
     Level 2
       ✓ No tearing temporarily on update (14722 ms)
       ✓ No tearing temporarily on mount (4693 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4628 ms)
       ✓ No tearing finally on mount (9613 ms)
     Level 2
       ✕ No tearing temporarily on update (8779 ms)
       ✕ No tearing temporarily on mount (9543 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3778 ms)
       ✕ Can branch state (wip state) (3034 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9766 ms)
       ✓ No tearing finally on mount (5746 ms)
     Level 2
       ✓ No tearing temporarily on update (14783 ms)
       ✕ No tearing temporarily on mount (5682 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8091 ms)
       ✓ No tearing finally on mount (4740 ms)
     Level 2
       ✓ No tearing temporarily on update (13052 ms)
       ✓ No tearing temporarily on mount (4661 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8081 ms)
       ✕ Can branch state (wip state) (6764 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9816 ms)
       ✓ No tearing finally on mount (4674 ms)
     Level 2
       ✓ No tearing temporarily on update (14729 ms)
       ✓ No tearing temporarily on mount (4606 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4618 ms)
       ✓ No tearing finally on mount (9543 ms)
     Level 2
       ✓ No tearing temporarily on update (8713 ms)
       ✓ No tearing temporarily on mount (8487 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3670 ms)
       ✕ Can branch state (wip state) (10256 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (12225 ms)
       ✓ No tearing finally on mount (5744 ms)
     Level 2
       ✓ No tearing temporarily on update (14675 ms)
       ✓ No tearing temporarily on mount (5633 ms)

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
		<td>:white_check_mark:</td>
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
