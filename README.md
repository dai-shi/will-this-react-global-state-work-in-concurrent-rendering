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
       ✓ No tearing finally on update (7848 ms)
       ✓ No tearing finally on mount (4502 ms)
     Level 2
       ✓ No tearing temporarily on update (12766 ms)
       ✓ No tearing temporarily on mount (4444 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7784 ms)
       ✕ Can branch state (wip state) (6542 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9557 ms)
       ✓ No tearing finally on mount (4546 ms)
     Level 2
       ✓ No tearing temporarily on update (14491 ms)
       ✓ No tearing temporarily on mount (4431 ms)
 zustand
   With useTransition
     Level 1
       ✓ No tearing finally on update (7798 ms)
       ✓ No tearing finally on mount (4509 ms)
     Level 2
       ✓ No tearing temporarily on update (12733 ms)
       ✓ No tearing temporarily on mount (4449 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7877 ms)
       ✕ Can branch state (wip state) (6782 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9540 ms)
       ✓ No tearing finally on mount (4677 ms)
     Level 2
       ✓ No tearing temporarily on update (14592 ms)
       ✓ No tearing temporarily on mount (4460 ms)
 react-tracked
   With useTransition
     Level 1
       ✓ No tearing finally on update (5468 ms)
       ✓ No tearing finally on mount (13335 ms)
     Level 2
       ✓ No tearing temporarily on update (8505 ms)
       ✓ No tearing temporarily on mount (13302 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3512 ms)
       ✓ Can branch state (wip state) (8097 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15305 ms)
       ✓ No tearing finally on mount (8374 ms)
     Level 2
       ✓ No tearing temporarily on update (19314 ms)
       ✓ No tearing temporarily on mount (6392 ms)
 constate
   With useTransition
     Level 1
       ✓ No tearing finally on update (4487 ms)
       ✓ No tearing finally on mount (9452 ms)
     Level 2
       ✓ No tearing temporarily on update (8642 ms)
       ✓ No tearing temporarily on mount (8238 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3514 ms)
       ✓ Can branch state (wip state) (5127 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9480 ms)
       ✓ No tearing finally on mount (6587 ms)
     Level 2
       ✓ No tearing temporarily on update (14502 ms)
       ✓ No tearing temporarily on mount (6423 ms)
 react-hooks-global-state
   With useTransition
     Level 1
       ✓ No tearing finally on update (5475 ms)
       ✓ No tearing finally on mount (9341 ms)
     Level 2
       ✓ No tearing temporarily on update (8673 ms)
       ✕ No tearing temporarily on mount (5481 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3527 ms)
       ✕ Can branch state (wip state) (10051 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11165 ms)
       ✓ No tearing finally on mount (5530 ms)
     Level 2
       ✓ No tearing temporarily on update (15195 ms)
       ✕ No tearing temporarily on mount (5436 ms)
 use-context-selector
   With useTransition
     Level 1
       ✓ No tearing finally on update (5461 ms)
       ✓ No tearing finally on mount (15358 ms)
     Level 2
       ✓ No tearing temporarily on update (8552 ms)
       ✓ No tearing temporarily on mount (15293 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3522 ms)
       ✓ Can branch state (wip state) (8133 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (15253 ms)
       ✓ No tearing finally on mount (8362 ms)
     Level 2
       ✓ No tearing temporarily on update (19317 ms)
       ✓ No tearing temporarily on mount (6259 ms)
 use-subscription
   With useTransition
     Level 1
       ✓ No tearing finally on update (5466 ms)
       ✓ No tearing finally on mount (8637 ms)
     Level 2
       ✓ No tearing temporarily on update (8285 ms)
       ✕ No tearing temporarily on mount (9256 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3543 ms)
       ✕ Can branch state (wip state) (10038 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11142 ms)
       ✓ No tearing finally on mount (6524 ms)
     Level 2
       ✓ No tearing temporarily on update (15258 ms)
       ✕ No tearing temporarily on mount (6409 ms)
 apollo-client
   With useTransition
     Level 1
       ✓ No tearing finally on update (8087 ms)
       ✓ No tearing finally on mount (4486 ms)
     Level 2
       ✕ No tearing temporarily on update (12894 ms)
       ✓ No tearing temporarily on mount (4426 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7937 ms)
       ✕ Can branch state (wip state) (6538 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (10228 ms)
       ✓ No tearing finally on mount (4464 ms)
     Level 2
       ✕ No tearing temporarily on update (14217 ms)
       ✓ No tearing temporarily on mount (4466 ms)
 recoil
   With useTransition
     Level 1
       ✓ No tearing finally on update (7825 ms)
       ✓ No tearing finally on mount (4549 ms)
     Level 2
       ✓ No tearing temporarily on update (13093 ms)
       ✓ No tearing temporarily on mount (4470 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7824 ms)
       ✕ Can branch state (wip state) (6499 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9490 ms)
       ✓ No tearing finally on mount (4475 ms)
     Level 2
       ✓ No tearing temporarily on update (14476 ms)
       ✓ No tearing temporarily on mount (4441 ms)
 recoil_UNSTABLE
   With useTransition
     Level 1
       ✓ No tearing finally on update (5525 ms)
       ✓ No tearing finally on mount (9365 ms)
     Level 2
       ✓ No tearing temporarily on update (8615 ms)
       ✕ No tearing temporarily on mount (5540 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3479 ms)
       ✕ Can branch state (wip state) (10046 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11137 ms)
       ✓ No tearing finally on mount (5507 ms)
     Level 2
       ✓ No tearing temporarily on update (15216 ms)
       ✕ No tearing temporarily on mount (6404 ms)
 jotai
   With useTransition
     Level 1
       ✓ No tearing finally on update (6464 ms)
       ✓ No tearing finally on mount (12361 ms)
     Level 2
       ✓ No tearing temporarily on update (9519 ms)
       ✕ No tearing temporarily on mount (11286 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4491 ms)
       ✕ Can branch state (wip state) (11062 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16599 ms)
       ✓ No tearing finally on mount (13373 ms)
     Level 2
       ✕ No tearing temporarily on update (21082 ms)
       ✕ No tearing temporarily on mount (13280 ms)
 jotai-versioned-write
   With useTransition
     Level 1
       ✓ No tearing finally on update (5454 ms)
       ✓ No tearing finally on mount (9344 ms)
     Level 2
       ✓ No tearing temporarily on update (9545 ms)
       ✓ No tearing temporarily on mount (8329 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4507 ms)
       ✕ Can branch state (wip state) (16081 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (11415 ms)
       ✓ No tearing finally on mount (6525 ms)
     Level 2
       ✓ No tearing temporarily on update (15434 ms)
       ✓ No tearing temporarily on mount (6460 ms)
 use-atom
   With useTransition
     Level 1
       ✓ No tearing finally on update (7501 ms)
       ✓ No tearing finally on mount (14324 ms)
     Level 2
       ✓ No tearing temporarily on update (9414 ms)
       ✓ No tearing temporarily on mount (15285 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (4546 ms)
       ✕ Can branch state (wip state) (18066 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (16458 ms)
       ✓ No tearing finally on mount (10370 ms)
     Level 2
       ✓ No tearing temporarily on update (20531 ms)
       ✓ No tearing temporarily on mount (9303 ms)
 valtio
   With useTransition
     Level 1
       ✓ No tearing finally on update (7850 ms)
       ✓ No tearing finally on mount (4528 ms)
     Level 2
       ✓ No tearing temporarily on update (12794 ms)
       ✓ No tearing temporarily on mount (4451 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7771 ms)
       ✕ Can branch state (wip state) (6556 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9525 ms)
       ✓ No tearing finally on mount (4475 ms)
     Level 2
       ✓ No tearing temporarily on update (14520 ms)
       ✓ No tearing temporarily on mount (4452 ms)
 effector
   With useTransition
     Level 1
       ✓ No tearing finally on update (4463 ms)
       ✓ No tearing finally on mount (9291 ms)
     Level 2
       ✕ No tearing temporarily on update (8525 ms)
       ✕ No tearing temporarily on mount (9234 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3517 ms)
       ✕ Can branch state (wip state) (2792 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9544 ms)
       ✓ No tearing finally on mount (6500 ms)
     Level 2
       ✓ No tearing temporarily on update (14491 ms)
       ✕ No tearing temporarily on mount (6386 ms)
 react-rxjs
   With useTransition
     Level 1
       ✓ No tearing finally on update (7839 ms)
       ✓ No tearing finally on mount (4532 ms)
     Level 2
       ✓ No tearing temporarily on update (12774 ms)
       ✓ No tearing temporarily on mount (4438 ms)
     Level 3
       ✕ Can interrupt render (time slicing) (7773 ms)
       ✕ Can branch state (wip state) (6548 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9565 ms)
       ✓ No tearing finally on mount (4500 ms)
     Level 2
       ✓ No tearing temporarily on update (14534 ms)
       ✓ No tearing temporarily on mount (4525 ms)
 simplux
   With useTransition
     Level 1
       ✓ No tearing finally on update (4494 ms)
       ✓ No tearing finally on mount (9338 ms)
     Level 2
       ✓ No tearing temporarily on update (8470 ms)
       ✓ No tearing temporarily on mount (9271 ms)
     Level 3
       ✓ Can interrupt render (time slicing) (3544 ms)
       ✕ Can branch state (wip state) (10114 ms)
   With useDeferredValue
     Level 1
       ✓ No tearing finally on update (9700 ms)
       ✓ No tearing finally on mount (5547 ms)
     Level 2
       ✓ No tearing temporarily on update (14549 ms)
       ✓ No tearing temporarily on mount (6433 ms)

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
		<td>:x:</td>
		<td>:x:</td>
	</tr>
	<tr>
		<th><a href="https://github.com/pmndrs/jotai">jotai (experimental versioned write)</a></th>
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
