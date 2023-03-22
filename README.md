# Will this React global state work in concurrent rendering?

Test tearing and branching in React concurrent rendering

- [Discussion in React 18 WG](https://github.com/reactwg/react-18/discussions/116)

## Introduction

React 18 comes with a new feature called "concurrent rendering".
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

The render has intentionally expensive computation.
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

## Screencast (old one with react-redux v7. v8 works great.)

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
       ✓ No tearing finally on update (8017 ms)
       ✓ No tearing finally on mount (4634 ms)
     Level 2
       ✓ No tearing temporarily on update (12904 ms)
       ✓ No tearing temporarily on mount (4523 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7917 ms)
       ✕ Can branch state (wip state) (6688 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9558 ms)
       ✓ No tearing finally on mount (4531 ms)
     Level 2
       ✓ No tearing temporarily on update (14559 ms)
       ✓ No tearing temporarily on mount (4544 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8018 ms)
       ✓ No tearing finally on mount (4609 ms)
     Level 2
       ✓ No tearing temporarily on update (12965 ms)
       ✓ No tearing temporarily on mount (4531 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7939 ms)
       ✕ Can branch state (wip state) (6661 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9633 ms)
       ✓ No tearing finally on mount (4557 ms)
     Level 2
       ✓ No tearing temporarily on update (14605 ms)
       ✓ No tearing temporarily on mount (4514 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5602 ms)
       ✓ No tearing finally on mount (7532 ms)
     Level 2
       ✓ No tearing temporarily on update (8600 ms)
       ✓ No tearing temporarily on mount (9442 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3654 ms)
       ✓ Can branch state (wip state) (8211 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15398 ms)
       ✓ No tearing finally on mount (6524 ms)
     Level 2
       ✓ No tearing temporarily on update (19423 ms)
       ✓ No tearing temporarily on mount (6489 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4603 ms)
       ✓ No tearing finally on mount (7503 ms)
     Level 2
       ✓ No tearing temporarily on update (8634 ms)
       ✓ No tearing temporarily on mount (7461 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3674 ms)
       ✓ Can branch state (wip state) (5223 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9639 ms)
       ✓ No tearing finally on mount (5659 ms)
     Level 2
       ✓ No tearing temporarily on update (14549 ms)
       ✓ No tearing temporarily on mount (6560 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (7980 ms)
       ✓ No tearing finally on mount (4575 ms)
     Level 2
       ✓ No tearing temporarily on update (12951 ms)
       ✓ No tearing temporarily on mount (4531 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7931 ms)
       ✕ Can branch state (wip state) (6698 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9608 ms)
       ✓ No tearing finally on mount (4592 ms)
     Level 2
       ✓ No tearing temporarily on update (14582 ms)
       ✓ No tearing temporarily on mount (4523 ms)
 use-context-selector-base
   With useTransition
     Level 1
       ✓ No tearing finally on update (7906 ms)
       ✓ No tearing finally on mount (7465 ms)
     Level 2
       ✓ No tearing temporarily on update (12863 ms)
       ✓ No tearing temporarily on mount (7453 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7879 ms)
       ✕ Can branch state (wip state) (7646 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9709 ms)
       ✓ No tearing finally on mount (5702 ms)
     Level 2
       ✓ No tearing temporarily on update (14642 ms)
       ✓ No tearing temporarily on mount (5583 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5591 ms)
       ✓ No tearing finally on mount (9479 ms)
     Level 2
       ✓ No tearing temporarily on update (8599 ms)
       ✓ No tearing temporarily on mount (9462 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3634 ms)
       ✓ Can branch state (wip state) (8217 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15452 ms)
       ✓ No tearing finally on mount (6546 ms)
     Level 2
       ✓ No tearing temporarily on update (19502 ms)
       ✓ No tearing temporarily on mount (6494 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (7992 ms)
       ✓ No tearing finally on mount (4624 ms)
     Level 2
       ✓ No tearing temporarily on update (12978 ms)
       ✓ No tearing temporarily on mount (4553 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7948 ms)
       ✕ Can branch state (wip state) (6696 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9669 ms)
       ✓ No tearing finally on mount (4573 ms)
     Level 2
       ✓ No tearing temporarily on update (14646 ms)
       ✓ No tearing temporarily on mount (4547 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8208 ms)
       ✓ No tearing finally on mount (4587 ms)
     Level 2
       ✓ No tearing temporarily on update (13117 ms)
       ✓ No tearing temporarily on mount (4571 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8102 ms)
       ✕ Can branch state (wip state) (7837 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (6787 ms)
       ✓ No tearing finally on mount (4629 ms)
     Level 2
       ✓ No tearing temporarily on update (9636 ms)
       ✓ No tearing temporarily on mount (4573 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8078 ms)
       ✓ No tearing finally on mount (4613 ms)
     Level 2
       ✓ No tearing temporarily on update (13026 ms)
       ✓ No tearing temporarily on mount (4565 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8038 ms)
       ✕ Can branch state (wip state) (6761 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9694 ms)
       ✓ No tearing finally on mount (4604 ms)
     Level 2
       ✓ No tearing temporarily on update (14693 ms)
       ✓ No tearing temporarily on mount (4603 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5654 ms)
       ✓ No tearing finally on mount (5573 ms)
     Level 2
       ✓ No tearing temporarily on update (8604 ms)
       ✕ No tearing temporarily on mount (5524 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3636 ms)
       ✕ Can branch state (wip state) (10201 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11370 ms)
       ✓ No tearing finally on mount (5524 ms)
     Level 2
       ✓ No tearing temporarily on update (15438 ms)
       ✕ No tearing temporarily on mount (5558 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (5690 ms)
       ✓ No tearing finally on mount (6527 ms)
     Level 2
       ✓ No tearing temporarily on update (9684 ms)
       ✕ No tearing temporarily on mount (5472 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4641 ms)
       ✕ Can branch state (wip state) (10254 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10696 ms)
       ✓ No tearing finally on mount (5652 ms)
     Level 2
       ✓ No tearing temporarily on update (15663 ms)
       ✕ No tearing temporarily on mount (6576 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6640 ms)
       ✓ No tearing finally on mount (7516 ms)
     Level 2
       ✓ No tearing temporarily on update (9680 ms)
       ✓ No tearing temporarily on mount (11519 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4668 ms)
       ✓ Can branch state (wip state) (9310 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16532 ms)
       ✓ No tearing finally on mount (6602 ms)
     Level 2
       ✓ No tearing temporarily on update (20501 ms)
       ✓ No tearing temporarily on mount (6499 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8078 ms)
       ✓ No tearing finally on mount (4610 ms)
     Level 2
       ✓ No tearing temporarily on update (13018 ms)
       ✓ No tearing temporarily on mount (4563 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8003 ms)
       ✕ Can branch state (wip state) (6708 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9675 ms)
       ✓ No tearing finally on mount (4574 ms)
     Level 2
       ✓ No tearing temporarily on update (14635 ms)
       ✓ No tearing temporarily on mount (4571 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (8036 ms)
       ✓ No tearing finally on mount (4579 ms)
     Level 2
       ✓ No tearing temporarily on update (12985 ms)
       ✓ No tearing temporarily on mount (4558 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7990 ms)
       ✕ Can branch state (wip state) (6728 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9692 ms)
       ✓ No tearing finally on mount (4617 ms)
     Level 2
       ✓ No tearing temporarily on update (14651 ms)
       ✓ No tearing temporarily on mount (4521 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8074 ms)
       ✓ No tearing finally on mount (4594 ms)
     Level 2
       ✓ No tearing temporarily on update (13006 ms)
       ✓ No tearing temporarily on mount (4581 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8006 ms)
       ✕ Can branch state (wip state) (6706 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9689 ms)
       ✓ No tearing finally on mount (4610 ms)
     Level 2
       ✓ No tearing temporarily on update (14684 ms)
       ✓ No tearing temporarily on mount (4573 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4654 ms)
       ✓ No tearing finally on mount (6535 ms)
     Level 2
       ✓ No tearing temporarily on update (8667 ms)
       ✓ No tearing temporarily on mount (6470 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3645 ms)
       ✕ Can branch state (wip state) (9197 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9691 ms)
       ✓ No tearing finally on mount (6637 ms)
     Level 2
       ✓ No tearing temporarily on update (14637 ms)
       ✓ No tearing temporarily on mount (5500 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8121 ms)
       ✓ No tearing finally on mount (4597 ms)
     Level 2
       ✕ No tearing temporarily on update (13101 ms)
       ✓ No tearing temporarily on mount (4589 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8088 ms)
       ✕ Can branch state (wip state) (6754 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9615 ms)
       ✓ No tearing finally on mount (4574 ms)
     Level 2
       ✓ No tearing temporarily on update (13733 ms)
       ✓ No tearing temporarily on mount (4576 ms)
 mobx
   With useTransition
     Level 1
       ✓ No tearing finally on update (4660 ms)
       ✓ No tearing finally on mount (5550 ms)
     Level 2
       ✕ No tearing temporarily on update (8749 ms)
       ✕ No tearing temporarily on mount (5519 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3654 ms)
       ✕ Can branch state (wip state) (2996 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9706 ms)
       ✓ No tearing finally on mount (5560 ms)
     Level 2
       ✓ No tearing temporarily on update (14635 ms)
       ✕ No tearing temporarily on mount (5550 ms)

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
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer, w/o useContextUpdate)</th>
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
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
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
	<tr>
		<th><a href="https://react-query.tanstack.com/">react-query</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/mobxjs/mobx-react-lite">mobx-react-lite</a></th>
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
