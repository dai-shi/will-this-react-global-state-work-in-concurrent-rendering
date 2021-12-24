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

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (8195 ms)
       ✓ No tearing finally on mount (6968 ms)
     Level 2
       ✓ No tearing temporarily on update (13162 ms)
       ✓ No tearing temporarily on mount (6952 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (20481 ms)
       ✕ Can branch state (wip state) (7769 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (6764 ms)
       ✓ No tearing finally on mount (18788 ms)
     Level 2
       ✓ No tearing temporarily on update (9827 ms)
       ✓ No tearing temporarily on mount (18656 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4731 ms)
       ✓ Can branch state (wip state) (10194 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4613 ms)
       ✓ No tearing finally on mount (11727 ms)
     Level 2
       ✓ No tearing temporarily on update (8781 ms)
       ✓ No tearing temporarily on mount (11641 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3724 ms)
       ✓ Can branch state (wip state) (6215 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8066 ms)
       ✓ No tearing finally on mount (6845 ms)
     Level 2
       ✓ No tearing temporarily on update (13085 ms)
       ✓ No tearing temporarily on mount (6795 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8058 ms)
       ✕ Can branch state (wip state) (7639 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5674 ms)
       ✓ No tearing finally on mount (11662 ms)
     Level 2
       ✓ No tearing temporarily on update (8791 ms)
       ✕ No tearing temporarily on mount (11658 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3800 ms)
       ✕ Can branch state (wip state) (22418 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (6724 ms)
       ✓ No tearing finally on mount (16747 ms)
     Level 2
       ✓ No tearing temporarily on update (9803 ms)
       ✓ No tearing temporarily on mount (18665 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (5063 ms)
       ✓ Can branch state (wip state) (10614 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5750 ms)
       ✓ No tearing finally on mount (9777 ms)
     Level 2
       ✓ No tearing temporarily on update (8830 ms)
       ✕ No tearing temporarily on mount (11722 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4035 ms)
       ✕ Can branch state (wip state) (11268 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4657 ms)
       ✓ No tearing finally on mount (11747 ms)
     Level 2
       ✓ No tearing temporarily on update (8829 ms)
       ✓ No tearing temporarily on mount (9755 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3793 ms)
       ✕ Can branch state (wip state) (10297 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (7951 ms)
       ✓ No tearing finally on mount (7023 ms)
     Level 2
       ✕ No tearing temporarily on update (12164 ms)
       ✓ No tearing temporarily on mount (6936 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7637 ms)
       ✕ Can branch state (wip state) (7473 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (7861 ms)
       ✓ No tearing finally on mount (9742 ms)
     Level 2
       ✓ No tearing temporarily on update (11948 ms)
       ✓ No tearing temporarily on mount (11698 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7811 ms)
       ✕ Can branch state (wip state) (7723 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6700 ms)
       ✓ No tearing finally on mount (13710 ms)
     Level 2
       ✓ No tearing temporarily on update (9785 ms)
       ✕ No tearing temporarily on mount (13667 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4766 ms)
       ✕ Can branch state (wip state) (13268 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5740 ms)
       ✓ No tearing finally on mount (13796 ms)
     Level 2
       ✓ No tearing temporarily on update (9848 ms)
       ✓ No tearing temporarily on mount (12799 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4791 ms)
       ✓ Can branch state (wip state) (7273 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (8786 ms)
       ✓ No tearing finally on mount (17901 ms)
     Level 2
       ✓ No tearing temporarily on update (10815 ms)
       ✓ No tearing temporarily on mount (19697 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (5754 ms)
       ✕ Can branch state (wip state) (9478 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4655 ms)
       ✓ No tearing finally on mount (11700 ms)
     Level 2
       ✕ No tearing temporarily on update (8767 ms)
       ✕ No tearing temporarily on mount (11005 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3733 ms)
       ✕ Can branch state (wip state) (3925 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8099 ms)
       ✓ No tearing finally on mount (11646 ms)
     Level 2
       ✓ No tearing temporarily on update (13086 ms)
       ✕ No tearing temporarily on mount (11687 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8053 ms)
       ✕ Can branch state (wip state) (7631 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8082 ms)
       ✓ No tearing finally on mount (6852 ms)
     Level 2
       ✓ No tearing temporarily on update (13067 ms)
       ✓ No tearing temporarily on mount (6821 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8070 ms)
       ✕ Can branch state (wip state) (7608 ms)

```
</details>

<table>
<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
	<tr>
		<th><a href="https://react-redux.js.org">react-redux</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://react-tracked.js.org">react-tracked</a></th>
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
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/zustand">zustand</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
	</tr>
	<tr>
		<th><a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)</th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
	</tr>
	<tr>
		<th><a href="https://github.com/apollographql/apollo-client">apollo-client</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
	</tr>
	<tr>
		<th><a href="https://github.com/dai-shi/use-atom">use-atom</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/zerobias/effector">effector</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
		<td>:x:</td>
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
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/valtio">valtio</a></th>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:white_check_mark:</td>
		<td>:x:</td>
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
