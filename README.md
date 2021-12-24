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
       ✓ No tearing finally on update (8223 ms)
       ✓ No tearing finally on mount (4760 ms)
     Level 2
       ✓ No tearing temporarily on update (13149 ms)
       ✓ No tearing temporarily on mount (4794 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8174 ms)
       ✕ Can branch state (wip state) (6844 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9821 ms)
       ✓ No tearing finally on mount (4830 ms)
     Level 2
       ✓ No tearing temporarily on update (14854 ms)
       ✓ No tearing temporarily on mount (4777 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8135 ms)
       ✓ No tearing finally on mount (4780 ms)
     Level 2
       ✓ No tearing temporarily on update (13122 ms)
       ✓ No tearing temporarily on mount (4722 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8144 ms)
       ✕ Can branch state (wip state) (6819 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9929 ms)
       ✓ No tearing finally on mount (4774 ms)
     Level 2
       ✓ No tearing temporarily on update (14842 ms)
       ✓ No tearing temporarily on mount (4639 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5685 ms)
       ✓ No tearing finally on mount (11656 ms)
     Level 2
       ✓ No tearing temporarily on update (8817 ms)
       ✓ No tearing temporarily on mount (13730 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4109 ms)
       ✓ Can branch state (wip state) (8376 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15592 ms)
       ✓ No tearing finally on mount (6652 ms)
     Level 2
       ✓ No tearing temporarily on update (19710 ms)
       ✓ No tearing temporarily on mount (8612 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4759 ms)
       ✓ No tearing finally on mount (8675 ms)
     Level 2
       ✓ No tearing temporarily on update (8899 ms)
       ✓ No tearing temporarily on mount (7606 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3810 ms)
       ✓ Can branch state (wip state) (5334 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9815 ms)
       ✓ No tearing finally on mount (6778 ms)
     Level 2
       ✓ No tearing temporarily on update (14868 ms)
       ✓ No tearing temporarily on mount (5666 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (6524 ms)
       ✓ No tearing finally on mount (8925 ms)
     Level 2
       ✓ No tearing temporarily on update (8883 ms)
       ✕ No tearing temporarily on mount (8630 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3847 ms)
       ✕ Can branch state (wip state) (10336 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11465 ms)
       ✓ No tearing finally on mount (5848 ms)
     Level 2
       ✓ No tearing temporarily on update (15627 ms)
       ✕ No tearing temporarily on mount (5687 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5884 ms)
       ✓ No tearing finally on mount (11633 ms)
     Level 2
       ✓ No tearing temporarily on update (8817 ms)
       ✓ No tearing temporarily on mount (11611 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3858 ms)
       ✓ Can branch state (wip state) (8395 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15611 ms)
       ✓ No tearing finally on mount (8642 ms)
     Level 2
       ✓ No tearing temporarily on update (19743 ms)
       ✓ No tearing temporarily on mount (8569 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5779 ms)
       ✓ No tearing finally on mount (8604 ms)
     Level 2
       ✓ No tearing temporarily on update (8845 ms)
       ✕ No tearing temporarily on mount (7621 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3991 ms)
       ✕ Can branch state (wip state) (10317 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11457 ms)
       ✓ No tearing finally on mount (5782 ms)
     Level 2
       ✓ No tearing temporarily on update (15586 ms)
       ✕ No tearing temporarily on mount (5667 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (7875 ms)
       ✓ No tearing finally on mount (4813 ms)
     Level 2
       ✕ No tearing temporarily on update (12498 ms)
       ✓ No tearing temporarily on mount (4759 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7553 ms)
       ✕ Can branch state (wip state) (5999 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9331 ms)
       ✓ No tearing finally on mount (4750 ms)
     Level 2
       ✕ No tearing temporarily on update (12283 ms)
       ✓ No tearing temporarily on mount (4791 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (7972 ms)
       ✓ No tearing finally on mount (7629 ms)
     Level 2
       ✓ No tearing temporarily on update (13065 ms)
       ✓ No tearing temporarily on mount (5677 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8042 ms)
       ✕ Can branch state (wip state) (7888 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9749 ms)
       ✓ No tearing finally on mount (5694 ms)
     Level 2
       ✓ No tearing temporarily on update (13849 ms)
       ✓ No tearing temporarily on mount (6720 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6799 ms)
       ✓ No tearing finally on mount (10750 ms)
     Level 2
       ✓ No tearing temporarily on update (9918 ms)
       ✕ No tearing temporarily on mount (10670 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4878 ms)
       ✕ Can branch state (wip state) (11300 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16612 ms)
       ✓ No tearing finally on mount (10619 ms)
     Level 2
       ✓ No tearing temporarily on update (20756 ms)
       ✕ No tearing temporarily on mount (9612 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5793 ms)
       ✓ No tearing finally on mount (8706 ms)
     Level 2
       ✓ No tearing temporarily on update (9898 ms)
       ✓ No tearing temporarily on mount (8685 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4879 ms)
       ✓ Can branch state (wip state) (6433 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11735 ms)
       ✓ No tearing finally on mount (5782 ms)
     Level 2
       ✓ No tearing temporarily on update (15748 ms)
       ✓ No tearing temporarily on mount (5668 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (7716 ms)
       ✓ No tearing finally on mount (12596 ms)
     Level 2
       ✓ No tearing temporarily on update (9850 ms)
       ✓ No tearing temporarily on mount (10540 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4742 ms)
       ✕ Can branch state (wip state) (18419 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16812 ms)
       ✓ No tearing finally on mount (10702 ms)
     Level 2
       ✓ No tearing temporarily on update (20951 ms)
       ✓ No tearing temporarily on mount (9579 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8197 ms)
       ✓ No tearing finally on mount (4802 ms)
     Level 2
       ✓ No tearing temporarily on update (13116 ms)
       ✓ No tearing temporarily on mount (4637 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8082 ms)
       ✕ Can branch state (wip state) (6780 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9837 ms)
       ✓ No tearing finally on mount (4750 ms)
     Level 2
       ✓ No tearing temporarily on update (14799 ms)
       ✓ No tearing temporarily on mount (4707 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4690 ms)
       ✓ No tearing finally on mount (8572 ms)
     Level 2
       ✕ No tearing temporarily on update (8838 ms)
       ✕ No tearing temporarily on mount (8572 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4041 ms)
       ✕ Can branch state (wip state) (3128 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10112 ms)
       ✓ No tearing finally on mount (5833 ms)
     Level 2
       ✓ No tearing temporarily on update (14846 ms)
       ✕ No tearing temporarily on mount (6591 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8130 ms)
       ✓ No tearing finally on mount (8019 ms)
     Level 2
       ✓ No tearing temporarily on update (13158 ms)
       ✕ No tearing temporarily on mount (7615 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8171 ms)
       ✕ Can branch state (wip state) (6884 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9895 ms)
       ✓ No tearing finally on mount (5834 ms)
     Level 2
       ✓ No tearing temporarily on update (14879 ms)
       ✕ No tearing temporarily on mount (5719 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (5166 ms)
       ✓ No tearing finally on mount (8667 ms)
     Level 2
       ✓ No tearing temporarily on update (8902 ms)
       ✓ No tearing temporarily on mount (8632 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3844 ms)
       ✕ Can branch state (wip state) (10451 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9765 ms)
       ✓ No tearing finally on mount (6712 ms)
     Level 2
       ✓ No tearing temporarily on update (14874 ms)
       ✓ No tearing temporarily on mount (5647 ms)

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
