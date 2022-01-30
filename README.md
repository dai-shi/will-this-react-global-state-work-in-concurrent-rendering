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
       ✓ No tearing finally on update (8168 ms)
       ✓ No tearing finally on mount (4773 ms)
     Level 2
       ✓ No tearing temporarily on update (13101 ms)
       ✓ No tearing temporarily on mount (4761 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8126 ms)
       ✕ Can branch state (wip state) (6811 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9778 ms)
       ✓ No tearing finally on mount (4751 ms)
     Level 2
       ✓ No tearing temporarily on update (14809 ms)
       ✓ No tearing temporarily on mount (4713 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8168 ms)
       ✓ No tearing finally on mount (4731 ms)
     Level 2
       ✓ No tearing temporarily on update (13125 ms)
       ✓ No tearing temporarily on mount (4688 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8111 ms)
       ✕ Can branch state (wip state) (6784 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9858 ms)
       ✓ No tearing finally on mount (4717 ms)
     Level 2
       ✓ No tearing temporarily on update (14818 ms)
       ✓ No tearing temporarily on mount (4734 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5736 ms)
       ✓ No tearing finally on mount (13611 ms)
     Level 2
       ✓ No tearing temporarily on update (8851 ms)
       ✓ No tearing temporarily on mount (11592 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3802 ms)
       ✓ Can branch state (wip state) (8349 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15552 ms)
       ✓ No tearing finally on mount (6702 ms)
     Level 2
       ✓ No tearing temporarily on update (19636 ms)
       ✓ No tearing temporarily on mount (6572 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4721 ms)
       ✓ No tearing finally on mount (8638 ms)
     Level 2
       ✓ No tearing temporarily on update (8801 ms)
       ✓ No tearing temporarily on mount (8583 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3742 ms)
       ✓ Can branch state (wip state) (5342 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9813 ms)
       ✓ No tearing finally on mount (5819 ms)
     Level 2
       ✓ No tearing temporarily on update (14894 ms)
       ✓ No tearing temporarily on mount (6713 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5721 ms)
       ✓ No tearing finally on mount (6656 ms)
     Level 2
       ✓ No tearing temporarily on update (8887 ms)
       ✕ No tearing temporarily on mount (8572 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3774 ms)
       ✕ Can branch state (wip state) (10312 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11389 ms)
       ✓ No tearing finally on mount (5768 ms)
     Level 2
       ✓ No tearing temporarily on update (15534 ms)
       ✕ No tearing temporarily on mount (5648 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5763 ms)
       ✓ No tearing finally on mount (9601 ms)
     Level 2
       ✓ No tearing temporarily on update (8823 ms)
       ✓ No tearing temporarily on mount (13577 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3780 ms)
       ✓ Can branch state (wip state) (8313 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15561 ms)
       ✓ No tearing finally on mount (8685 ms)
     Level 2
       ✓ No tearing temporarily on update (19621 ms)
       ✓ No tearing temporarily on mount (8579 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5737 ms)
       ✓ No tearing finally on mount (7633 ms)
     Level 2
       ✓ No tearing temporarily on update (8872 ms)
       ✕ No tearing temporarily on mount (7605 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3809 ms)
       ✕ Can branch state (wip state) (10306 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11404 ms)
       ✓ No tearing finally on mount (5737 ms)
     Level 2
       ✓ No tearing temporarily on update (15553 ms)
       ✕ No tearing temporarily on mount (6656 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8472 ms)
       ✓ No tearing finally on mount (4791 ms)
     Level 2
       ✕ No tearing temporarily on update (13419 ms)
       ✓ No tearing temporarily on mount (4718 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8413 ms)
       ✕ Can branch state (wip state) (6963 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10706 ms)
       ✓ No tearing finally on mount (4778 ms)
     Level 2
       ✕ No tearing temporarily on update (14729 ms)
       ✓ No tearing temporarily on mount (4772 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8197 ms)
       ✓ No tearing finally on mount (4798 ms)
     Level 2
       ✓ No tearing temporarily on update (13205 ms)
       ✓ No tearing temporarily on mount (4775 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8119 ms)
       ✕ Can branch state (wip state) (6828 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9859 ms)
       ✓ No tearing finally on mount (4761 ms)
     Level 2
       ✓ No tearing temporarily on update (14954 ms)
       ✓ No tearing temporarily on mount (4782 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5771 ms)
       ✓ No tearing finally on mount (6710 ms)
     Level 2
       ✓ No tearing temporarily on update (8879 ms)
       ✕ No tearing temporarily on mount (6660 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3914 ms)
       ✕ Can branch state (wip state) (10384 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11558 ms)
       ✓ No tearing finally on mount (6710 ms)
     Level 2
       ✓ No tearing temporarily on update (15668 ms)
       ✕ No tearing temporarily on mount (5696 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6740 ms)
       ✓ No tearing finally on mount (10674 ms)
     Level 2
       ✓ No tearing temporarily on update (9834 ms)
       ✕ No tearing temporarily on mount (10581 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4874 ms)
       ✕ Can branch state (wip state) (11343 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16631 ms)
       ✓ No tearing finally on mount (11644 ms)
     Level 2
       ✓ No tearing temporarily on update (20735 ms)
       ✕ No tearing temporarily on mount (6567 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5764 ms)
       ✓ No tearing finally on mount (8695 ms)
     Level 2
       ✓ No tearing temporarily on update (9763 ms)
       ✓ No tearing temporarily on mount (8537 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4781 ms)
       ✓ Can branch state (wip state) (6314 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11612 ms)
       ✓ No tearing finally on mount (5766 ms)
     Level 2
       ✓ No tearing temporarily on update (15744 ms)
       ✓ No tearing temporarily on mount (5668 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (7653 ms)
       ✓ No tearing finally on mount (11633 ms)
     Level 2
       ✓ No tearing temporarily on update (9817 ms)
       ✓ No tearing temporarily on mount (12546 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4799 ms)
       ✕ Can branch state (wip state) (18348 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16714 ms)
       ✓ No tearing finally on mount (10600 ms)
     Level 2
       ✓ No tearing temporarily on update (20847 ms)
       ✓ No tearing temporarily on mount (10467 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8132 ms)
       ✓ No tearing finally on mount (4820 ms)
     Level 2
       ✓ No tearing temporarily on update (13150 ms)
       ✓ No tearing temporarily on mount (4707 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8127 ms)
       ✕ Can branch state (wip state) (6853 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9856 ms)
       ✓ No tearing finally on mount (4742 ms)
     Level 2
       ✓ No tearing temporarily on update (14865 ms)
       ✓ No tearing temporarily on mount (4733 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4677 ms)
       ✓ No tearing finally on mount (8543 ms)
     Level 2
       ✕ No tearing temporarily on update (8772 ms)
       ✕ No tearing temporarily on mount (9704 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3887 ms)
       ✕ Can branch state (wip state) (3100 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9802 ms)
       ✓ No tearing finally on mount (6680 ms)
     Level 2
       ✓ No tearing temporarily on update (14853 ms)
       ✕ No tearing temporarily on mount (5694 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8146 ms)
       ✓ No tearing finally on mount (7673 ms)
     Level 2
       ✓ No tearing temporarily on update (13162 ms)
       ✕ No tearing temporarily on mount (7632 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8224 ms)
       ✕ Can branch state (wip state) (6849 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9767 ms)
       ✓ No tearing finally on mount (5740 ms)
     Level 2
       ✓ No tearing temporarily on update (14797 ms)
       ✕ No tearing temporarily on mount (5595 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4681 ms)
       ✓ No tearing finally on mount (8600 ms)
     Level 2
       ✓ No tearing temporarily on update (8785 ms)
       ✓ No tearing temporarily on mount (7537 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3758 ms)
       ✕ Can branch state (wip state) (10303 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9792 ms)
       ✓ No tearing finally on mount (6652 ms)
     Level 2
       ✓ No tearing temporarily on update (14795 ms)
       ✓ No tearing temporarily on mount (5674 ms)

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
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
		<td>:x:</td>
		<td>:x:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
