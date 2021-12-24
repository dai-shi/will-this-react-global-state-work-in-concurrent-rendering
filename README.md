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
    - 3: No tearing temporarily on update (13119 ms)
    - 4: No tearing temporarily on mount (6879 ms)
  - Level 3
    - 5: Can interrupt render (time slicing) (8089 ms)
    - 6: Can branch state (wip state) (7719 ms)

## Results

<details>
<summary>Raw Output</summary>

```
   With useTransition
     Level 1
       ✓ No tearing finally on update (8222 ms)
       ✓ No tearing finally on mount (6948 ms)
     Level 2
       ✓ No tearing temporarily on update (13119 ms)
       ✓ No tearing temporarily on mount (6879 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8089 ms)
       ✕ Can branch state (wip state) (7719 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (6728 ms)
       ✓ No tearing finally on mount (18772 ms)
     Level 2
       ✓ No tearing temporarily on update (9825 ms)
       ✓ No tearing temporarily on mount (18754 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4772 ms)
       ✓ Can branch state (wip state) (10300 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4811 ms)
       ✓ No tearing finally on mount (11766 ms)
     Level 2
       ✓ No tearing temporarily on update (8783 ms)
       ✓ No tearing temporarily on mount (11750 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3787 ms)
       ✓ Can branch state (wip state) (6305 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8158 ms)
       ✓ No tearing finally on mount (6866 ms)
     Level 2
       ✓ No tearing temporarily on update (13114 ms)
       ✓ No tearing temporarily on mount (6874 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8109 ms)
       ✕ Can branch state (wip state) (7679 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5777 ms)
       ✓ No tearing finally on mount (11908 ms)
     Level 2
       ✓ No tearing temporarily on update (8856 ms)
       ✕ No tearing temporarily on mount (11735 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3799 ms)
       ✕ Can branch state (wip state) (11261 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (6756 ms)
       ✓ No tearing finally on mount (18733 ms)
     Level 2
       ✓ No tearing temporarily on update (9866 ms)
       ✓ No tearing temporarily on mount (18764 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4816 ms)
       ✓ Can branch state (wip state) (10268 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5798 ms)
       ✓ No tearing finally on mount (11732 ms)
     Level 2
       ✓ No tearing temporarily on update (8789 ms)
       ✕ No tearing temporarily on mount (11686 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3781 ms)
       ✕ Can branch state (wip state) (11229 ms)
 react-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (4740 ms)
       ✓ No tearing finally on mount (11775 ms)
     Level 2
       ✓ No tearing temporarily on update (8820 ms)
       ✓ No tearing temporarily on mount (11779 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3817 ms)
       ✓ Can branch state (wip state) (6288 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4828 ms)
       ✓ No tearing finally on mount (11812 ms)
     Level 2
       ✓ No tearing temporarily on update (8857 ms)
       ✓ No tearing temporarily on mount (11758 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3788 ms)
       ✕ Can branch state (wip state) (10255 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (7969 ms)
       ✓ No tearing finally on mount (7025 ms)
     Level 2
       ✕ No tearing temporarily on update (12180 ms)
       ✓ No tearing temporarily on mount (6957 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7706 ms)
       ✕ Can branch state (wip state) (7484 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (7920 ms)
       ✓ No tearing finally on mount (10795 ms)
     Level 2
       ✓ No tearing temporarily on update (13053 ms)
       ✓ No tearing temporarily on mount (10795 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7889 ms)
       ✕ Can branch state (wip state) (7789 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6782 ms)
       ✓ No tearing finally on mount (12790 ms)
     Level 2
       ✓ No tearing temporarily on update (9859 ms)
       ✕ No tearing temporarily on mount (13696 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4857 ms)
       ✕ Can branch state (wip state) (13272 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5733 ms)
       ✓ No tearing finally on mount (13791 ms)
     Level 2
       ✓ No tearing temporarily on update (9866 ms)
       ✓ No tearing temporarily on mount (13780 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4811 ms)
       ✓ Can branch state (wip state) (7313 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4733 ms)
       ✓ No tearing finally on mount (11694 ms)
     Level 2
       ✕ No tearing temporarily on update (8805 ms)
       ✕ No tearing temporarily on mount (11680 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3768 ms)
       ✕ Can branch state (wip state) (3996 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8444 ms)
       ✓ No tearing finally on mount (10703 ms)
     Level 2
       ✓ No tearing temporarily on update (13112 ms)
       ✕ No tearing temporarily on mount (10677 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8139 ms)
       ✕ Can branch state (wip state) (7712 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8179 ms)
       ✓ No tearing finally on mount (6915 ms)
     Level 2
       ✓ No tearing temporarily on update (13165 ms)
       ✓ No tearing temporarily on mount (6952 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8159 ms)
       ✕ Can branch state (wip state) (7694 ms)

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
