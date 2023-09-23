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
       ✓ No tearing finally on update (7990 ms)
       ✓ No tearing finally on mount (4608 ms)
     Level 2
       ✓ No tearing temporarily on update (12955 ms)
       ✓ No tearing temporarily on mount (4546 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7926 ms)
       ✕ Can branch state (wip state) (6655 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9568 ms)
       ✓ No tearing finally on mount (4544 ms)
     Level 2
       ✓ No tearing temporarily on update (14627 ms)
       ✓ No tearing temporarily on mount (4569 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (7994 ms)
       ✓ No tearing finally on mount (4623 ms)
     Level 2
       ✓ No tearing temporarily on update (12966 ms)
       ✓ No tearing temporarily on mount (4505 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7922 ms)
       ✕ Can branch state (wip state) (6679 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9631 ms)
       ✓ No tearing finally on mount (4641 ms)
     Level 2
       ✓ No tearing temporarily on update (14656 ms)
       ✓ No tearing temporarily on mount (4544 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5586 ms)
       ✓ No tearing finally on mount (9520 ms)
     Level 2
       ✓ No tearing temporarily on update (8625 ms)
       ✓ No tearing temporarily on mount (9455 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3555 ms)
       ✓ Can branch state (wip state) (8216 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15399 ms)
       ✓ No tearing finally on mount (6528 ms)
     Level 2
       ✓ No tearing temporarily on update (19473 ms)
       ✓ No tearing temporarily on mount (8479 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4526 ms)
       ✓ No tearing finally on mount (7464 ms)
     Level 2
       ✓ No tearing temporarily on update (8619 ms)
       ✓ No tearing temporarily on mount (8491 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3635 ms)
       ✓ Can branch state (wip state) (5159 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9626 ms)
       ✓ No tearing finally on mount (6629 ms)
     Level 2
       ✓ No tearing temporarily on update (14643 ms)
       ✓ No tearing temporarily on mount (5578 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (7954 ms)
       ✓ No tearing finally on mount (4564 ms)
     Level 2
       ✓ No tearing temporarily on update (12975 ms)
       ✓ No tearing temporarily on mount (4525 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7896 ms)
       ✕ Can branch state (wip state) (6648 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9624 ms)
       ✓ No tearing finally on mount (4547 ms)
     Level 2
       ✓ No tearing temporarily on update (14636 ms)
       ✓ No tearing temporarily on mount (4549 ms)
 use-context-selector-base
   With useTransition
     Level 1
       ✓ No tearing finally on update (7851 ms)
       ✓ No tearing finally on mount (8476 ms)
     Level 2
       ✓ No tearing temporarily on update (12836 ms)
       ✓ No tearing temporarily on mount (8496 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7846 ms)
       ✕ Can branch state (wip state) (7629 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9706 ms)
       ✓ No tearing finally on mount (5650 ms)
     Level 2
       ✓ No tearing temporarily on update (14623 ms)
       ✓ No tearing temporarily on mount (5590 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5503 ms)
       ✓ No tearing finally on mount (11504 ms)
     Level 2
       ✓ No tearing temporarily on update (8629 ms)
       ✓ No tearing temporarily on mount (11478 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3565 ms)
       ✓ Can branch state (wip state) (8202 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15341 ms)
       ✓ No tearing finally on mount (6542 ms)
     Level 2
       ✓ No tearing temporarily on update (20063 ms)
       ✓ No tearing temporarily on mount (8598 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (7989 ms)
       ✓ No tearing finally on mount (4610 ms)
     Level 2
       ✓ No tearing temporarily on update (12955 ms)
       ✓ No tearing temporarily on mount (4541 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7947 ms)
       ✕ Can branch state (wip state) (6656 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9612 ms)
       ✓ No tearing finally on mount (4555 ms)
     Level 2
       ✓ No tearing temporarily on update (14580 ms)
       ✓ No tearing temporarily on mount (4588 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8142 ms)
       ✓ No tearing finally on mount (4638 ms)
     Level 2
       ✓ No tearing temporarily on update (13105 ms)
       ✓ No tearing temporarily on mount (5551 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8083 ms)
       ✕ Can branch state (wip state) (7756 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (6514 ms)
       ✓ No tearing finally on mount (5679 ms)
     Level 2
       ✓ No tearing temporarily on update (9692 ms)
       ✓ No tearing temporarily on mount (4724 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8119 ms)
       ✓ No tearing finally on mount (4729 ms)
     Level 2
       ✓ No tearing temporarily on update (13109 ms)
       ✓ No tearing temporarily on mount (4670 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8047 ms)
       ✕ Can branch state (wip state) (6808 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9780 ms)
       ✓ No tearing finally on mount (4673 ms)
     Level 2
       ✓ No tearing temporarily on update (14784 ms)
       ✓ No tearing temporarily on mount (4667 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5736 ms)
       ✓ No tearing finally on mount (5624 ms)
     Level 2
       ✓ No tearing temporarily on update (8723 ms)
       ✕ No tearing temporarily on mount (5586 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3763 ms)
       ✕ Can branch state (wip state) (10277 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11399 ms)
       ✓ No tearing finally on mount (5612 ms)
     Level 2
       ✓ No tearing temporarily on update (15529 ms)
       ✕ No tearing temporarily on mount (5579 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (5633 ms)
       ✓ No tearing finally on mount (6580 ms)
     Level 2
       ✓ No tearing temporarily on update (9753 ms)
       ✕ No tearing temporarily on mount (6550 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4707 ms)
       ✕ Can branch state (wip state) (10238 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10713 ms)
       ✓ No tearing finally on mount (6736 ms)
     Level 2
       ✓ No tearing temporarily on update (15726 ms)
       ✕ No tearing temporarily on mount (5661 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6616 ms)
       ✓ No tearing finally on mount (9592 ms)
     Level 2
       ✓ No tearing temporarily on update (9713 ms)
       ✓ No tearing temporarily on mount (9559 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4749 ms)
       ✓ Can branch state (wip state) (9292 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16565 ms)
       ✓ No tearing finally on mount (6647 ms)
     Level 2
       ✓ No tearing temporarily on update (20596 ms)
       ✓ No tearing temporarily on mount (6604 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8087 ms)
       ✓ No tearing finally on mount (4701 ms)
     Level 2
       ✓ No tearing temporarily on update (13031 ms)
       ✓ No tearing temporarily on mount (4741 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8028 ms)
       ✕ Can branch state (wip state) (6785 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9729 ms)
       ✓ No tearing finally on mount (4694 ms)
     Level 2
       ✓ No tearing temporarily on update (14789 ms)
       ✓ No tearing temporarily on mount (4682 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (8153 ms)
       ✓ No tearing finally on mount (4653 ms)
     Level 2
       ✓ No tearing temporarily on update (13080 ms)
       ✓ No tearing temporarily on mount (4668 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8003 ms)
       ✕ Can branch state (wip state) (6776 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9689 ms)
       ✓ No tearing finally on mount (4730 ms)
     Level 2
       ✓ No tearing temporarily on update (14725 ms)
       ✓ No tearing temporarily on mount (4608 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8066 ms)
       ✓ No tearing finally on mount (4658 ms)
     Level 2
       ✓ No tearing temporarily on update (13040 ms)
       ✓ No tearing temporarily on mount (4637 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8027 ms)
       ✕ Can branch state (wip state) (6797 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9765 ms)
       ✓ No tearing finally on mount (4625 ms)
     Level 2
       ✓ No tearing temporarily on update (14783 ms)
       ✓ No tearing temporarily on mount (4642 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4613 ms)
       ✓ No tearing finally on mount (8591 ms)
     Level 2
       ✓ No tearing temporarily on update (8730 ms)
       ✓ No tearing temporarily on mount (8572 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3712 ms)
       ✕ Can branch state (wip state) (9293 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9718 ms)
       ✓ No tearing finally on mount (6708 ms)
     Level 2
       ✓ No tearing temporarily on update (14698 ms)
       ✓ No tearing temporarily on mount (5680 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8131 ms)
       ✓ No tearing finally on mount (4716 ms)
     Level 2
       ✕ No tearing temporarily on update (13174 ms)
       ✓ No tearing temporarily on mount (4655 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8120 ms)
       ✕ Can branch state (wip state) (6807 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9594 ms)
       ✓ No tearing finally on mount (4665 ms)
     Level 2
       ✓ No tearing temporarily on update (13721 ms)
       ✓ No tearing temporarily on mount (4653 ms)
 mobx-react-lite
   With useTransition
     Level 1
       ✓ No tearing finally on update (4651 ms)
       ✓ No tearing finally on mount (5610 ms)
     Level 2
       ✓ No tearing temporarily on update (8739 ms)
       ✓ No tearing temporarily on mount (6586 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (3692 ms)
       ✕ Can branch state (wip state) (3071 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9777 ms)
       ✓ No tearing finally on mount (6595 ms)
     Level 2
       ✓ No tearing temporarily on update (14724 ms)
       ✓ No tearing temporarily on mount (6568 ms)

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
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
