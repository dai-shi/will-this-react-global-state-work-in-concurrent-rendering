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
       ✓ No tearing finally on update (8085 ms)
       ✓ No tearing finally on mount (4691 ms)
     Level 2
       ✓ No tearing temporarily on update (13011 ms)
       ✓ No tearing temporarily on mount (4628 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8004 ms)
       ✕ Can branch state (wip state) (6719 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9779 ms)
       ✓ No tearing finally on mount (4672 ms)
     Level 2
       ✓ No tearing temporarily on update (14749 ms)
       ✓ No tearing temporarily on mount (4616 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (8012 ms)
       ✓ No tearing finally on mount (4664 ms)
     Level 2
       ✓ No tearing temporarily on update (12982 ms)
       ✓ No tearing temporarily on mount (4621 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8068 ms)
       ✕ Can branch state (wip state) (6725 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9715 ms)
       ✓ No tearing finally on mount (4650 ms)
     Level 2
       ✓ No tearing temporarily on update (14736 ms)
       ✓ No tearing temporarily on mount (4602 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5662 ms)
       ✓ No tearing finally on mount (11581 ms)
     Level 2
       ✓ No tearing temporarily on update (8717 ms)
       ✓ No tearing temporarily on mount (11485 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3728 ms)
       ✓ Can branch state (wip state) (8303 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15482 ms)
       ✓ No tearing finally on mount (6563 ms)
     Level 2
       ✓ No tearing temporarily on update (19593 ms)
       ✓ No tearing temporarily on mount (8512 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4716 ms)
       ✓ No tearing finally on mount (8556 ms)
     Level 2
       ✓ No tearing temporarily on update (8711 ms)
       ✓ No tearing temporarily on mount (7484 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3750 ms)
       ✓ Can branch state (wip state) (5308 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9773 ms)
       ✓ No tearing finally on mount (5746 ms)
     Level 2
       ✓ No tearing temporarily on update (14733 ms)
       ✓ No tearing temporarily on mount (5685 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5661 ms)
       ✓ No tearing finally on mount (7550 ms)
     Level 2
       ✓ No tearing temporarily on update (8699 ms)
       ✕ No tearing temporarily on mount (8490 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3699 ms)
       ✕ Can branch state (wip state) (10226 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11326 ms)
       ✓ No tearing finally on mount (5704 ms)
     Level 2
       ✓ No tearing temporarily on update (15439 ms)
       ✕ No tearing temporarily on mount (6590 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5672 ms)
       ✓ No tearing finally on mount (11549 ms)
     Level 2
       ✓ No tearing temporarily on update (8699 ms)
       ✓ No tearing temporarily on mount (11491 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3740 ms)
       ✓ Can branch state (wip state) (8302 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15525 ms)
       ✓ No tearing finally on mount (8575 ms)
     Level 2
       ✓ No tearing temporarily on update (19598 ms)
       ✓ No tearing temporarily on mount (8492 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (8041 ms)
       ✓ No tearing finally on mount (4758 ms)
     Level 2
       ✓ No tearing temporarily on update (13010 ms)
       ✓ No tearing temporarily on mount (4615 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8046 ms)
       ✕ Can branch state (wip state) (6696 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9761 ms)
       ✓ No tearing finally on mount (4605 ms)
     Level 2
       ✓ No tearing temporarily on update (14712 ms)
       ✓ No tearing temporarily on mount (4670 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8203 ms)
       ✓ No tearing finally on mount (6712 ms)
     Level 2
       ✓ No tearing temporarily on update (13117 ms)
       ✕ No tearing temporarily on mount (5617 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8133 ms)
       ✕ Can branch state (wip state) (7815 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9563 ms)
       ✓ No tearing finally on mount (6656 ms)
     Level 2
       ✓ No tearing temporarily on update (11630 ms)
       ✕ No tearing temporarily on mount (5634 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (8108 ms)
       ✓ No tearing finally on mount (4672 ms)
     Level 2
       ✓ No tearing temporarily on update (13041 ms)
       ✓ No tearing temporarily on mount (4618 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8052 ms)
       ✕ Can branch state (wip state) (6735 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9782 ms)
       ✓ No tearing finally on mount (4650 ms)
     Level 2
       ✓ No tearing temporarily on update (14748 ms)
       ✓ No tearing temporarily on mount (4633 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5684 ms)
       ✓ No tearing finally on mount (7611 ms)
     Level 2
       ✓ No tearing temporarily on update (8785 ms)
       ✕ No tearing temporarily on mount (6566 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3783 ms)
       ✕ Can branch state (wip state) (10265 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11412 ms)
       ✓ No tearing finally on mount (5699 ms)
     Level 2
       ✓ No tearing temporarily on update (15468 ms)
       ✕ No tearing temporarily on mount (6598 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6705 ms)
       ✓ No tearing finally on mount (10568 ms)
     Level 2
       ✓ No tearing temporarily on update (9762 ms)
       ✕ No tearing temporarily on mount (9500 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4743 ms)
       ✕ Can branch state (wip state) (11253 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16384 ms)
       ✓ No tearing finally on mount (10546 ms)
     Level 2
       ✓ No tearing temporarily on update (20415 ms)
       ✕ No tearing temporarily on mount (9505 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5697 ms)
       ✓ No tearing finally on mount (9599 ms)
     Level 2
       ✓ No tearing temporarily on update (9733 ms)
       ✓ No tearing temporarily on mount (8514 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4754 ms)
       ✓ Can branch state (wip state) (6312 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10786 ms)
       ✓ No tearing finally on mount (6728 ms)
     Level 2
       ✓ No tearing temporarily on update (15750 ms)
       ✓ No tearing temporarily on mount (6630 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (6675 ms)
       ✓ No tearing finally on mount (13543 ms)
     Level 2
       ✓ No tearing temporarily on update (9762 ms)
       ✓ No tearing temporarily on mount (13504 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4732 ms)
       ✓ Can branch state (wip state) (9277 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16506 ms)
       ✓ No tearing finally on mount (6563 ms)
     Level 2
       ✓ No tearing temporarily on update (20604 ms)
       ✓ No tearing temporarily on mount (6475 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (8070 ms)
       ✓ No tearing finally on mount (4698 ms)
     Level 2
       ✓ No tearing temporarily on update (12987 ms)
       ✓ No tearing temporarily on mount (4634 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8064 ms)
       ✕ Can branch state (wip state) (6734 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9761 ms)
       ✓ No tearing finally on mount (4669 ms)
     Level 2
       ✓ No tearing temporarily on update (14767 ms)
       ✓ No tearing temporarily on mount (4617 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4643 ms)
       ✓ No tearing finally on mount (8532 ms)
     Level 2
       ✕ No tearing temporarily on update (8754 ms)
       ✕ No tearing temporarily on mount (8480 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3759 ms)
       ✕ Can branch state (wip state) (3050 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9732 ms)
       ✓ No tearing finally on mount (6601 ms)
     Level 2
       ✓ No tearing temporarily on update (14722 ms)
       ✕ No tearing temporarily on mount (6543 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (8058 ms)
       ✓ No tearing finally on mount (4725 ms)
     Level 2
       ✓ No tearing temporarily on update (13023 ms)
       ✓ No tearing temporarily on mount (4664 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (8013 ms)
       ✕ Can branch state (wip state) (6770 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9763 ms)
       ✓ No tearing finally on mount (4700 ms)
     Level 2
       ✓ No tearing temporarily on update (14738 ms)
       ✓ No tearing temporarily on mount (4625 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4726 ms)
       ✓ No tearing finally on mount (8542 ms)
     Level 2
       ✓ No tearing temporarily on update (8753 ms)
       ✓ No tearing temporarily on mount (8514 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3731 ms)
       ✕ Can branch state (wip state) (10287 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9725 ms)
       ✓ No tearing finally on mount (5684 ms)
     Level 2
       ✓ No tearing temporarily on update (14725 ms)
       ✓ No tearing temporarily on mount (6662 ms)

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
