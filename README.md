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
       ✓ No tearing finally on update (8111 ms)
       ✓ No tearing finally on mount (4750 ms)
     Level 2
       ✓ No tearing temporarily on update (13089 ms)
       ✓ No tearing temporarily on mount (4658 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8052 ms)
       ✕ Can branch state (wip state) (6770 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9729 ms)
       ✓ No tearing finally on mount (4734 ms)
     Level 2
       ✓ No tearing temporarily on update (14749 ms)
       ✓ No tearing temporarily on mount (4728 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8125 ms)
       ✓ No tearing finally on mount (4687 ms)
     Level 2
       ✓ No tearing temporarily on update (13062 ms)
       ✓ No tearing temporarily on mount (4666 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8024 ms)
       ✕ Can branch state (wip state) (6772 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9725 ms)
       ✓ No tearing finally on mount (4692 ms)
     Level 2
       ✓ No tearing temporarily on update (14756 ms)
       ✓ No tearing temporarily on mount (4670 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5632 ms)
       ✓ No tearing finally on mount (9615 ms)
     Level 2
       ✓ No tearing temporarily on update (8722 ms)
       ✓ No tearing temporarily on mount (9589 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3669 ms)
       ✓ Can branch state (wip state) (8249 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15459 ms)
       ✓ No tearing finally on mount (6622 ms)
     Level 2
       ✓ No tearing temporarily on update (19592 ms)
       ✓ No tearing temporarily on mount (6537 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4647 ms)
       ✓ No tearing finally on mount (7621 ms)
     Level 2
       ✓ No tearing temporarily on update (8764 ms)
       ✓ No tearing temporarily on mount (7591 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3714 ms)
       ✓ Can branch state (wip state) (5250 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9732 ms)
       ✓ No tearing finally on mount (5751 ms)
     Level 2
       ✓ No tearing temporarily on update (14753 ms)
       ✓ No tearing temporarily on mount (5707 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (8100 ms)
       ✓ No tearing finally on mount (4751 ms)
     Level 2
       ✓ No tearing temporarily on update (13116 ms)
       ✓ No tearing temporarily on mount (4700 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8062 ms)
       ✕ Can branch state (wip state) (6786 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9723 ms)
       ✓ No tearing finally on mount (4731 ms)
     Level 2
       ✓ No tearing temporarily on update (14743 ms)
       ✓ No tearing temporarily on mount (4708 ms)
 use-context-selector-base
   With useTransition
     Level 1
       ✓ No tearing finally on update (8020 ms)
       ✓ No tearing finally on mount (7604 ms)
     Level 2
       ✓ No tearing temporarily on update (13002 ms)
       ✓ No tearing temporarily on mount (8606 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7974 ms)
       ✕ Can branch state (wip state) (7783 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9726 ms)
       ✓ No tearing finally on mount (5784 ms)
     Level 2
       ✓ No tearing temporarily on update (14788 ms)
       ✓ No tearing temporarily on mount (5710 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5554 ms)
       ✓ No tearing finally on mount (11611 ms)
     Level 2
       ✓ No tearing temporarily on update (8704 ms)
       ✓ No tearing temporarily on mount (11607 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3672 ms)
       ✓ Can branch state (wip state) (8246 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15470 ms)
       ✓ No tearing finally on mount (8634 ms)
     Level 2
       ✓ No tearing temporarily on update (19581 ms)
       ✓ No tearing temporarily on mount (6546 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (8099 ms)
       ✓ No tearing finally on mount (4675 ms)
     Level 2
       ✓ No tearing temporarily on update (13124 ms)
       ✓ No tearing temporarily on mount (4722 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8035 ms)
       ✕ Can branch state (wip state) (6806 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9767 ms)
       ✓ No tearing finally on mount (4717 ms)
     Level 2
       ✓ No tearing temporarily on update (14739 ms)
       ✓ No tearing temporarily on mount (4732 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8281 ms)
       ✓ No tearing finally on mount (5745 ms)
     Level 2
       ✓ No tearing temporarily on update (13237 ms)
       ✓ No tearing temporarily on mount (5695 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8222 ms)
       ✕ Can branch state (wip state) (7864 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (6578 ms)
       ✓ No tearing finally on mount (5705 ms)
     Level 2
       ✓ No tearing temporarily on update (9707 ms)
       ✓ No tearing temporarily on mount (5712 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8152 ms)
       ✓ No tearing finally on mount (4745 ms)
     Level 2
       ✓ No tearing temporarily on update (13157 ms)
       ✓ No tearing temporarily on mount (4749 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8120 ms)
       ✕ Can branch state (wip state) (6843 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9760 ms)
       ✓ No tearing finally on mount (4721 ms)
     Level 2
       ✓ No tearing temporarily on update (14767 ms)
       ✓ No tearing temporarily on mount (4737 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5645 ms)
       ✓ No tearing finally on mount (6650 ms)
     Level 2
       ✓ No tearing temporarily on update (8754 ms)
       ✕ No tearing temporarily on mount (5640 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3717 ms)
       ✕ Can branch state (wip state) (10319 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11378 ms)
       ✓ No tearing finally on mount (5713 ms)
     Level 2
       ✓ No tearing temporarily on update (15525 ms)
       ✕ No tearing temporarily on mount (5665 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (5618 ms)
       ✓ No tearing finally on mount (8607 ms)
     Level 2
       ✓ No tearing temporarily on update (9730 ms)
       ✕ No tearing temporarily on mount (8578 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4676 ms)
       ✕ Can branch state (wip state) (10271 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10739 ms)
       ✓ No tearing finally on mount (6706 ms)
     Level 2
       ✓ No tearing temporarily on update (15734 ms)
       ✕ No tearing temporarily on mount (5714 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6626 ms)
       ✓ No tearing finally on mount (11617 ms)
     Level 2
       ✓ No tearing temporarily on update (9775 ms)
       ✓ No tearing temporarily on mount (11589 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4690 ms)
       ✓ Can branch state (wip state) (9250 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16475 ms)
       ✓ No tearing finally on mount (6627 ms)
     Level 2
       ✓ No tearing temporarily on update (20627 ms)
       ✓ No tearing temporarily on mount (6540 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8110 ms)
       ✓ No tearing finally on mount (4768 ms)
     Level 2
       ✓ No tearing temporarily on update (13113 ms)
       ✓ No tearing temporarily on mount (4706 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8121 ms)
       ✕ Can branch state (wip state) (6826 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9745 ms)
       ✓ No tearing finally on mount (4755 ms)
     Level 2
       ✓ No tearing temporarily on update (14761 ms)
       ✓ No tearing temporarily on mount (4708 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (10346 ms)
       ✓ No tearing finally on mount (4740 ms)
     Level 2
       ✓ No tearing temporarily on update (13097 ms)
       ✓ No tearing temporarily on mount (4744 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8078 ms)
       ✕ Can branch state (wip state) (6775 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9720 ms)
       ✓ No tearing finally on mount (4734 ms)
     Level 2
       ✓ No tearing temporarily on update (14758 ms)
       ✓ No tearing temporarily on mount (4709 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8130 ms)
       ✓ No tearing finally on mount (4737 ms)
     Level 2
       ✓ No tearing temporarily on update (13148 ms)
       ✓ No tearing temporarily on mount (4702 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8085 ms)
       ✕ Can branch state (wip state) (6770 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9747 ms)
       ✓ No tearing finally on mount (4728 ms)
     Level 2
       ✓ No tearing temporarily on update (14747 ms)
       ✓ No tearing temporarily on mount (4677 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4634 ms)
       ✓ No tearing finally on mount (8634 ms)
     Level 2
       ✓ No tearing temporarily on update (8760 ms)
       ✓ No tearing temporarily on mount (6573 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3705 ms)
       ✕ Can branch state (wip state) (9243 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9706 ms)
       ✓ No tearing finally on mount (6720 ms)
     Level 2
       ✓ No tearing temporarily on update (14750 ms)
       ✓ No tearing temporarily on mount (6629 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8195 ms)
       ✓ No tearing finally on mount (4714 ms)
     Level 2
       ✕ No tearing temporarily on update (13166 ms)
       ✓ No tearing temporarily on mount (4711 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8127 ms)
       ✕ Can branch state (wip state) (6812 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9629 ms)
       ✓ No tearing finally on mount (4679 ms)
     Level 2
       ✓ No tearing temporarily on update (13776 ms)
       ✓ No tearing temporarily on mount (4714 ms)

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
