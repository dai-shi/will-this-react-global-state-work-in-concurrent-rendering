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
       ✓ No tearing finally on update (8142 ms)
       ✓ No tearing finally on mount (4766 ms)
     Level 2
       ✓ No tearing temporarily on update (13062 ms)
       ✓ No tearing temporarily on mount (4709 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8055 ms)
       ✕ Can branch state (wip state) (6746 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9792 ms)
       ✓ No tearing finally on mount (4686 ms)
     Level 2
       ✓ No tearing temporarily on update (14872 ms)
       ✓ No tearing temporarily on mount (4641 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8130 ms)
       ✓ No tearing finally on mount (4730 ms)
     Level 2
       ✓ No tearing temporarily on update (13090 ms)
       ✓ No tearing temporarily on mount (4647 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8083 ms)
       ✕ Can branch state (wip state) (6745 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9814 ms)
       ✓ No tearing finally on mount (4679 ms)
     Level 2
       ✓ No tearing temporarily on update (14759 ms)
       ✓ No tearing temporarily on mount (4714 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5705 ms)
       ✓ No tearing finally on mount (11635 ms)
     Level 2
       ✓ No tearing temporarily on update (8770 ms)
       ✓ No tearing temporarily on mount (11545 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3774 ms)
       ✓ Can branch state (wip state) (8315 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15509 ms)
       ✓ No tearing finally on mount (6601 ms)
     Level 2
       ✓ No tearing temporarily on update (19621 ms)
       ✓ No tearing temporarily on mount (8531 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4714 ms)
       ✓ No tearing finally on mount (8616 ms)
     Level 2
       ✓ No tearing temporarily on update (8798 ms)
       ✓ No tearing temporarily on mount (8537 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3809 ms)
       ✓ Can branch state (wip state) (5304 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9813 ms)
       ✓ No tearing finally on mount (5746 ms)
     Level 2
       ✓ No tearing temporarily on update (14772 ms)
       ✓ No tearing temporarily on mount (5660 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5668 ms)
       ✓ No tearing finally on mount (7631 ms)
     Level 2
       ✓ No tearing temporarily on update (8795 ms)
       ✕ No tearing temporarily on mount (7542 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3774 ms)
       ✕ Can branch state (wip state) (10266 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11395 ms)
       ✓ No tearing finally on mount (5716 ms)
     Level 2
       ✓ No tearing temporarily on update (15515 ms)
       ✕ No tearing temporarily on mount (5670 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5694 ms)
       ✓ No tearing finally on mount (13601 ms)
     Level 2
       ✓ No tearing temporarily on update (8753 ms)
       ✓ No tearing temporarily on mount (13548 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3774 ms)
       ✓ Can branch state (wip state) (8270 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15515 ms)
       ✓ No tearing finally on mount (8602 ms)
     Level 2
       ✓ No tearing temporarily on update (19633 ms)
       ✓ No tearing temporarily on mount (8509 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (8141 ms)
       ✓ No tearing finally on mount (4764 ms)
     Level 2
       ✓ No tearing temporarily on update (13077 ms)
       ✓ No tearing temporarily on mount (4645 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8092 ms)
       ✕ Can branch state (wip state) (6752 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9795 ms)
       ✓ No tearing finally on mount (4729 ms)
     Level 2
       ✓ No tearing temporarily on update (14803 ms)
       ✓ No tearing temporarily on mount (4714 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8327 ms)
       ✓ No tearing finally on mount (5768 ms)
     Level 2
       ✓ No tearing temporarily on update (13210 ms)
       ✕ No tearing temporarily on mount (5665 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8248 ms)
       ✕ Can branch state (wip state) (7854 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (8610 ms)
       ✓ No tearing finally on mount (6688 ms)
     Level 2
       ✓ No tearing temporarily on update (11706 ms)
       ✕ No tearing temporarily on mount (5670 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8174 ms)
       ✓ No tearing finally on mount (4713 ms)
     Level 2
       ✓ No tearing temporarily on update (13151 ms)
       ✓ No tearing temporarily on mount (4696 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8185 ms)
       ✕ Can branch state (wip state) (6771 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9910 ms)
       ✓ No tearing finally on mount (4736 ms)
     Level 2
       ✓ No tearing temporarily on update (14839 ms)
       ✓ No tearing temporarily on mount (4711 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5746 ms)
       ✓ No tearing finally on mount (6650 ms)
     Level 2
       ✓ No tearing temporarily on update (8833 ms)
       ✕ No tearing temporarily on mount (6628 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3815 ms)
       ✕ Can branch state (wip state) (10343 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11419 ms)
       ✓ No tearing finally on mount (5724 ms)
     Level 2
       ✓ No tearing temporarily on update (15530 ms)
       ✕ No tearing temporarily on mount (5625 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6718 ms)
       ✓ No tearing finally on mount (10621 ms)
     Level 2
       ✓ No tearing temporarily on update (9804 ms)
       ✕ No tearing temporarily on mount (10551 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4774 ms)
       ✕ Can branch state (wip state) (11307 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16415 ms)
       ✓ No tearing finally on mount (9586 ms)
     Level 2
       ✓ No tearing temporarily on update (20504 ms)
       ✕ No tearing temporarily on mount (10494 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5701 ms)
       ✓ No tearing finally on mount (9732 ms)
     Level 2
       ✓ No tearing temporarily on update (9823 ms)
       ✓ No tearing temporarily on mount (8560 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4780 ms)
       ✓ Can branch state (wip state) (6298 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10771 ms)
       ✓ No tearing finally on mount (5779 ms)
     Level 2
       ✓ No tearing temporarily on update (15802 ms)
       ✓ No tearing temporarily on mount (6648 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6674 ms)
       ✓ No tearing finally on mount (16662 ms)
     Level 2
       ✓ No tearing temporarily on update (9817 ms)
       ✓ No tearing temporarily on mount (13567 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4773 ms)
       ✓ Can branch state (wip state) (9317 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16522 ms)
       ✓ No tearing finally on mount (8613 ms)
     Level 2
       ✓ No tearing temporarily on update (20667 ms)
       ✓ No tearing temporarily on mount (8522 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8127 ms)
       ✓ No tearing finally on mount (4758 ms)
     Level 2
       ✓ No tearing temporarily on update (13095 ms)
       ✓ No tearing temporarily on mount (4717 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8077 ms)
       ✕ Can branch state (wip state) (6782 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9814 ms)
       ✓ No tearing finally on mount (4715 ms)
     Level 2
       ✓ No tearing temporarily on update (14826 ms)
       ✓ No tearing temporarily on mount (4629 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4700 ms)
       ✓ No tearing finally on mount (7614 ms)
     Level 2
       ✕ No tearing temporarily on update (8803 ms)
       ✕ No tearing temporarily on mount (7559 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3779 ms)
       ✕ Can branch state (wip state) (3029 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9804 ms)
       ✓ No tearing finally on mount (5666 ms)
     Level 2
       ✓ No tearing temporarily on update (14784 ms)
       ✕ No tearing temporarily on mount (5629 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8122 ms)
       ✓ No tearing finally on mount (4710 ms)
     Level 2
       ✓ No tearing temporarily on update (13109 ms)
       ✓ No tearing temporarily on mount (4694 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8094 ms)
       ✕ Can branch state (wip state) (6769 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9770 ms)
       ✓ No tearing finally on mount (4714 ms)
     Level 2
       ✓ No tearing temporarily on update (14777 ms)
       ✓ No tearing temporarily on mount (4708 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4701 ms)
       ✓ No tearing finally on mount (7612 ms)
     Level 2
       ✓ No tearing temporarily on update (8798 ms)
       ✓ No tearing temporarily on mount (8573 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3809 ms)
       ✕ Can branch state (wip state) (10316 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9797 ms)
       ✓ No tearing finally on mount (5781 ms)
     Level 2
       ✓ No tearing temporarily on update (14756 ms)
       ✓ No tearing temporarily on mount (5698 ms)
 react-query
   With useTransition
     Level 1
       ✓ No tearing finally on update (8235 ms)
       ✓ No tearing finally on mount (4719 ms)
     Level 2
       ✕ No tearing temporarily on update (13180 ms)
       ✓ No tearing temporarily on mount (4662 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8170 ms)
       ✕ Can branch state (wip state) (6817 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9694 ms)
       ✓ No tearing finally on mount (4681 ms)
     Level 2
       ✓ No tearing temporarily on update (13819 ms)
       ✓ No tearing temporarily on mount (4665 ms)

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
