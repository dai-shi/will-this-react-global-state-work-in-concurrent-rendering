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
       ✓ No tearing finally on update (8099 ms)
       ✓ No tearing finally on mount (4746 ms)
     Level 2
       ✓ No tearing temporarily on update (13075 ms)
       ✓ No tearing temporarily on mount (4680 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8059 ms)
       ✕ Can branch state (wip state) (6779 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9720 ms)
       ✓ No tearing finally on mount (4720 ms)
     Level 2
       ✓ No tearing temporarily on update (14718 ms)
       ✓ No tearing temporarily on mount (4695 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8084 ms)
       ✓ No tearing finally on mount (4697 ms)
     Level 2
       ✓ No tearing temporarily on update (13070 ms)
       ✓ No tearing temporarily on mount (4633 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8045 ms)
       ✕ Can branch state (wip state) (6767 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9724 ms)
       ✓ No tearing finally on mount (4743 ms)
     Level 2
       ✓ No tearing temporarily on update (14721 ms)
       ✓ No tearing temporarily on mount (4701 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5656 ms)
       ✓ No tearing finally on mount (9631 ms)
     Level 2
       ✓ No tearing temporarily on update (8741 ms)
       ✓ No tearing temporarily on mount (9584 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3722 ms)
       ✓ Can branch state (wip state) (8251 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15453 ms)
       ✓ No tearing finally on mount (6614 ms)
     Level 2
       ✓ No tearing temporarily on update (19588 ms)
       ✓ No tearing temporarily on mount (6540 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4640 ms)
       ✓ No tearing finally on mount (7634 ms)
     Level 2
       ✓ No tearing temporarily on update (8743 ms)
       ✓ No tearing temporarily on mount (8579 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3730 ms)
       ✓ Can branch state (wip state) (5237 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9738 ms)
       ✓ No tearing finally on mount (5766 ms)
     Level 2
       ✓ No tearing temporarily on update (14750 ms)
       ✓ No tearing temporarily on mount (5699 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (8100 ms)
       ✓ No tearing finally on mount (4765 ms)
     Level 2
       ✓ No tearing temporarily on update (13098 ms)
       ✓ No tearing temporarily on mount (4697 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8049 ms)
       ✕ Can branch state (wip state) (6779 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9756 ms)
       ✓ No tearing finally on mount (4741 ms)
     Level 2
       ✓ No tearing temporarily on update (14736 ms)
       ✓ No tearing temporarily on mount (4663 ms)
 use-context-selector-base
   With useTransition
     Level 1
       ✓ No tearing finally on update (8025 ms)
       ✓ No tearing finally on mount (8651 ms)
     Level 2
       ✓ No tearing temporarily on update (13018 ms)
       ✓ No tearing temporarily on mount (8590 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8004 ms)
       ✕ Can branch state (wip state) (7752 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9726 ms)
       ✓ No tearing finally on mount (5771 ms)
     Level 2
       ✓ No tearing temporarily on update (14759 ms)
       ✓ No tearing temporarily on mount (5684 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5611 ms)
       ✓ No tearing finally on mount (11643 ms)
     Level 2
       ✓ No tearing temporarily on update (8733 ms)
       ✓ No tearing temporarily on mount (11591 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3693 ms)
       ✓ Can branch state (wip state) (8249 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15482 ms)
       ✓ No tearing finally on mount (6644 ms)
     Level 2
       ✓ No tearing temporarily on update (19611 ms)
       ✓ No tearing temporarily on mount (6549 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (8120 ms)
       ✓ No tearing finally on mount (4756 ms)
     Level 2
       ✓ No tearing temporarily on update (13133 ms)
       ✓ No tearing temporarily on mount (4712 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8056 ms)
       ✕ Can branch state (wip state) (6797 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9762 ms)
       ✓ No tearing finally on mount (4741 ms)
     Level 2
       ✓ No tearing temporarily on update (14756 ms)
       ✓ No tearing temporarily on mount (4707 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8307 ms)
       ✓ No tearing finally on mount (5721 ms)
     Level 2
       ✓ No tearing temporarily on update (13217 ms)
       ✓ No tearing temporarily on mount (5690 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8229 ms)
       ✕ Can branch state (wip state) (7898 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (6618 ms)
       ✓ No tearing finally on mount (5728 ms)
     Level 2
       ✓ No tearing temporarily on update (9749 ms)
       ✓ No tearing temporarily on mount (4684 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8138 ms)
       ✓ No tearing finally on mount (4695 ms)
     Level 2
       ✓ No tearing temporarily on update (13124 ms)
       ✓ No tearing temporarily on mount (4660 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8121 ms)
       ✕ Can branch state (wip state) (6795 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9774 ms)
       ✓ No tearing finally on mount (4753 ms)
     Level 2
       ✓ No tearing temporarily on update (14818 ms)
       ✓ No tearing temporarily on mount (4700 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5682 ms)
       ✓ No tearing finally on mount (6634 ms)
     Level 2
       ✓ No tearing temporarily on update (8804 ms)
       ✕ No tearing temporarily on mount (6625 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3742 ms)
       ✕ Can branch state (wip state) (10288 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11361 ms)
       ✓ No tearing finally on mount (5770 ms)
     Level 2
       ✓ No tearing temporarily on update (15503 ms)
       ✕ No tearing temporarily on mount (5684 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (5659 ms)
       ✓ No tearing finally on mount (7640 ms)
     Level 2
       ✓ No tearing temporarily on update (9749 ms)
       ✕ No tearing temporarily on mount (7602 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4715 ms)
       ✕ Can branch state (wip state) (10283 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10759 ms)
       ✓ No tearing finally on mount (6745 ms)
     Level 2
       ✓ No tearing temporarily on update (15742 ms)
       ✕ No tearing temporarily on mount (6654 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6627 ms)
       ✓ No tearing finally on mount (11634 ms)
     Level 2
       ✓ No tearing temporarily on update (9767 ms)
       ✓ No tearing temporarily on mount (13621 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4748 ms)
       ✓ Can branch state (wip state) (9305 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16492 ms)
       ✓ No tearing finally on mount (6617 ms)
     Level 2
       ✓ No tearing temporarily on update (20621 ms)
       ✓ No tearing temporarily on mount (6545 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8127 ms)
       ✓ No tearing finally on mount (4764 ms)
     Level 2
       ✓ No tearing temporarily on update (13085 ms)
       ✓ No tearing temporarily on mount (4717 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8054 ms)
       ✕ Can branch state (wip state) (6800 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9768 ms)
       ✓ No tearing finally on mount (4727 ms)
     Level 2
       ✓ No tearing temporarily on update (14749 ms)
       ✓ No tearing temporarily on mount (4699 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (8113 ms)
       ✓ No tearing finally on mount (4779 ms)
     Level 2
       ✓ No tearing temporarily on update (13100 ms)
       ✓ No tearing temporarily on mount (4702 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8085 ms)
       ✕ Can branch state (wip state) (6799 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9806 ms)
       ✓ No tearing finally on mount (4738 ms)
     Level 2
       ✓ No tearing temporarily on update (14741 ms)
       ✓ No tearing temporarily on mount (4728 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8124 ms)
       ✓ No tearing finally on mount (4728 ms)
     Level 2
       ✓ No tearing temporarily on update (13136 ms)
       ✓ No tearing temporarily on mount (4706 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8097 ms)
       ✕ Can branch state (wip state) (6811 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9751 ms)
       ✓ No tearing finally on mount (4749 ms)
     Level 2
       ✓ No tearing temporarily on update (14762 ms)
       ✓ No tearing temporarily on mount (4709 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4614 ms)
       ✓ No tearing finally on mount (8648 ms)
     Level 2
       ✓ No tearing temporarily on update (8738 ms)
       ✓ No tearing temporarily on mount (7580 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3691 ms)
       ✕ Can branch state (wip state) (9224 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9733 ms)
       ✓ No tearing finally on mount (5776 ms)
     Level 2
       ✓ No tearing temporarily on update (14750 ms)
       ✓ No tearing temporarily on mount (6634 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8214 ms)
       ✓ No tearing finally on mount (4787 ms)
     Level 2
       ✕ No tearing temporarily on update (13204 ms)
       ✓ No tearing temporarily on mount (4702 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8178 ms)
       ✕ Can branch state (wip state) (6830 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9644 ms)
       ✓ No tearing finally on mount (4725 ms)
     Level 2
       ✓ No tearing temporarily on update (13782 ms)
       ✓ No tearing temporarily on mount (4687 ms)

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
